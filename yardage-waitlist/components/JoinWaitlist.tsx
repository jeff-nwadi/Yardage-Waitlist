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

import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            duration: 0.2,
            ease: 'easeOut',
        },
    },
};

export default function JoinWaitlist({ children }: { children: React.ReactNode }) {
    const id = useId();
    const [inputValue, setInputValue] = useState('');

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-5"
                >
                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
                        <DialogHeader>
                            <DialogTitle className="text-center uppercase heading tracking-wider text-[#28154d]">
                                your email here
                            </DialogTitle>
                        </DialogHeader>
                    </motion.div>

                    <form className="space-y-5">
                        <motion.div variants={itemVariants} className="*:not-first:mt-2 text-[#a451e5]">
                            <Input
                                id={id}
                                type="email"
                                placeholder="yardage@gmail.com"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className='uppercase heading tracking-wider border-none outline-none text-[#a451e5] bg-gray-200 w-full h-12 sm:h-15 rounded-3xl text-center text-sm sm:text-[1rem] focus-visible:ring-2 focus-visible:ring-[#a451e5] focus-visible:ring-offset-2 placeholder:text-[#a451e5]/50'
                            />
                        </motion.div>
                        <DialogFooter>
                            <motion.div variants={itemVariants} className="w-full flex justify-center pt-2">
                                <Button
                                    className="uppercase heading cursor-pointer tracking-wider w-full h-12 sm:h-15 rounded-3xl text-center text-sm sm:text-[1rem] bg-black text-white disabled:opacity-100"
                                    disabled={!inputValue}
                                >
                                    Join for early access
                                </Button>
                            </motion.div>
                        </DialogFooter>
                    </form>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
