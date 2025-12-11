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

export default function JoinWaitlist({ children }: { children: React.ReactNode }) {
  const id = useId();
  const [inputValue, setInputValue] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
            <DialogHeader>
              <DialogTitle className="sm:text-center uppercase heading tracking-wider text-[#28154d]">
                your email here
              </DialogTitle>
            </DialogHeader>
          </motion.div>

          <form className="space-y-5">
            <motion.div variants={itemVariants} className="*:not-first:mt-2 text-[#a451e5]">
              <Input
                id={id}
                type="text"
                placeholder="yardage@gmail.com"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className='uppercase heading tracking-wider border-none outline-none text-[#a451e5] bg-gray-200 w-[55vh] h-15 rounded-3xl text-center text-[1rem] focus-visible:ring-2 focus-visible:ring-[#a451e5] focus-visible:ring-offset-2 placeholder:text-[#a451e5]/50'
              />
            </motion.div>
            <DialogFooter>
              <motion.div variants={itemVariants} className="w-full flex pt-2">
                <Button
                  className="flex-1 uppercase heading tracking-wider w-[35vh] h-15 rounded-3xl text-center text-[1rem] bg-black text-white disabled:opacity-100"
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
