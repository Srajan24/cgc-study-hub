import React, { useEffect, useRef, useState } from "react";
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

const semesterData = [
  { id: 1, title: "Semester 1", image: baby1 },
  { id: 2, title: "Semester 2", image: baby2 },
  { id: 3, title: "Semester 3", image: baby3 },
  { id: 4, title: "Semester 4", image: baby4 },
  { id: 5, title: "Semester 5", image: baby5 },
  { id: 6, title: "Semester 6", image: baby6 },
  { id: 7, title: "Semester 7", image: baby7 },
];

export default function robotics() {
  const navigate = useNavigate();
  const [selectedCollege, setSelectedCollege] = useState("COE");

  useEffect(() => {
    window.scrollTo(0, 0);

    // ✅ cleanup placeholder (if future listeners are added)
    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-32">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 dark:text-white mb-12">
        Robotics and AI <span className="text-indigo-600">Journey</span>
        </h1>

        {/* Semester Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {semesterData.map((sem) => (
            <SemesterCard key={sem.id} sem={sem} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

const SemesterCard = React.memo(({ sem, navigate }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleNavigate = () => {
    const routes = {
      1: "/btech/robotics/firstsemester",
      2: "/btech/robotics/secondsemester",
      3: "/btech/robotics/thirdsemester",
      4: "/btech/robotics/fourthsemester",
      5: "/btech/robotics/fifthsemester",
      6: "/btech/robotics/sixthsemester",
      7: "/btech/robotics/seventhsemester",
    };
    if (routes[sem.id]) navigate(routes[sem.id]);
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
