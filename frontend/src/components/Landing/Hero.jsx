import React from 'react'
import { motion } from 'framer-motion'
import Button from '../Common/Button'

const Hero = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen px-4 bg-gray-900 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl text-center text-white"
      >
        <motion.h1 
          className="mb-4 text-4xl font-extrabold text-transparent sm:mb-6 sm:text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome to NoxGiro
        </motion.h1>
        <motion.p 
          className="mb-6 text-lg text-gray-300 sm:mb-8 sm:text-xl md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Elevate your online presence with AI-powered web solutions: Design, Develop, and Engage.
        </motion.p>
        <Button onClick={() => console.log('Get Started clicked')}>
          Get Started
        </Button>
      </motion.div>
    </div>
  )
}

export default Hero