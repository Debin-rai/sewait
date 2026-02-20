"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Renderer, Camera, Geometry, Program, Mesh, Vec2, Vec3, Polyline } from 'ogl';

export default function FluidCursor() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Disable on mobile/touch devices OR admin routes
        const isAdmin = pathname?.startsWith('/sewait-portal-99');
        if (isAdmin || (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0))) {
            return;
        }

        const renderer = new Renderer({ dpr: 2, alpha: true, antialias: true });
        const gl = renderer.gl;
        document.body.appendChild(gl.canvas);

        gl.canvas.style.position = 'fixed';
        gl.canvas.style.top = '0';
        gl.canvas.style.left = '0';
        gl.canvas.style.pointerEvents = 'none';
        gl.canvas.style.zIndex = '9999';

        const camera = new Camera(gl);
        camera.position.z = 3;

        const mouse = new Vec3();
        // Initialize mouse at center to avoid (0,0) jump
        mouse.set(0, 0, 0);

        const resolution = { value: new Vec2() };

        function resize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
            resolution.value.set(gl.canvas.width, gl.canvas.height);
        }
        window.addEventListener('resize', resize, false);
        resize();

        // Detect if dark mode is active to choose color
        const isDark = document.documentElement.classList.contains('dark');
        const color = isDark ? new Vec3(0.4, 0.7, 1.0) : new Vec3(0.0, 0.4, 0.8);

        const count = 40;
        const points: Vec3[] = [];
        for (let i = 0; i < count; i++) points.push(new Vec3(0, 0, 0));

        const polyline = new Polyline(gl, {
            points,
            vertex: `
                attribute vec3 position;
                attribute vec3 next;
                attribute vec3 prev;
                attribute vec2 uv;
                attribute float side;

                uniform vec2 uResolution;
                uniform float uThickness;

                varying vec2 vUv;

                void main() {
                    vUv = uv;
                    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
                    vec2 p = position.xy * aspect;
                    vec2 n = next.xy * aspect;
                    
                    vec2 diff = n - p;
                    float len = length(diff);
                    if (len < 0.001) {
                        gl_Position = vec4(position.xy, 0.0, 1.0);
                        return;
                    }

                    vec2 dir = diff / len;
                    vec2 normal = vec2(-dir.y, dir.x);
                    
                    normal /= aspect;
                    normal *= uThickness * (1.0 - uv.x);
                    
                    gl_Position = vec4(position.xy + normal * side, 0.0, 1.0);
                }
            `,
            fragment: `
                precision highp float;
                uniform vec3 uColor;
                varying vec2 vUv;
                void main() {
                    gl_FragColor = vec4(uColor, 1.0 - vUv.x);
                }
            `,
            uniforms: {
                uColor: { value: color },
                uThickness: { value: 0.02 },
                uResolution: resolution,
            },
        });

        const mesh = new Mesh(gl, { geometry: polyline.geometry, program: polyline.program });

        const handleMouseMove = (e: MouseEvent) => {
            mouse.set(
                (e.clientX / window.innerWidth) * 2 - 1,
                (e.clientY / window.innerHeight) * -2 + 1,
                0
            );
        };

        window.addEventListener('mousemove', handleMouseMove, false);

        let request: number;
        function update(t: number) {
            request = requestAnimationFrame(update);

            // Move points
            for (let i = points.length - 1; i >= 0; i--) {
                if (i === 0) {
                    points[i].lerp(mouse, 0.15);
                } else {
                    points[i].lerp(points[i - 1], 0.2);
                }
            }

            polyline.updateGeometry();
            renderer.render({ scene: mesh });
        }
        request = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(request);
            if (gl.canvas.parentElement) {
                gl.canvas.parentElement.removeChild(gl.canvas);
            }
        };
    }, [pathname]);

    return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}
