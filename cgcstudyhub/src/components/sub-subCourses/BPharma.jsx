import React, { useEffect, useRef } from "react";
import Navbar from "../navbar/navbar";
import {  motion,useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Import Pharma Images (replace with actual pharma images later)
import pharma1 from "../../assets/image/1.webp";
import pharma2 from "../../assets/image/2.webp";
import pharma3 from "../../assets/image/3.webp";
import pharma4 from "../../assets/image/4.webp";
import pharma5 from "../../assets/image/5.webp";
import pharma6 from "../../assets/image/6.1.webp";
import pharma7 from "../../assets/image/7.webp";
import pharma8 from "../../assets/image/8.webp";

const semesterData = [
  { id: 1, title: "Semester 1", image: pharma1 },
  { id: 2, title: "Semester 2", image: pharma2 },
  { id: 3, title: "Semester 3", image: pharma3 },
  { id: 4, title: "Semester 4", image: pharma4 },
  { id: 5, title: "Semester 5", image: pharma5 },
  { id: 6, title: "Semester 6", image: pharma6 },
  { id: 7, title: "Semester 7", image: pharma7 },
  { id: 8, title: "Semester 8", image: pharma8 },
];

export default function BPharma() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-30">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 dark:text-white mb-12">
          BPharma <span className="text-indigo-600">Journey</span>
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={() => {
        if (sem.id === 1) navigate("/pharma/bpharma/firstsemester");
        else if (sem.id === 2) navigate("/pharma/bpharma/secondsemester");
        else if (sem.id === 3) navigate("/pharma/bpharma/thirdsemester");
        else if (sem.id === 4) navigate("/pharma/bpharma/fourthsemester");
        else if (sem.id === 5) navigate("/pharma/bpharma/fifthsemester");
        else if (sem.id === 6) navigate("/pharma/bpharma/sixthsemester");
        else if (sem.id === 7) navigate("/pharma/bpharma/seventhsemester");
        else if (sem.id === 8) navigate("/pharma/bpharma/eighthsemester");

      }}
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
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{sem.title}</h2>
    </motion.div>
  );
});
