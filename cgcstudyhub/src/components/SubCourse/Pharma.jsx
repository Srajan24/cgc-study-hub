import React, { useEffect, useRef, useState } from "react";
import { pharmacourses } from "../../Constants/Animations";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Navbar from "../navbar/navbar";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast, Toaster } from "react-hot-toast";
import { Heart, Pill, Microscope, Users, Stethoscope } from "lucide-react";

export default function Pharma() {
  const navigate = useNavigate();
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setAnimateHero(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20 transition-colors duration-500">
      {/* Hot Toast Container */}
      <Toaster position="top-right" />

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
              className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-4"
            >
              <Heart className="w-4 h-4" />
              Healthcare Excellence
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Welcome Future{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Doctors
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"> 🚀</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl"
            >
              Explore specialized branches of Pharmacy and shape your future with cutting-edge medical knowledge. 
              Join the next generation of healthcare professionals making a difference.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start mt-6 sm:mt-8"
            >
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Pill className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">3 Specializations</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <span className="font-semibold">Healthcare Ready</span>
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
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 bg-emerald-200 dark:bg-emerald-800/30 rounded-full blur-xl opacity-60" />
            <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-20 sm:w-32 h-20 sm:h-32 bg-teal-200 dark:bg-teal-800/30 rounded-full blur-xl opacity-60" />
            
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
                src="/lottie/Pharma.webp"
                alt="Pharmaceutical Innovation"
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
              <Microscope className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-600" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Explore Pharma{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Branches
                </span>
              </h2>
              <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-teal-600" />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 sm:px-0"
            >
              Choose your pharmaceutical specialization and embark on a journey of healing, research, and medical innovation.
            </motion.p>
          </motion.div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {pharmacourses.map((course, index) => (
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
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (course.id === "pharmd") {
      toast("🚧 Pharm-D is coming soon!", { 
        icon: "⏳",
        style: {
          borderRadius: '12px',
          background: '#f0f9ff',
          color: '#0c4a6e',
          border: '1px solid #0ea5e9'
        }
      });
    } else {
      navigate(`/pharma/${course.id}`);
    }
  };

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
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col items-center p-4 sm:p-6 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 hover:border-emerald-300 dark:hover:border-emerald-600"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 60, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { 
            delay: index * 0.1, 
            duration: 0.6, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          },
        },
      }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Animation Container */}
        <div className="relative mb-4 sm:mb-6 group">
          <motion.div
            animate={isHovered ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative"
          >
            {isInView ? (
              <Player
                ref={playerRef}
                src={course.animation}
                loop
                autoplay
                style={{ 
                  height: "140px", 
                  width: "140px",
                  '@media (min-width: 640px)': {
                    height: "160px",
                    width: "160px"
                  },
                  '@media (min-width: 1024px)': {
                    height: "180px",
                    width: "180px"
                  },
                  filter: isHovered ? "drop-shadow(0 10px 20px rgba(16, 185, 129, 0.3))" : "none",
                  transition: "filter 0.3s ease"
                }}
              />
            ) : (
              <div className="h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] lg:h-[180px] lg:w-[180px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl sm:rounded-2xl">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-gray-400 dark:text-gray-500 text-sm font-medium"
                >
                  Loading...
                </motion.div>
              </div>
            )}
          </motion.div>
          
          {/* Decorative Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-200 dark:border-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        </div>

        {/* Course Title */}
        <motion.h2
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white text-center leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300"
        >
          {course.name}
        </motion.h2>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={isHovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center mt-2 px-2"
        >
          {course.id === "pharmd" ? "Coming Soon" : "Comprehensive medical resources"}
        </motion.p>
        
        {/* Action Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="flex items-center gap-1 mt-2 sm:mt-3 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium"
        >
          <span>{course.id === "pharmd" ? "Notify Me" : "Explore"}</span>
          <motion.div
            animate={isHovered ? { x: [0, 4, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {course.id === "pharmd" ? "🔔" : "→"}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
});
