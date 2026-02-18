"use client";

import { motion, useInView, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    fullWidth?: boolean;
    padding?: boolean;
}

export default function FadeIn({
    children,
    className,
    delay = 0,
    direction = "up",
    fullWidth = false,
    padding = false,
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

    const directionOffset = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    };

    const variants: Variants = {
        hidden: {
            opacity: 0,
            x: directionOffset[direction].x,
            y: directionOffset[direction].y,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.8, // Slightly longer for "softer" feel
                ease: [0.25, 0.46, 0.45, 0.94], // Custom ease-out
                delay: delay,
            },
        },
    };

    return (
        <div
            ref={ref}
            className={`${fullWidth ? "w-full" : ""} ${padding ? "p-4" : ""} ${className || ""}`}
        >
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
            >
                {children}
            </motion.div>
        </div>
    );
}
