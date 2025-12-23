import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animateFloat, setAnimateFloat] = useState(false);

  const scrollToCourses = useCallback(() => {
    const section = document.getElementById("Courses");
    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ 
        top: offsetTop, 
        behavior: "smooth",
        block: "start"
      });
    }
  }, []);

  useEffect(() => {
    // Start floating animation after image loads to avoid blocking LCP
    if (imageLoaded) {
      const timer = setTimeout(() => setAnimateFloat(true), 500);
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  return (
    <main
      id="Home"
      role="main"
      aria-label="Hero section - Welcome to CGC StudyHub"
      className="relative flex flex-col md:flex-row items-center justify-center 
        min-h-[80vh] md:min-h-screen 
        pt-28 md:pt-18 px-4 sm:px-6 md:px-8 
        bg-gray-100 dark:bg-gray-800 
        transition-colors duration-500
        w-full overflow-x-hidden"
    >
      {/* Left Text Section */}
      <div className="flex-1 text-center md:text-left space-y-6 max-w-2xl">
        {/* Enhanced Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white leading-tight">
            <span className="block mb-2">Hey <span className="text-blue-700 dark:text-blue-400">CGCians</span>,</span>
            <span className="block">Welcome to</span>
            <span className="block text-blue-600 dark:text-blue-400">CGCStudyHub</span>
          </h1>
        </motion.div>

        {/* Enhanced Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          Your one-stop hub for free notes, courses, and academic growth.
        </motion.p>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center md:justify-start gap-6 py-4"
        >
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">Free Resources</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">Student Community</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">Quality Content</span>
          </div>
        </motion.div>

        {/* Enhanced Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          onClick={scrollToCourses}
          aria-label="Explore available courses and study materials"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Explore Courses
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Right Illustration with enhanced animations */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex-1 flex justify-center mt-12 md:mt-0 relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl" />
        
        <motion.div
          animate={animateFloat ? {
            y: [0, -15, 0],
            rotate: [0, 2, 0, -2, 0]
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="w-[450px] h-[400px] bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-gray-400" />
            </div>
          )}
          
          <img
            src="/lottie/Hero.webp"
            alt="CGC StudyHub - Your learning companion"
            className={`w-full max-w-[450px] h-auto transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            width={450}
            height={400}
            decoding="async"
            loading="eager"
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>
      </motion.div>
    </main>
  );
}
