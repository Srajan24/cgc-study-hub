import React, { useEffect, useRef } from "react";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";

// Images
import baby1 from "../../assets/babyimage/1.webp";
import baby2 from "../../assets/babyimage/2.webp";
import baby3 from "../../assets/babyimage/3.webp";
import baby4 from "../../assets/babyimage/4.webp";
import baby5 from "../../assets/babyimage/5.webp";
import baby6 from "../../assets/babyimage/6.webp";
import baby7 from "../../assets/babyimage/7.webp";

// Semester data
const semesterData = [
  { id: 1, title: "Semester 1", image: baby1 },
  { id: 2, title: "Semester 2", image: baby2 },
  { id: 3, title: "Semester 3", image: baby3 },
  { id: 4, title: "Semester 4", image: baby4 },
  { id: 5, title: "Semester 5", image: baby5 },
  { id: 6, title: "Semester 6", image: baby6 },
  { id: 7, title: "Semester 7", image: baby7 },
];

// Routes map (instead of long if/else)
const semesterRoutes = {
  1: "/btech/ece/firstsemester",
  2: "/btech/ece/secondsemester",
  3: "/btech/ece/thirdsemester",
  4: "/btech/ece/fourthsemester",
  5: "/btech/ece/fifthsemester",
  6: "/btech/ece/sixthsemester",
  7: "/btech/ece/seventhsemester",
};

export default function ECE() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-25">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 dark:text-white mb-12">
          <span className="text-indigo-600">ECE Journey</span>
        </h1>

        {/* Semester Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {semesterData.map((sem) => (
            <SemesterCard key={sem.id} sem={sem} />
          ))}
        </div>
      </div>
    </div>
  );
}

const SemesterCard = React.memo(({ sem }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  const handleNavigate = () => {
    const route = semesterRoutes[sem.id];
    if (route) navigate(route);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={handleNavigate}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      {isInView && (
        <img
          src={sem.image}
          loading="lazy"
          alt={sem.title}
          className="w-full h-56 object-contain mx-auto mb-4"
        />
      )}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {sem.title}
      </h2>
    </motion.div>
  );
});
