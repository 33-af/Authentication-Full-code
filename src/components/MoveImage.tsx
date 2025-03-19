"use client"
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const MovingImage = () => {
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        const smoothX = useSpring(mouseX, { stiffness: 100, damping: 15 });
        const smoothY = useSpring(mouseY, { stiffness: 100, damping: 15 });

        const x = useTransform(smoothX, (value) => `${value}px`);
        const y = useTransform(smoothY, (value) => `${value}px`);

        useEffect(() => {
            const handleMouseMove = (event: MouseEvent) => {
                const { clientX, clientY } = event;
                mouseX.set(clientX - window.innerWidth / 2); 
                mouseY.set(clientY - window.innerHeight / 2);
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }, [mouseX, mouseY]);

        return (
            <motion.div
                className="absolute top-1/2 left-1/2 w-30 h-30"
                style={{ x, y }}
            >
                <Image
                 src='/image.png' alt='image' width={674} height={593} 
                />
            </motion.div>
        );
    };

export default MovingImage;