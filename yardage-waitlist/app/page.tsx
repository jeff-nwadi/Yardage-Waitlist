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
import { motion } from "framer-motion";
import JoinWaitlist from "@/components/mvpblocks/delete-project";

export default function Home() {
  return (
    <div className="bg-[#fcf8e6] h-screen">
      <div className="lg:py-14 flex items-center justify-center">
        <Image src={logo} alt="Logo" width={145} height={57} className="w-23 h-23 lg:w-auto lg:h-auto" />
      </div>

      <div className="flex flex-col items-center justify-center relative py-24">
        <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto pointer-events-none">
          <GsapMagnet>
            <Image src={icon2} alt="Shoe Racks" width={145} height={57} className="pointer-events-auto cursor-pointer absolute w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 left-[15%] top-[5%] md:left-[12%] md:top-[6%] lg:left-[20%] lg:top-[-2%]" />
          </GsapMagnet>
          {/* Top Left - Shoe Racks */}
          <GsapMagnet>
            <Image src={icon3} alt="Chairs" width={145} height={57} className="pointer-events-auto cursor-pointer absolute w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 right-[15%] top-[10%] md:right-[12%] md:top-[6%] lg:right-[17%] lg:top-[-2%]" />
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

        <div className="flex flex-col items-center justify-center">
          <h1 className="uppercase heading text-[1.5rem] md:text-4xl lg:text-7xl text-[#8b46dd] tracking-wider">stop moving clutter.</h1>
          <h1 className="uppercase heading text-[1.5rem] md:text-4xl lg:text-7xl text-[#8b46dd] tracking-wider lg:pt-3">start selling.</h1>
          <p className="text-[#8b46dd] text-sm md:text-xl w-[48vh] md:w-[62vh] lg:w-[68vh] text-center py-4 lg:py-7">We make campus exchange effortless. Join the waitlist
            and we'll notify you the moment you can turn your old stash into cash.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="block cursor-pointer"
          >
            <JoinWaitlist>
              <Button className="uppercase heading tracking-wider cursor-pointer rounded-full py-2">
                Get Early access
              </Button>
            </JoinWaitlist>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
