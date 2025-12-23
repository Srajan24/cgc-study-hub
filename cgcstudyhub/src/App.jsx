import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from '@vuer-ai/react-helmet-async';
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext.jsx";

import SEO from "./SEO";
const RoadmapPage = lazy(() => import("./components/Roadmap/RoadmapPage"));
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/Footer";
import LoadingScreen from "./components/Loading/loading";

// Lazy-loaded components
const ATS = lazy(() => import("./components/ATS/ATS"));
const ChatBotWidget = lazy(() => import("./ChatBot/ChatBotWidget"));
const LivePopup = lazy(() => import("./components/LIVE/LivePop"));
const HeroSection = lazy(() => import("./components/Heropsection/Herosection"));
const Courses = lazy(() => import("./components/Courses/Course"));
const ContactSection = lazy(() => import("./components/Contact/Contact"));
const BackToTopButton = lazy(() => import("./components/BackToTopButton/BackToTopButton"));

const BtechCourses = lazy(() => import("./components/SubCourse/BtechCourse"));
const Chart = lazy(() => import("./components/ProjectsPage/ProjectsPage"));
const Certificate = lazy(() => import("./components/CertificatePage/CertificatePage"));

// BTech Courses
const CSE = lazy(() => import("./components/sub-subCourses/CSE"));
const CSEFirstSemester = lazy(() => import("./components/All-Semester/Btech-CSE/FirstSemester"));
const CSESecondSemester = lazy(() => import("./components/All-Semester/Btech-CSE/SecondSemester"));
const CSEThirdSemester = lazy(() => import("./components/All-Semester/Btech-CSE/ThirdSemester"));
const CSEFourthSemester = lazy(() => import("./components/All-Semester/Btech-CSE/FourthSem"));
const CSEFifthSemester = lazy(() => import("./components/All-Semester/Btech-CSE/FifthSem"));
const CSESixthSemester = lazy(() => import("./components/All-Semester/Btech-CSE/SixthSem"));
const CSESeventhSemester = lazy(() => import("./components/All-Semester/Btech-CSE/SeveenthSem"));

// ECE Courses
const ECE = lazy(() => import("./components/sub-subCourses/ECE"));
const ECEFirstsemester = lazy(() => import("./components/All-Semester/ECE/FirstSem"));
const ECESecondSemester = lazy(() => import("./components/All-Semester/ECE/SecondSem"));
const ECEThirdSemester = lazy(() => import("./components/All-Semester/ECE/ThirdSem"));
const ECEFourthSemester = lazy(() => import("./components/All-Semester/ECE/FourthSem"));
const ECEFifthSemester = lazy(() => import("./components/All-Semester/ECE/FifthSem"));
const ECESixthSemester = lazy(() => import("./components/All-Semester/ECE/SixthSem"));
const ECESeventhSemester = lazy(() => import("./components/All-Semester/ECE/SevenSem"));

// IT Courses
const IT = lazy(() => import("./components/sub-subCourses/IT"));
const ITFirstsemester = lazy(() => import("./components/All-Semester/IT/FirstSem"));
const ITSecondsemester = lazy(() => import("./components/All-Semester/IT/SecondSem"));
const ITThirdsemester = lazy(() => import("./components/All-Semester/IT/ThirdSem"));
const ITFourthsemester = lazy(() => import("./components/All-Semester/IT/FourthSem"));
const ITFifthsemester = lazy(() => import("./components/All-Semester/IT/FifthSem"));
const ITSixthSemester = lazy(() => import("./components/All-Semester/IT/SixthSem"));
const ITSevenSemester = lazy(() => import("./components/All-Semester/IT/SevenSem"));

// AIDS Courses
const AIDS = lazy(() => import("./components/sub-subCourses/Aids"));
const AIDSFirstSemester = lazy(() => import("./components/All-Semester/AIDS/FirstSem"));
const AIDSSecondSemester = lazy(() => import("./components/All-Semester/AIDS/SecondSem"));
const AIDSThirdSemester = lazy(() => import("./components/All-Semester/AIDS/ThirdSem"));
const AIDSFourthSemester = lazy(() => import("./components/All-Semester/AIDS/FourthSem"));
const AIDSFifthSemester = lazy(() => import("./components/All-Semester/AIDS/FifthSem"));
const AIDSSixthSemester = lazy(() => import("./components/All-Semester/AIDS/SixthSem"));
const AIDSSevenSemester = lazy(() => import("./components/All-Semester/AIDS/SevenSem"));

