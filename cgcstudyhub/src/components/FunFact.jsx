import React, { useState, useMemo } from "react";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const funFacts = [
  // Move this OUTSIDE the component so it’s not recreated every render
  "💡 IT engineers bridge the gap between business and technology.",
  "💡 Mechanical engineers design the machines that power our world.",
  "💡 Civil engineers shape the skylines we live under.",
  // ... (rest of your facts)
];

const FunFactButton = () => {
  const [showFact, setShowFact] = useState(false);
  const [fact, setFact] = useState("");

  // Pick a random fact only once when button is hovered
  const getRandomFact = () => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setFact(randomFact);
  };

  return (
    <div className="hidden md:flex fixed bottom-24 right-6 flex-col items-end space-y-2">
      {/* Fact popup */}
      <AnimatePresence>
        {showFact && (
          <motion.div
            key="fact-popup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-gray-800 shadow-lg p-3 rounded-xl max-w-xs border border-gray-200"
          >
            {fact}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => {
          getRandomFact();
          setShowFact(true);
        }}
        onMouseLeave={() => setShowFact(false)}
        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 shadow-lg text-white hover:shadow-xl transition"
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>
    </div>

  );
};

export default FunFactButton;
