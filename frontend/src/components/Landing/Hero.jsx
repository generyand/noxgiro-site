import React from "react";
import { motion } from "framer-motion";
import Button from "../Common/Button";

const Bubble = ({ size, position }) => (
  <div
    className="absolute rounded-full opacity-30 bg-gradient-to-r from-blue-500 to-sky-300 blur-lg"
    style={{
      width: size,
      height: size,
      top: position.y,
      left: position.x,
    }}
  />
);

const Hero = () => {
  const generateRandomPosition = () => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
  });

  const bubbles = Array.from({ length: 10 }, () => ({
    size: Math.floor(Math.random() * (60 - 20 + 1) + 20),
    position: generateRandomPosition(),
  }));

  return (
    <div
      style={{ height: "calc(100svh - 72px)" }}
      className="relative overflow-hidden sm:px-6 lg:px-8 mt-[72px]"
    >
      {bubbles.map((bubble, index) => (
        <Bubble key={index} {...bubble} />
      ))}
      <div className="flex items-center justify-center w-full h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl text-center text-white"
        >
          <motion.span
            className="text-5xl font-extrabold text-transparent sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-sky-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            NoxGiro
          </motion.span>
          <motion.p
            className="px-4 mb-6 text-base text-gray-300 sm:mb-8 sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Elevate your online presence with AI-powered web solutions: Design,
            Develop, and Engage.
          </motion.p>
          <Button onClick={() => console.log("Get Started clicked")}>
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