// AIML Courses
const AIML = lazy(() => import("./components/sub-subCourses/Aiml"));
const AIMLFirstSemester = lazy(() => import("./components/All-Semester/AIML/FirstSem"));
const AIMLSecondSemester = lazy(() => import("./components/All-Semester/AIML/SecondSem"));
const AIMLThirdSemester = lazy(() => import("./components/All-Semester/AIML/ThirdSem"));
const AIMLFourthSemester = lazy(() => import("./components/All-Semester/AIML/FourthSem"));
const AIMLFifthSemester = lazy(() => import("./components/All-Semester/AIML/FifthSem"));
const AIMLSixthSemester = lazy(() => import("./components/All-Semester/AIML/SixthSem"));
const AIMLSeventhSemester = lazy(() => import("./components/All-Semester/AIML/SevenSem"));

//Robotics
const Robotics = lazy(() => import("./components/sub-subCourses/Robotics"));
const RoboticsFirstSemester = lazy(() => import("./components/All-Semester/Robotics/FirstSem"));
const RoboticsSecondSemester = lazy(() => import("./components/All-Semester/Robotics/SecondSem"));
const RoboticsThirdSemester = lazy(() => import("./components/All-Semester/Robotics/ThirdSem"));
const RoboticsFourthSemester = lazy(() => import("./components/All-Semester/Robotics/FourthSem"));
const RoboticsFifthSemester = lazy(() => import("./components/All-Semester/Robotics/FifthSem"));
const RoboticsSixthSemester = lazy(() => import("./components/All-Semester/Robotics/SixthSem"));
const RoboticsSeventhSemester = lazy(() => import("./components/All-Semester/Robotics/SevenSem"));

// Pharma Courses
const Pharma = lazy(() => import("./components/SubCourse/Pharma"));
const BPharma = lazy(() => import("./components/sub-subCourses/BPharma"));
const BFirstSemester = lazy(() => import("./components/All-Semester/BPharma/FirstSem"));
const BSecondSemester = lazy(() => import("./components/All-Semester/BPharma/SecondSem"));
const BThirdSemester = lazy(() => import("./components/All-Semester/BPharma/ThirdSem"));
const BForthSemester = lazy(() => import("./components/All-Semester/BPharma/FourthSem"));
const BFifthSemester = lazy(() => import("./components/All-Semester/BPharma/FifthSem"));
const BSixthSemester = lazy(() => import("./components/All-Semester/BPharma/SixthSem"));
const BSevenSemester = lazy(() => import("./components/All-Semester/BPharma/SevenSem"));
const BEightSemester = lazy(() => import("./components/All-Semester/BPharma/EigthSem"));

// Home Component (no Suspense here, handled globally)
function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors duration-500">
      <LivePopup />
      <Toaster position="top-right" />
      <HeroSection />
      <Courses />
      <ContactSection />
      <ATS />
    </div>
  );
}

