"use client";

import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh, Vec2, Vec3, Polyline } from 'ogl';

export default function FluidCursor() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Disable on mobile/touch devices
        if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
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
        const velocity = new Vec3();
        const lastMouse = new Vec3();

        function resize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        }
        window.addEventListener('resize', resize, false);
        resize();

        // Detect if dark mode is active to choose color
        const isDark = document.documentElement.classList.contains('dark');
        const color = isDark ? new Vec2(0.3, 0.6) : new Vec2(0.1, 0.4); // Blue/Cyan tones

        const count = 40;
        const points: Vec3[] = [];
        for (let i = 0; i < count; i++) points.push(new Vec3());

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
                    vec2 aspect = vec2(uResolution.x / uResolution.y, 1);
                    vec2 p = position.xy * aspect;
                    vec2 n = next.xy * aspect;
                    vec3 dir = vec3(normalize(n - p), 0);
                    vec3 normal = vec3(-dir.y, dir.x, 0);
                    normal.xy /= aspect;
                    normal *= uThickness * (1.0 - uv.x);
                    gl_Position = vec4(position + normal * side, 1);
                }
            `,
            uniforms: {
                uColor: { value: color },
                uThickness: { value: 0.04 },
            },
        });

        const mesh = new Mesh(gl, { geometry: polyline.geometry, program: polyline.program });

        const handleMouseMove = (e: MouseEvent) => {
            mouse.set(
                (e.clientX / gl.canvas.width) * 2 - 1,
                (e.clientY / gl.canvas.height) * -2 + 1,
                0
            );
            lastMouse.copy(mouse);
        };

        window.addEventListener('mousemove', handleMouseMove, false);

        let request: number;
        function update(t: number) {
            request = requestAnimationFrame(update);

            // Move points
            for (let i = points.length - 1; i >= 0; i--) {
                if (i === 0) {
                    points[i].lerp(mouse, 0.3);
                } else {
                    points[i].lerp(points[i - 1], 0.35);
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
    }, []);

    return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}
