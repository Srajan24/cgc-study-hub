import React from "react";
import { motion } from "framer-motion";
import { coursesData } from "../../Constants/Animations";
import CourseCard from "./CourseCard";
import { BookOpen, GraduationCap } from "lucide-react";

export default function CoursesSection() {
  return (
    <section
      id="Courses"
      aria-label="Courses Section"
      className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-8"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white">
            Explore <span className="text-blue-600">Courses</span>
          </h2>
          <GraduationCap className="w-8 h-8 text-blue-600" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {coursesData.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
