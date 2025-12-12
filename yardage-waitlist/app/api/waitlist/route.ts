import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Initialize auth with service account credentials
function getAuthClient() {
    const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return serviceAccountAuth;
}

// Helper to format date nicely
function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        // Validate email
        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Check environment variables
        if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.error('Missing Google Sheets environment variables');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Initialize Google Sheets
        const auth = getAuthClient();
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);

        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]; // First sheet

        // Get all rows to check for duplicates
        const rows = await sheet.getRows();
        const emailExists = rows.some(row =>
            row.get('Email')?.toLowerCase() === email.toLowerCase()
        );

        if (emailExists) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 409 }
            );
        }

        // Add new row
        await sheet.addRow({
            'Email': email,
            'Submitted At': formatDate(new Date()),
            'Status': '✓ Joined'
        });

        return NextResponse.json(
            { message: 'Successfully joined the waitlist!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error saving to waitlist:', error);
        return NextResponse.json(
            { error: 'Failed to join waitlist. Please try again.' },
            { status: 500 }
        );
    }
}

// GET endpoint to check waitlist count
export async function GET() {
    try {
        if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            return NextResponse.json({ count: 0 });
        }

        const auth = getAuthClient();
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);

        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        return NextResponse.json({ count: rows.length });
    } catch (error) {
        console.error('Error reading waitlist:', error);
        return NextResponse.json(
            { error: 'Failed to get waitlist count' },
            { status: 500 }
        );
    }
}
