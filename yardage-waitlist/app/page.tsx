"use client"

import Image from "next/image";
import logo from "@/images/logo.svg";
import { Button } from "@/components/ui/button";
import icon1 from "@/images/icon-1.svg"
import icon2 from "@/images/icon-2.svg"
import icon3 from "@/images/icon-3.svg"
import icon4 from "@/images/icon-4.svg"
import Link from "next/link";
import GsapMagnet from "@/components/GsapMagnet";
import { motion, Variants } from "framer-motion";
import JoinWaitlist from "@/components/JoinWaitlist";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

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
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="lg:h-screen w-full overflow-hidden ">
        {/* Logo Skeleton */}
        <div className="lg:py-14 py-10 flex items-center justify-center">
          <Skeleton className="w-23 h-10 lg:w-[145px] lg:h-[57px] rounded-md bg-[#fcf8e6]" />
        </div>

        {/* Desktop Skeleton */}
        <div className="hidden lg:flex flex-col items-center justify-center relative py-24 h-full">
          {/* Floating Icons Skeletons */}
          <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto pointer-events-none">
            <Skeleton className="absolute w-36 h-36 rounded-xl left-[20%] top-[-2%]" />
            <Skeleton className="absolute w-36 h-36 rounded-xl right-[17%] top-[-2%]" />
            <Skeleton className="absolute w-36 h-36 rounded-xl left-[10%] bottom-[30%]" />
            <Skeleton className="absolute w-36 h-36 rounded-xl right-[8%] bottom-[35%]" />
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <Skeleton className="h-20 w-[600px] rounded-lg" />
            <Skeleton className="h-20 w-[400px] rounded-lg" />
            <Skeleton className="h-8 w-[500px] mt-6 rounded-md" />
            <Skeleton className="h-8 w-[400px] rounded-md" />
            <Skeleton className="h-16 w-48 mt-8 rounded-full" />
          </div>
        </div>

        {/* Mobile/Tablet Skeleton */}
        <div className="lg:hidden flex flex-col items-center justify-center py-10 space-y-8">
          <div className="space-y-4 flex flex-col items-center">
            <Skeleton className="h-12 w-48 rounded-lg" />
            <Skeleton className="h-12 w-56 rounded-lg" />
            <Skeleton className="h-12 w-40 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 w-48 rounded-lg" />
          </div>

          <div className="flex flex-col items-center space-y-[-30px]">
            <Skeleton className="w-50 h-50 rounded-xl z-10" />
            <Skeleton className="w-50 h-50 rounded-xl z-20" />
            <Skeleton className="w-50 h-50 rounded-xl z-30" />
            <Skeleton className="w-50 h-50 rounded-xl z-40" />
          </div>

          <Skeleton className="h-16 w-48 rounded-full mt-8" />
        </div>
      </div>
    )
  }

  return (
    <div className="lg:h-screen">
      <div className="lg:py-14 flex items-center justify-center">
        <Image src={logo} alt="Logo" width={145} height={57} className="w-23 h-23 lg:w-auto lg:h-auto" />
      </div>

      <div className="hidden lg:flex flex-col items-center justify-center relative py-24 ">
        <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto pointer-events-none">
          <GsapMagnet>
            <Image src={icon2} alt="Shoe Racks" width={145} height={57} className="pointer-events-auto cursor-pointer absolute w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 left-[15%] bottom-[5%] md:left-[12%] md:top-[6%] lg:left-[20%] lg:top-[-2%]" />
          </GsapMagnet>
          {/* Top Left - Shoe Racks */}
          <GsapMagnet>
            <Image src={icon3} alt="Chairs" width={145} height={57} className="pointer-events-auto cursor-pointer absolute w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 right-[15%] bottom-[10%] md:right-[12%] md:top-[6%] lg:right-[17%] lg:top-[-2%]" />
          </GsapMagnet>
          {/* Top Right - Chairs */}
          <GsapMagnet>
            <Image src={icon1} alt="Cupboards" width={145} height={57} className="pointer-events-auto cursor-pointer absolute w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 left-[15%] -bottom-[10%] md:left-[10%] md:bottom-[15%] lg:left-[10%] lg:bottom-[30%]" />
          </GsapMagnet>
          {/* Bottom Left - Cupboards */}
          <GsapMagnet>
            <Image src={icon4} alt="Gadgets" width={145} height={57} className="pointer-events-auto cursor-pointer absolute w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 right-[15%] -bottom-[6%] md:right-[10%] md:bottom-[15%] lg:right-[8%] lg:bottom-[35%]" />
          </GsapMagnet>
        </div>

        <motion.div
          className="flex flex-col items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="uppercase heading text-[1.5rem] md:text-4xl lg:text-7xl text-[#8b46dd] tracking-wider">stop moving clutter.</motion.h1>
          <motion.h1 variants={itemVariants} className="uppercase heading text-[1.5rem] md:text-4xl lg:text-7xl text-[#8b46dd] tracking-wider lg:pt-3">start selling.</motion.h1>
          <motion.p variants={itemVariants} className="text-[#8b46dd] text-sm md:text-xl w-[48vh] md:w-[62vh] lg:w-[68vh] text-center py-4 lg:py-7">We make campus exchange effortless. Join the waitlist
            and we'll notify you the moment you can turn your old stash into cash.
          </motion.p>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="block cursor-pointer"
          >
            <JoinWaitlist>
              <Button className="uppercase heading tracking-wider text-sm cursor-pointer rounded-full md:py-7 md:px-4">
                Get Early access
              </Button>
            </JoinWaitlist>
          </motion.div>
        </motion.div>
      </div>


      {/* Mobile screen */}
      <div>
        <motion.div
          className="md:hidden py-10 flex-col flex items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-4 text-center">
            <motion.h1 variants={itemVariants} className="uppercase heading text-6xl text-[#8b46dd] tracking-wider">stop</motion.h1>
            <motion.h1 variants={itemVariants} className="uppercase heading text-6xl text-[#8b46dd] tracking-wider">moving</motion.h1>
            <motion.h1 variants={itemVariants} className="uppercase heading text-6xl text-[#8b46dd] tracking-wider">clutter.</motion.h1>
            <motion.h1 variants={itemVariants} className="uppercase heading text-6xl text-[#8b46dd] tracking-wider">start</motion.h1>
            <motion.h1 variants={itemVariants} className="uppercase heading text-6xl text-[#8b46dd] tracking-wider">selling.</motion.h1>
          </div>

          <motion.div variants={containerVariants} className="flex items-center justify-center flex-col -space-y-30">
            <motion.div variants={itemVariants}><Image src={icon1} alt="Cupboards" width={145} height={57} className="pointer-events-auto cursor-pointer w-50 h-50 " /></motion.div>
            <motion.div variants={itemVariants}><Image src={icon2} alt="Cupboards" width={145} height={57} className="pointer-events-auto cursor-pointer w-50 h-50 " /></motion.div>
            <motion.div variants={itemVariants}><Image src={icon3} alt="Cupboards" width={145} height={57} className="pointer-events-auto cursor-pointer w-50 h-50 " /></motion.div>
            <motion.div variants={itemVariants}><Image src={icon4} alt="Cupboards" width={145} height={57} className="pointer-events-auto cursor-pointer w-50 h-50" /></motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="block cursor-pointer"
          >
            <JoinWaitlist>
              <Button className="uppercase heading tracking-wider text-sm cursor-pointer rounded-full py-7 px-4 ">
                Get Early access
              </Button>
            </JoinWaitlist>
          </motion.div>
        </motion.div>
      </div>

      {/* Tablet screen */}
      <motion.div
        className="hidden md:flex lg:hidden py-10 flex-col items-center justify-center md:h-scree"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-4 text-center">
          <motion.h1 variants={itemVariants} className="uppercase heading text-6xl text-[#8b46dd] tracking-wider">stop moving</motion.h1>
          <motion.h1 variants={itemVariants} className="uppercase heading text-6xl text-[#8b46dd] tracking-wider">clutter. start</motion.h1>
          <motion.h1 variants={itemVariants} className="uppercase heading text-6xl text-[#8b46dd] tracking-wider">selling.</motion.h1>
        </div>

        <motion.div variants={containerVariants} className="flex items-center justify-center flex-col -space-y-35">
          <motion.div variants={itemVariants}><Image src={icon1} alt="Cupboards" width={145} height={57} className="pointer-events-auto cursor-pointer w-45 h-45 md:w-55 md:h-55 " /></motion.div>
          <motion.div variants={itemVariants}><Image src={icon2} alt="Cupboards" width={145} height={57} className="pointer-events-auto cursor-pointer w-45 h-45 md:w-55 md:h-55 " /></motion.div>
          <motion.div variants={itemVariants}><Image src={icon3} alt="Cupboards" width={145} height={57} className="pointer-events-auto cursor-pointer w-45 h-45 md:w-55 md:h-55 " /></motion.div>
          <motion.div variants={itemVariants}><Image src={icon4} alt="Cupboards" width={145} height={57} className="pointer-events-auto cursor-pointer w-45 h-45 md:w-55 md:h-55 " /></motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="block cursor-pointer"
        >
          <JoinWaitlist>
            <Button className="uppercase heading tracking-wider text-sm cursor-pointer rounded-full md:py-7 md:px-4">
              Get Early access
            </Button>
          </JoinWaitlist>
        </motion.div>
      </motion.div>
    </div>
  );
}
