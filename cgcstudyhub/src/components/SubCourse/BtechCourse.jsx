import React, { useEffect, useRef, useState } from "react";
import { btechCourses } from "../../Constants/Animations";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Navbar from "../navbar/navbar";
import { Player } from "@lottiefiles/react-lottie-player";
import FunFact from "../FunFact";
import { GraduationCap, Cpu, Zap, Users } from "lucide-react";

export default function BtechCourses() {
  const navigate = useNavigate();
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Delay animation start to avoid blocking LCP
    const t = setTimeout(() => setAnimateHero(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-28 relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left lg:w-1/2 space-y-4 sm:space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-4"
            >
              <GraduationCap className="w-4 h-4" />
              Engineering Excellence
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Welcome Future{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Engineers
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"> 🚀</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl"
            >
              Explore specialized branches of B.Tech and shape your future with cutting-edge technologies. 
              Join thousands of students building tomorrow's innovations.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start mt-6 sm:mt-8"
            >
             
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Cpu className="w-5 h-5 text-purple-600" />
                <span className="font-semibold">6 Specializations</span>
              </div>
            
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="lg:w-1/2 flex justify-center mt-8 sm:mt-10 lg:mt-0 relative"
          >
            {/* Decorative Elements */}
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 bg-blue-200 dark:bg-blue-800/30 rounded-full blur-xl opacity-60" />
            <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-20 sm:w-32 h-20 sm:h-32 bg-purple-200 dark:bg-purple-800/30 rounded-full blur-xl opacity-60" />
            
            <motion.div
              animate={animateHero ? { y: [0, -15, 0] } : {}}
              transition={
                animateHero
                  ? { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                  : {}
              }
              className="relative z-10"
            >
              <img
                src="/lottie/Btech.webp"
                alt="Engineering Innovation"
                width={450}
                height={450}
                decoding="async"
                loading="lazy"
                className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Courses Grid Section */}
      <div className="relative px-4 sm:px-6 py-12 sm:py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Cpu className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Explore B.Tech{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Branches
                </span>
              </h2>
              <GraduationCap className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600" />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 sm:px-0"
            >
              Choose your specialization and embark on a journey of innovation, creativity, and technological excellence.
            </motion.p>
          </motion.div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {btechCourses.map((course, index) => (
              <CourseCard
                course={course}
                key={course.id}
                index={index}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

const CourseCard = React.memo(function CourseCard({ course, index, navigate }) {
  const ref = useRef(null);
  const playerRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [animationData, setAnimationData] = React.useState(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const animationLoaded = useRef(false);

  // Preload animation data
  useEffect(() => {
    if (isInView && !animationLoaded.current) {
      animationLoaded.current = true;
      if (typeof course.animation === "string") {
        setAnimationData(course.animation);
      } else {
        course.animation().then((mod) => {
          setAnimationData(mod.default || mod);
        });
      }
    }
  }, [isInView, course.animation]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.pause();
          playerRef.current = null;
        } catch (err) {
          console.warn("Failed to cleanup lottie", err);
        }
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/btech/${course.id}`)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center p-4 sm:p-6 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 will-change-transform"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { 
            delay: index * 0.05, 
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Background Gradient - Simplified and optimized */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/5 dark:to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Static Border - Removed blur for better performance */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-800/30 transition-colors duration-300" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Animation Container - Simplified */}
        <div className="relative mb-4 sm:mb-6 group w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] lg:w-[180px] lg:h-[180px]">
          {animationData ? (
            <Player
              ref={playerRef}
              src={animationData}
              loop
              autoplay
              style={{
                height: "100%",
                width: "100%",
                transform: isHovered ? 'scale(1.05) rotate(2deg)' : 'scale(1) rotate(0)',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl sm:rounded-2xl">
              <div className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                Loading...
              </div>
            </div>
          )}
        </div>

        {/* Course Title - Simplified */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white text-center leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {course.name}
        </h2>
        
        {/* Subtitle - Always visible but with hover effect */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center mt-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Explore comprehensive resources
        </p>
        
        {/* Action Indicator - Simplified */}
        <div className="flex items-center gap-1 mt-2 sm:mt-3 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span>Explore</span>
          <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
        </div>
      </div>
    </motion.div>
  );
});
