"use client";

import { ReactNode } from "react";

interface SmoothScrollProps {
    children: ReactNode;
}

// Smooth scrolling is handled via CSS scroll-behavior in globals.css
export default function SmoothScroll({ children }: SmoothScrollProps) {
    return <>{children}</>;
}
