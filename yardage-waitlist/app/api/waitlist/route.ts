import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');
const CSV_FILE = path.join(DATA_DIR, 'waitlist.csv');

// Helper to escape CSV values
function escapeCSV(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
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

// Helper to read existing emails from CSV
function readExistingEmails(): Set<string> {
    const emails = new Set<string>();

    if (fs.existsSync(CSV_FILE)) {
        const content = fs.readFileSync(CSV_FILE, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim());

        // Skip header, read emails (first column)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            // Handle quoted values
            let email = '';
            if (line.startsWith('"')) {
                const endQuote = line.indexOf('",', 1);
                email = line.substring(1, endQuote).replace(/""/g, '"');
            } else {
                email = line.split(',')[0];
            }
            if (email) {
                emails.add(email.toLowerCase());
            }
        }
    }

    return emails;
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

        // Ensure data directory exists
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }

        // Check for duplicate email
        const existingEmails = readExistingEmails();
        if (existingEmails.has(email.toLowerCase())) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 409 }
            );
        }

        // Format the timestamp
        const formattedDate = formatDate(new Date());

        // Create new row with status
        const newRow = `${escapeCSV(email)},${escapeCSV(formattedDate)},Joined`;

        // If file doesn't exist, create with header
        if (!fs.existsSync(CSV_FILE)) {
            const header = 'Email,Submitted At,Status';
            fs.writeFileSync(CSV_FILE, `${header}\n${newRow}\n`, 'utf-8');
        } else {
            // Append to existing file
            fs.appendFileSync(CSV_FILE, `${newRow}\n`, 'utf-8');
        }

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
        if (!fs.existsSync(CSV_FILE)) {
            return NextResponse.json({ count: 0 });
        }

        const content = fs.readFileSync(CSV_FILE, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim());

        // Subtract 1 for header row
        const count = Math.max(0, lines.length - 1);

        return NextResponse.json({ count });
    } catch (error) {
        console.error('Error reading waitlist:', error);
        return NextResponse.json(
            { error: 'Failed to get waitlist count' },
            { status: 500 }
        );
    }
}
