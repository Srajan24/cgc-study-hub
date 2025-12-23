import React, { Suspense } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

// Lazy load Lottie Player
const Player = React.lazy(() =>
  import("@lottiefiles/react-lottie-player").then((mod) => ({ default: mod.Player }))
);

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function CourseCard({ course, index }) {
  let route = "#";
  if (course.id === "btech") route = "/btech";
  if (course.id === "pharma") route = "/pharma";

  return (
    <Link
      to={route}
      key={course.id}
      className="block"
      aria-label={`Go to ${course.title} course`}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transform transition-transform duration-300 ease-in-out overflow-hidden flex flex-col items-center p-4 cursor-pointer hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 min-h-[320px] w-full"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={index}
      >
        <Suspense
          fallback={
            <div className="w-full max-w-[200px] aspect-square bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />
          }
        >
          <Player
            src={course.animation}
            loop
            autoplay
              data-testid="lottie-player"
            style={{
              width: "100%",
              maxWidth: "200px",
              height: "auto",
              aspectRatio: "1 / 1",
            }}
          />
        </Suspense>

        <div className="p-2 text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {course.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}
