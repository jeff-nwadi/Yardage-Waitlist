'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { motion, Variants, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
        },
    },
};

const successVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        },
    },
    exit: {
        scale: 0.8,
        opacity: 0,
        transition: { duration: 0.2 },
    },
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function JoinWaitlist({ children }: { children: React.ReactNode }) {
    const id = useId();
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<SubmitStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputValue || status === 'loading') return;

        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: inputValue }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setStatus('success');

            // Reset form after success
            setTimeout(() => {
                setInputValue('');
                setIsOpen(false);
                // Reset status after dialog closes
                setTimeout(() => setStatus('idle'), 300);
            }, 2000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to join waitlist');
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            // Reset state when dialog closes
            setTimeout(() => {
                setStatus('idle');
                setInputValue('');
                setErrorMessage('');
            }, 300);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            variants={successVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col items-center justify-center py-8 gap-4"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                            >
                                <CheckCircle2 className="w-16 h-16 text-green-500" />
                            </motion.div>
                            <motion.h3
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl font-semibold text-[#28154d] text-center uppercase heading tracking-wider"
                            >
                                You're on the list!
                            </motion.h3>
                            <motion.p
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-gray-600 text-center text-sm"
                            >
                                We'll notify you when we launch.
                            </motion.p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col gap-5"
                        >
                            <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
                                <DialogHeader>
                                    <DialogTitle className="text-center uppercase heading tracking-wider text-[#28154d]">
                                        your email here
                                    </DialogTitle>
                                </DialogHeader>
                            </motion.div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <motion.div variants={itemVariants} className="*:not-first:mt-2 text-[#a451e5]">
                                    <Input
                                        id={id}
                                        type="email"
                                        placeholder="yardage@gmail.com"
                                        value={inputValue}
                                        onChange={(e) => {
                                            setInputValue(e.target.value);
                                            if (status === 'error') {
                                                setStatus('idle');
                                                setErrorMessage('');
                                            }
                                        }}
                                        disabled={status === 'loading'}
                                        className='uppercase heading tracking-wider border-none outline-none text-[#a451e5] bg-gray-200 w-full h-12 sm:h-15 rounded-3xl text-center text-sm sm:text-[1rem] focus-visible:ring-2 focus-visible:ring-[#a451e5] focus-visible:ring-offset-2 placeholder:text-[#a451e5]/50 disabled:opacity-50'
                                    />

                                    {/* Error Message */}
                                    <AnimatePresence>
                                        {status === 'error' && errorMessage && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center justify-center gap-2 text-red-500 text-sm mt-2"
                                            >
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{errorMessage}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                                <DialogFooter>
                                    <motion.div variants={itemVariants} className="w-full flex justify-center pt-2">
                                        <Button
                                            type="submit"
                                            className="uppercase heading cursor-pointer tracking-wider w-full h-12 sm:h-15 rounded-3xl text-center text-sm sm:text-[1rem] bg-black text-white disabled:opacity-50"
                                            disabled={!inputValue || status === 'loading'}
                                        >
                                            {status === 'loading' ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Joining...
                                                </span>
                                            ) : (
                                                'Join for early access'
                                            )}
                                        </Button>
                                    </motion.div>
                                </DialogFooter>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
