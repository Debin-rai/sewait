"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Renderer, Camera, Vec2, Vec3, Polyline, Color, Transform } from 'ogl';

export default function FluidCursor() {
    const pathname = usePathname();

    useEffect(() => {
        // Exclude admin routes and mobile/touch devices
        const isAdmin = pathname?.startsWith('/sewait-portal-99');
        if (isAdmin || (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0))) {
            return;
        }

        const vertex = /* glsl */ `
            precision highp float;

            attribute vec3 position;
            attribute vec3 next;
            attribute vec3 prev;
            attribute vec2 uv;
            attribute float side;

            uniform vec2 uResolution;
            uniform float uDPR;
            uniform float uThickness;

            varying vec2 vUv;

            vec4 getPosition() {
                vec4 current = vec4(position, 1);

                vec2 aspect = vec2(uResolution.x / uResolution.y, 1);
                vec2 nextScreen = next.xy * aspect;
                vec2 prevScreen = prev.xy * aspect;

                // Calculate the tangent direction
                vec2 tangent = normalize(nextScreen - prevScreen);

                // Rotate 90 degrees to get the normal
                vec2 normal = vec2(-tangent.y, tangent.x);
                normal /= aspect;

                // Taper the line: thick at head (uv.y=0), thin at tail (uv.y=1)
                normal *= mix(1.0, 0.1, pow(uv.y, 2.0));

                // When the points are on top of each other, shrink the line to avoid artifacts.
                float dist = length(nextScreen - prevScreen);
                normal *= smoothstep(0.0, 0.02, dist);

                float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
                float pixelWidth = current.w * pixelWidthRatio;
                normal *= pixelWidth * uThickness;
                current.xy -= normal * side;

                return current;
            }

            void main() {
                vUv = uv;
                gl_Position = getPosition();
            }
        `;

        const fragment = /* glsl */ `
            precision highp float;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            varying vec2 vUv;
            void main() {
                // Gradient from uColor1 to uColor2 along the trail (vUv.y)
                vec3 color = mix(uColor1, uColor2, vUv.y);
                gl_FragColor = vec4(color, (1.0 - vUv.y) * 0.9);
            }
        `;

        const renderer = new Renderer({ dpr: 2, alpha: true, antialias: true });
        const gl = renderer.gl;
        document.body.appendChild(gl.canvas);

        gl.canvas.style.position = 'fixed';
        gl.canvas.style.top = '0';
        gl.canvas.style.left = '0';
        gl.canvas.style.pointerEvents = 'none';
        gl.canvas.style.zIndex = '99999';

        const camera = new Camera(gl);
        camera.position.z = 3;

        const scene = new Transform();

        const mouse = new Vec3();
        let initialized = false;

        function resize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
            if (line.polyline) line.polyline.resize();
        }
        window.addEventListener('resize', resize, false);

        // Store values for the line's spring movement
        const line: {
            spring: number;
            friction: number;
            mouseVelocity: Vec3;
            points: Vec3[];
            polyline: any;
        } = {
            spring: 0.05,
            friction: 0.8,
            mouseVelocity: new Vec3(),
            points: [],
            polyline: null,
        };

        const count = 40;
        for (let i = 0; i < count; i++) line.points.push(new Vec3());

        line.polyline = new Polyline(gl, {
            points: line.points,
            vertex,
            fragment,
            uniforms: {
                uColor1: { value: new Color('#ef4444') }, // Vibrant Red
                uColor2: { value: new Color('#3b82f6') }, // Vibrant Blue
                uThickness: { value: 35 },
            },
        });

        line.polyline.mesh.setParent(scene);

        resize();

        const handleMouseMove = (e: MouseEvent) => {
            // Get mouse value in -1 to 1 range, with y flipped
            mouse.set(
                (e.clientX / gl.renderer.width) * 2 - 1,
                (e.clientY / gl.renderer.height) * -2 + 1,
                0
            );

            if (!initialized) {
                line.points.forEach(p => p.copy(mouse));
                initialized = true;
            }
        };

        window.addEventListener('mousemove', handleMouseMove, false);

        let request: number;
        const tmp = new Vec3();

        function update() {
            request = requestAnimationFrame(update);

            if (!initialized) return;

            // Update polyline input points with spring physics
            for (let i = line.points.length - 1; i >= 0; i--) {
                if (i === 0) {
                    // For the first point, spring ease it to the mouse position
                    tmp.copy(mouse).sub(line.points[i]).multiply(line.spring);
                    line.mouseVelocity.add(tmp).multiply(line.friction);
                    line.points[i].add(line.mouseVelocity);
                } else {
                    // The rest of the points ease to the point in front of them
                    line.points[i].lerp(line.points[i - 1], 0.85);
                }
            }

            line.polyline.updateGeometry();
            renderer.render({ scene });
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
