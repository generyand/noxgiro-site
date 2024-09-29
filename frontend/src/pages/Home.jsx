import React from 'react'
import Hero from '../components/Landing/Hero'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[100svh] w-full px-4 max-w-screen-2xl mx-auto">
      <Hero />
    </div>
  );
};

export default Home