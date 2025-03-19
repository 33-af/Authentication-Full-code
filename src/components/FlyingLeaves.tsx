"use client"

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FlyingLeaves = () => {
  const [randomValues, setRandomValues] = useState<any[]>([]);

  useEffect(() => {
    const values = [...Array(15)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      rotate: Math.random() * 60 - 30, 
    }));
    setRandomValues(values);
  }, []);

  const leafVariants = {
    initial: { opacity: 0, y: -100, x: 0, rotate: 0 }, 
    animate: {
      opacity: 1,
      y: 100,
      x: [0, 50, -50], 
      rotate: [0, 15, -15], 
      transition: {
        y: { type: 'spring', stiffness: 20, damping: 10 },
        x: { repeat: Infinity, repeatType: 'loop', duration: 4, ease: 'easeInOut' },
        opacity: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
        rotate: { repeat: Infinity, repeatType: 'loop', duration: 4, ease: 'easeInOut' }
      }
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-screen pointer-events-none">
      {randomValues.length > 0 &&
        randomValues.map((random, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              backgroundColor: '#BDC83D',
              width: '71px', 
              height: '25px', 
              borderRadius: '20px', 
              top: random.top,
              left: random.left,
              animationDelay: random.delay,
              transform: `rotate(${random.rotate}deg)`, 
            }}
            variants={leafVariants}
            initial="initial"
            animate="animate"
          />
        ))}
    </div>
  );
};

export default FlyingLeaves;
