import { useState, useEffect } from "react";

export default function AtsPopup() {
  const [show, setShow] = useState(false);

  const POPUP_DELAY = 10000; // show after 10 seconds on page load

  useEffect(() => {
    // Check if user has previously closed the popup
    const hasClosedPopup = localStorage.getItem('atsPopupClosed');
    
    if (!hasClosedPopup) {
      const timer = setTimeout(() => setShow(true), POPUP_DELAY);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClick = () => {
    window.open("https://ai-resume-ats-checker.netlify.app/", "_blank");
    hidePopup();
  };

  const handleClose = () => {
    hidePopup();
    // Mark that user has closed the popup
    localStorage.setItem('atsPopupClosed', 'true');
  };

  const hidePopup = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-18 left-1/2 transform -translate-x-1/2 z-50 w-[] max-w-xs sm:max-w-sm px-3">
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 border  border-blue-600 text-blue-600 rounded-xl shadow-lg px-4 py-2 sm:px-6 sm:py-3 hover:bg-blue-600 hover:text-white transition animate-bounce">
        <span
          className="cursor-pointer font-medium text-sm sm:text-base truncate"
          onClick={handleClick}
        >
          Resume-Agnipariksha 🔥
        </span>
        <button
          onClick={handleClose}
          className="ml-3 text-lg font-bold hover:text-gray-400"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
