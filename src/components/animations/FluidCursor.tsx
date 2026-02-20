"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Renderer, Camera, Vec2, Vec3, Polyline, Color, Transform, Mesh } from 'ogl';

export default function FluidCursor() {
    const pathname = usePathname();

    useEffect(() => {
        // Exclude admin routes and mobile/touch devices
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
        gl.canvas.style.zIndex = '99999'; // Super high z-index

        const camera = new Camera(gl);
        camera.position.z = 3;

        const scene = new Transform();

        // Mouse tracking with inertia
        const mouse = new Vec3();
        const targetMouse = new Vec3();

        const resolution = { value: new Vec2() };

        function resize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
            resolution.value.set(gl.canvas.width, gl.canvas.height);
        }
        window.addEventListener('resize', resize, false);
        resize();

        // Detect if dark mode is active to choose vibrant colors
        const color1 = new Color('#ef4444'); // Vibrant Red
        const color2 = new Color('#3b82f6'); // Vibrant Blue

        const count = 45; // More points for smoother trail
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
                    
                    // Safety check to avoid precision errors (NaN / Black spots)
                    if (len < 0.0001) {
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
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                varying vec2 vUv;
                void main() {
                    vec3 color = mix(uColor1, uColor2, vUv.x);
                    gl_FragColor = vec4(color, (1.0 - vUv.x) * 0.8);
                }
            `,
            uniforms: {
                uColor1: { value: color1 },
                uColor2: { value: color2 },
                uThickness: { value: 0.025 },
                uResolution: resolution,
            },
        });

        const mesh = new Mesh(gl, { geometry: polyline.geometry, program: polyline.program });
        mesh.setParent(scene);

        const handleMouseMove = (e: MouseEvent) => {
            targetMouse.set(
                (e.clientX / window.innerWidth) * 2 - 1,
                (e.clientY / window.innerHeight) * -2 + 1,
                0
            );
        };

        window.addEventListener('mousemove', handleMouseMove, false);

        let request: number;
        function update(t: number) {
            request = requestAnimationFrame(update);

            // Smoothly move points with differentiated damping for 'flowing' effect
            for (let i = points.length - 1; i >= 0; i--) {
                if (i === 0) {
                    points[i].lerp(targetMouse, 0.15);
                } else {
                    // Gradual follow-the-leader effect
                    points[i].lerp(points[i - 1], 0.25);
                }
            }

            polyline.updateGeometry();
            renderer.render({ scene, camera });
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

    return null;
}
