/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, Suspense, useState } from "react";
import Navbar from "../../navbar/navbar";
import { ArrowLeft, FileText, ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ecesem5subject } from "../../../Constants/courses";
import { ITSem5Subjects } from "../../../Constants/AI";


const FourthSemester = () => {
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <>
      <Navbar />


      <motion.div
        className="flex flex-col items-center justify-start min-h-screen px-6 pb-16 pt-32"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-bold text-center text-black dark:text-white mb-16">
          Semester 5 Notes
        </h1>

        <div className="w-full max-w-4xl space-y-8">
          <Suspense fallback={<div className="text-white">Loading Notes...</div>}>
            {[...ecesem5subject, ...ITSem5Subjects.filter(sub => sub?.subject === "Programming in Java")]
              .filter(subject => subject?.subject )

              .map((subject, index) => (
                <SubjectBlock key={index} subject={subject} delay={index * 0.1} />
              ))}
          </Suspense>
        </div>
      </motion.div>
    </>
  );
};

const SubjectBlock = ({ subject, delay }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isQBOpen, setIsQBOpen] = useState(false);
  const [islabOpen, setIslabOpen] = useState(false);
  const [isLetOpen, setIsLetOpen] = useState(false);
  const [isTopicOpen, setIsTopicOpen] = useState(false);

  const notes = subject.units.filter((unit) =>
    unit.name.toLowerCase().includes("unit") || unit.name.toLowerCase().includes("notes")
  );

  const questionBank = subject.units.filter((unit) =>
    unit.name.toLowerCase().includes("theories") ||
    unit.name.toLowerCase().includes("question") ||
    unit.name.toLowerCase().includes("short-ans")
  );
  const labManual = subject.units.filter((unit) =>
    unit.name.toLowerCase().includes("labmanual") // Handles both "labManual" and "labManual2"
  );
  const topics = subject.units.filter((unit) =>
    unit.name.toLowerCase().includes("topics") // Handles both "labManual" and "labManual2"
  );

  const letter = subject.units.filter((unit) =>
    unit.name.toLowerCase().includes("letter") // Handles both "labManual" and "labManual2"
  );

  const others = subject.units.filter(
    (unit) =>
      !unit.name.toLowerCase().includes("unit") &&
      !unit.name.toLowerCase().includes("notes") &&
      !unit.name.toLowerCase().includes("theories") &&
      !unit.name.toLowerCase().includes("question") &&
      !unit.name.toLowerCase().includes("short-ans") &&
      !unit.name.toLowerCase().includes("labmanual") &&
      !unit.name.toLowerCase().includes("letter") &&
      !unit.name.toLowerCase().includes("topics")
  );

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 border-b border-gray-500 pb-2">
        {subject.subject}
      </h2>

      {/* Other Files (Books, PYQs, etc.) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-2">
        {others.map((unit, unitIndex) => (
          <UnitLink key={unitIndex} unit={unit} delay={unitIndex * 0.05} />
        ))}
      </div>

      {/* Notes Section */}
      {notes.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            className="flex items-center justify-between  text-left text-black dark:text-white px-2 py-2  rounded-md hover:bg-white/20 transition"
          >
            <span className="text-lg font-semibold">Notes</span>
            {isNotesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {isNotesOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 ml-2">
              {notes.map((unit, unitIndex) => (
                <UnitLink key={unitIndex} unit={unit} delay={unitIndex * 0.05} />
              ))}
            </div>
          )}
        </div>
      )}
      {/* Topics Section */}
      {topics.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setIsTopicOpen(!isTopicOpen)}
            className="flex items-center justify-between text-left text-black dark:text-white px-2 py-2 rounded-md hover:bg-white/20 transition"
          >
            <span className="text-lg font-semibold">Topics</span>
            {isTopicOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {isTopicOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 ml-2">
              {topics.map((unit, unitIndex) => (
                <UnitLink key={unitIndex} unit={unit} delay={unitIndex * 0.05} />
              ))}
            </div>
          )}
        </div>
      )}

      {questionBank.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setIsQBOpen(!isQBOpen)}
            className="flex items-center justify-between text-left text-black dark:text-white px-2 py-2 rounded-md hover:bg-white/20 transition"
          >
            <span className="text-lg font-semibold">Question Bank</span>
            {isQBOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {isQBOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 ml-2">
              {questionBank.map((unit, unitIndex) => (
                <UnitLink key={unitIndex} unit={unit} delay={unitIndex * 0.05} />
              ))}
            </div>
          )}
        </div>
      )}
      {labManual.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setIslabOpen(!islabOpen)}
            className="flex items-center justify-between text-left text-black dark:text-white px-2 py-2 rounded-md hover:bg-white/20 transition"
          >
            <span className="text-lg font-semibold">Lab Manual</span>
            {islabOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {islabOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 ml-2">
              {labManual.map((unit, unitIndex) => (
                <UnitLink key={unitIndex} unit={unit} delay={unitIndex * 0.05} />
              ))}
            </div>
          )}
        </div>
      )}
      {letter.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setIsLetOpen(!isLetOpen)}
            className="flex items-center justify-between text-left text-white px-2 py-2 rounded-md hover:bg-white/20 transition"
          >
            <span className="text-lg font-semibold">Letters</span>
            {isLetOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {isLetOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 ml-2">
              {letter.map((unit, unitIndex) => (
                <UnitLink key={unitIndex} unit={unit} delay={unitIndex * 0.05} />
              ))}
            </div>
          )}
        </div>
      )}
      {/* ✅ Show Reference YouTube Videos */}
      {subject.videos && subject.videos.length > 0 && (
        <div className="mb-5  mt-5 flex flex-col gap-5">
          {subject.videos.map((video, index) => (
            <a
              key={index}
              href={video}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white hover:text-blue-500 font-semibold 
                 text-lg sm:text-xl md:text-2xl lg:text-xl  
                 transition-colors duration-300"
            >
              🎓 {subject.videos.length === 1
                ? "Learn with Video"
                : `Learn with Video ${index + 1}`}
            </a>
          ))}
        </div>
      )}



    </motion.div>
  );
};

