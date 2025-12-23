import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Laptop, BrainCircuit } from 'lucide-react';

const FourthSem = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
      <motion.div
        className="text-center max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-8">
            Coming Soon
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            We're working hard to bring you the best learning resources for Robotics 6th Semester.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          variants={itemVariants}
        >
          {[
            { icon: <BookOpen size={40} className="text-blue-500" />, text: "Comprehensive Notes" },
            { icon: <GraduationCap size={40} className="text-indigo-500" />, text: "Expert Lectures" },
            { icon: <Laptop size={40} className="text-purple-500" />, text: "Practical Labs" },
            { icon: <BrainCircuit size={40} className="text-pink-500" />, text: "AI Integration" }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="mb-2"
                variants={floatingAnimation}
                animate={floatingAnimation}
              >
                {item.icon}
              </motion.div>
              <span className="text-gray-700 dark:text-gray-200 font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-8 overflow-hidden"
          variants={itemVariants}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '35%' }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.p 
          className="text-gray-500 dark:text-gray-400 text-sm"
          variants={itemVariants}
        >
          Estimated completion: 35%
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FourthSem;