import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function LivePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show popup only once per session
    const visited = sessionStorage.getItem("visited");
    if (!visited) {
      setShow(true);
      sessionStorage.setItem("visited", "true");
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 top-1 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShow(false)}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-10 max-w-2xl w-full relative mx-4 my-24"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cancel / Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              onClick={() => setShow(false)}
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                LEVEL UP TIME ⚡
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                From exam stress to project success 🙌 — level up your skills with CGCStudyHub.
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="/projects"
                  className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-md transition"
                >
                  Projects
                </a>
              </div>
              {/* WhatsApp Link */}
              <a
                href="https://chat.whatsapp.com/EWTTV8ho6KN0NEfOM9lz1k"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md transition"
              >
                Join WhatsApp Group
              </a>

              {/* Meme Image */}
              <img
                src="/lottie/Exam13.webp"
                alt="funny meme"
                className="mx-auto max-h-40 md:max-h-72 md:max-w-80 rounded-lg shadow-lg"
              />

              {/* OK Button */}
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition focus:outline-none"
                onClick={() => setShow(false)}
              >
                OK
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}