const UnitLink = ({ unit, delay }) => {
  const label = unit.name.toLowerCase();
  const isPPT = unit.file.endsWith(".ppt") || unit.file.endsWith(".pptx");
  const isComingSoon = unit.file === "#" || label.includes("coming soon");


  const getBadgeColor = () => {
    if (isComingSoon) return "bg-gray-500";
    if (label.includes("pyq")) return "bg-yellow-600";
    if (label.includes("book")) return "bg-purple-600";
    if (label.includes("notes") || label.includes("unit")) return "bg-green-600";
    if (label.includes("syllabus")) return "bg-blue-600";
    if (label.includes("pyq")) return "bg-yellow-600";
    if (label.includes("book")) return "bg-purple-600";
    if (label.includes("notes") || label.includes("unit")) return "bg-green-600";
    if (label.includes("syllabus")) return "bg-blue-600";
    if (label.includes("imp")) return "bg-red-600";
    if (label.includes("mst")) return "bg-orange-600";
    if (label.includes("2023")) return "bg-cyan-600";
    if (label.includes("2024")) return "bg-cyan-600";
    if (label.includes("2025")) return "bg-cyan-600";
    if (label.includes("handwritten")) return "bg-emerald-600";
    if (label.includes("qb")) return "bg-emerald-600";
    if (label.includes("lab")) return "bg-emerald-600";
    if (label.includes("topics")) return "bg-purple-600";
    return "bg-gray-600";
  };


  return (
    <motion.div
      className="flex items-center space-x-3"
      initial={{ opacity: 0, x: 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="flex item-center space-x-3">
        <FileText className="w-5 h-5 text-red-500 shrink-0" />
        {isComingSoon ? (
          <div className="text-gray-500 dark:text-gray-400 text-lg flex items-center space-x-2 cursor-not-allowed">
            <span>{unit.displayName || unit.name}</span>
            <span className={`text-xs text-white px-2 py-0.5 rounded-full ${getBadgeColor()}`}>
              Coming Soon
            </span>
          </div>
        ) : (
          <a
            href={unit.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 text-lg transition-colors flex items-center space-x-2"
          >
            <span>{unit.displayName || unit.name}</span>
            <span className={`text-xs text-white px-2 py-0.5 rounded-full ${getBadgeColor()}`}>
              {label.includes("pyq")
                ? "PYQ"
                : label.includes("PPT")
                  ? "PPT"
                  : label.includes("book")
                    ? "Book"
                    : label.includes("notes") || label.includes("unit")
                      ? "Notes"
                      : label.includes("syllabus")
                        ? "Syllabus"
                        : label.includes("imp")
                          ? "Imp"
                          : label.includes("mst")
                            ? "MST"
                            : label.includes("2023")
                              ? "2023"
                              : label.includes("2024")
                                ? "2024"
                                : label.includes("2025")
                                  ? "2025"
                                  : label.includes("handwritten")
                                    ? "Handwritten"
                                    : label.includes("qb")
                                      ? "QB"
                                      : label.includes("lab")
                                        ? "Lab"
                                        : label.includes("topics")
                                          ? "Topics"
                                          : "PDF"}
            </span>
          </a>
        )}
      </div>

      {/* ✅ Embed PPT if it's a .ppt or .pptx file */}
      {isPPT && unit.file.startsWith("http") && (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(unit.file)}`}
          width="100%"
          height="400"
          frameBorder="0"
          title={unit.name}
          className="rounded-md border mt-2"
        />
      )}
    </motion.div>
  );
};
export default FourthSemester;
