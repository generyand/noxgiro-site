import React from "react";
import { motion } from "framer-motion";
import Button from "../Common/Button";

const Bubble = ({ size, position, delay }) => (
  <motion.div
    className="absolute rounded-full opacity-100 bg-gradient-to-r from-blue-500 to-sky-300 blur-lg"
    style={{
      width: size,
      height: size,
      top: position.y,
      left: position.x,
    }}
    initial={{ scale: 0 }}
    animate={{
      scale: [0, 1, 1, 0],
      y: [0, -20, -40, -60],
      opacity: [0.3, 0.5, 0.5, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

const Hero = () => {
  const bubbles = [
    { size: 40, position: { x: "10%", y: "20%" }, delay: 0 },
    { size: 60, position: { x: "70%", y: "60%" }, delay: 1 },
    { size: 30, position: { x: "30%", y: "70%" }, delay: 2 },
    { size: 50, position: { x: "80%", y: "30%" }, delay: 3 },
    { size: 35, position: { x: "50%", y: "50%" }, delay: 4 },
  ];

  return (
    <div
      style={{ height: "calc(100svh - 10rem)" }}
      className="relative mt-20 overflow-hidden sm:px-6 lg:px-8 backdrop-blur-md"
    >
      {bubbles.map((bubble, index) => (
        <Bubble key={index} {...bubble} />
      ))}
      <div className="flex items-center justify-center w-full h-full backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl text-center text-white"
      >
        <motion.span
          className="mt-2 text-4xl font-extrabold text-transparent sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-sky-300"
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
