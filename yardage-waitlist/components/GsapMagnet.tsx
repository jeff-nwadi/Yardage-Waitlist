"use client"

import gsap from "gsap";
import React from "react";
import { useRef } from "react";


export default function GsapMagnet({ children }: { children: React.ReactElement<any> }) {
    const ref = useRef<HTMLElement>(null);

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();
            const currentX = (gsap.getProperty(element, "x") as number) || 0;
            const currentY = (gsap.getProperty(element, "y") as number) || 0;

            const originalLeft = left - currentX;
            const originalTop = top - currentY;

            const x = clientX - (originalLeft + width / 2);
            const y = clientY - (originalTop + height / 2);
            xTo(x);
            yTo(y);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return React.cloneElement(children, { ref } as any);
}