// App Component
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate short delay for smooth fade-out loader
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          {loading ? (
            <LoadingScreen />
          ) : (
            <Suspense fallback={<LoadingScreen />}>
              <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors">
                <Navbar />
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/projects" element={<Chart />} />
                <Route path="/certificates" element={<Certificate />} />

                {/* BTech Routes */}
                <Route path="/btech" element={<BtechCourses />} />
                <Route path="/btech/cse" element={<CSE />} />
                <Route path="/btech/cse/firstsemester" element={<CSEFirstSemester />} />
                <Route path="/btech/cse/thirdsemester" element={<CSEThirdSemester />} />
                <Route path="/btech/cse/fourthsemester" element={<CSEFourthSemester />} />
                <Route path="/btech/cse/fifthsemester" element={<CSEFifthSemester />} />
                <Route path="/btech/cse/sixthsemester" element={<CSESixthSemester />} />
                <Route path="/btech/cse/seventhsemester" element={<CSESeventhSemester />} />

                <Route path="/btech/ece" element={<ECE />} />
                <Route path="/btech/ece/firstsemester" element={<ECEFirstsemester />} />
                <Route path="/btech/ece/secondsemester" element={<ECESecondSemester />} />
                <Route path="/btech/ece/thirdsemester" element={<ECEThirdSemester />} />
                <Route path="/btech/ece/fourthsemester" element={<ECEFourthSemester />} />
                <Route path="/btech/ece/fifthsemester" element={<ECEFifthSemester />} />
                <Route path="/btech/ece/sixthsemester" element={<ECESixthSemester />} />
                <Route path="/btech/ece/seventhsemester" element={<ECESeventhSemester />} />

                <Route path="/btech/it" element={<IT />} />
                <Route path="/btech/it/firstsemester" element={<ITFirstsemester />} />
                <Route path="/btech/it/secondsemester" element={<ITSecondsemester />} />
                <Route path="/btech/it/thirdsemester" element={<ITThirdsemester />} />
                <Route path="/btech/it/fourthsemester" element={<ITFourthsemester />} />
                <Route path="/btech/it/fifthsemester" element={<ITFifthsemester />} />
                <Route path="/btech/it/sixthsemester" element={<ITSixthSemester />} />
                <Route path="/btech/it/seventhsemester" element={<ITSevenSemester />} />

                <Route path="/btech/aids" element={<AIDS />} />
                <Route path="/btech/aids/firstsemester" element={<AIDSFirstSemester />} />
                <Route path="/btech/aids/secondsemester" element={<AIDSSecondSemester />} />
                <Route path="/btech/aids/thirdsemester" element={<AIDSThirdSemester />} />
                <Route path="/btech/aids/fourthsemester" element={<AIDSFourthSemester />} />
                <Route path="/btech/aids/fifthsemester" element={<AIDSFifthSemester />} />
                <Route path="/btech/aids/sixthsemester" element={<AIDSSixthSemester />} />
                <Route path="/btech/aids/seventhsemester" element={<AIDSSevenSemester />} />

                <Route path="/btech/aiml" element={<AIML />} />
                <Route path="/btech/aiml/firstsemester" element={<AIMLFirstSemester />} />
                <Route path="/btech/aiml/secondsemester" element={<AIMLSecondSemester />} />
                <Route path="/btech/aiml/thirdsemester" element={<AIMLThirdSemester />} />
                <Route path="/btech/aiml/fourthsemester" element={<AIMLFourthSemester />} />
                <Route path="/btech/aiml/fifthsemester" element={<AIMLFifthSemester />} />
                <Route path="/btech/aiml/sixthsemester" element={<AIMLSixthSemester />} />
                <Route path="/btech/aiml/seventhsemester" element={<AIMLSeventhSemester />} />

                <Route path="/btech/robotics" element={<Robotics />} />
                <Route path="/btech/robotics/firstsemester" element={<RoboticsFirstSemester />} />
                <Route path="/btech/robotics/secondsemester" element={<RoboticsSecondSemester />} />
                <Route path="/btech/robotics/thirdsemester" element={<RoboticsThirdSemester />} />
                <Route path="/btech/robotics/fourthsemester" element={<RoboticsFourthSemester />} />
                <Route path="/btech/robotics/fifthsemester" element={<RoboticsFifthSemester />} />
                <Route path="/btech/robotics/sixthsemester" element={<RoboticsSixthSemester />} />
                <Route path="/btech/robotics/seventhsemester" element={<RoboticsSeventhSemester />} />
           

                {/* Pharma Routes */}
                <Route path="/pharma" element={<Pharma />} />
                <Route path="/pharma/bpharma" element={<BPharma />} />
                <Route path="/pharma/bpharma/firstsemester" element={<BFirstSemester />} />
                <Route path="/pharma/bpharma/secondsemester" element={<BSecondSemester />} />
                <Route path="/pharma/bpharma/thirdsemester" element={<BThirdSemester />} />
                <Route path="/pharma/bpharma/fourthsemester" element={<BForthSemester />} />
                <Route path="/pharma/bpharma/fifthsemester" element={<BFifthSemester />} />
                <Route path="/pharma/bpharma/sixthsemester" element={<BSixthSemester />} />
                <Route path="/pharma/bpharma/seventhsemester" element={<BSevenSemester />} />
                <Route path="/pharma/bpharma/eighthsemester" element={<BEightSemester />} />
                </Routes>
                <ChatBotWidget />
                <Footer />
              </div>
            </Suspense>
          )}
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
