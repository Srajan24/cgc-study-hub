import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // <-- changed import
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Throttle with requestAnimationFrame for performance
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 200);
      });
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-22 z-50 flex flex-col items-center"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="mb-2 px-3 py-1 text-sm text-white bg-gray-800 rounded-md shadow-lg"
              >
                Back to Top
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -6, 0], // gentle bounce
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            onClick={scrollToTop}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6"/>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
