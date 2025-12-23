import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Home, BookOpen, Award, Briefcase, Phone, ChevronDown, ChevronUp, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/image/mainlogo.png";
import { toast } from "react-hot-toast";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [darkMode, setDarkMode] = useState(() => {
  //   return localStorage.getItem("darkMode") === "true" ||
  //     (!localStorage.getItem("darkMode") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  // });
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [mobileOpenMenu, setMobileOpenMenu] = useState(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", href: "#Home", icon: <Home size={20} /> },
    { name: "Roadmap", href: "/roadmap", icon: <BookOpen size={20} /> },
    {
      name: "Courses",
      href: "#Courses",
      icon: <BookOpen size={20} />,
      submenu: [
        {
          name: "BTech",
          link: "/btech",
          submenu: [
            { name: "CSE", link: "/btech/cse" },
            { name: "AIML", link: "/btech/aiml" },
            { name: "AIDS", link: "/btech/aids" },
            { name: "ECE", link: "/btech/ece" },
            { name: "IT", link: "/btech/it" },
            { name: "Robotics", link: "/btech/robotics" }
          ],
        },
        { name: "MBA", href: "#MBA" },
        {
          name: "Pharmacy",
          link: "/pharma",
          submenu: [{ name: "B-Pharma", link: "/pharma/bpharma" }],
        },
        { name: "BBA", href: "#BBA" },
      ],
    },
    { name: "Projects", link: "/projects", icon: <Briefcase size={20} /> },
    { name: "Certificates", link: "/certificates", icon: <Award size={20} /> },
    { name: "Contacts", href: "#Contacts", icon: <Phone size={20} /> },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.15 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, staggerChildren: 0.05, when: "beforeChildren" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.1 } },
  };

  const itemVariants = { hidden: { opacity: 0, y: -5 }, visible: { opacity: 1, y: 0 } };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const handleNavigation = (e, target) => {
    e.preventDefault();
    setIsOpen(false);
    setMobileOpenMenu(null);
    setMobileOpenSubmenu(null);

    if (target === "pharmd" || target === "#MBA" || target === "#BBA") {
      toast("🚧 This Section is coming soon!", { icon: "⏳" });
      return;
    }

    if (target.startsWith("/")) {
      navigate(target);
      return;
    }

    if (location.pathname !== "/") {
      navigate(`/${target}`);
      return;
    }

    const element = document.querySelector(target);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ 
        top: offsetTop, 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <nav role="navigation" aria-label="Main navigation" className={`fixed w-full top-0 z-50 transition-colors sm:py-1 ${scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-white dark:bg-gray-900"}`}>
      <div className="container mx-auto px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={Logo} alt="Logo" width={64} height={64} className="w-12 h-12 mt-2 sm:w-16 sm:h-16 object-contain" />
              <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">CGCStudyHub</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {menuItems.map((item, idx) => (
                <div key={idx} className="relative group" onMouseEnter={() => setOpenMenu(idx)} onMouseLeave={() => { setOpenMenu(null); setOpenSubmenu(null); }}>
                  <div className="flex items-center space-x-1">
                    {item.link ? (
                      <Link
                        to={item.link}
                        onClick={(e) => handleNavigation(e, item.link)}
                        className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {item.icon} {item.name}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => handleNavigation(e, item.href)}
                        className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {item.icon} {item.name}
                      </a>
                    )}
                    {item.submenu && (
                      openMenu === idx ? (
                        <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      )
                    )}
                  </div>

                  {/* Dropdown Menu */}
                  {item.submenu && openMenu === idx && (
                    <AnimatePresence>
                      <motion.div initial="hidden" animate="visible" exit="exit" variants={dropdownVariants} className="absolute left-0 w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg z-50">
                        <div className="py-1">
                          {item.submenu.map((sub, subIdx) => (
                            <motion.div key={subIdx} variants={itemVariants} className="relative" onMouseEnter={() => setOpenSubmenu(subIdx)} onMouseLeave={() => setOpenSubmenu(null)}>
                              {sub.link ? (
                                <Link to={sub.link}
                                  onClick={(e) => handleNavigation(e, sub.link)}
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  {sub.name}
                                </Link>
                              ) : (
                                <button
                                  onClick={(e) => handleNavigation(e, sub.href)}
                                  aria-label={`Navigate to ${sub.name} section`}
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  {sub.name}
                                </button>
                              )}

                              {/* Second-level submenu */}
                              {sub.submenu && openSubmenu === subIdx && (
                                <motion.div initial="hidden" animate="visible" exit="exit" variants={dropdownVariants} className="absolute left-55 top-0 ml-1 w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg z-50">
                                  {sub.submenu.map((nested, nIdx) => (
                                    <motion.div key={nIdx} variants={itemVariants}>
                                      <Link to={nested.link} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        {nested.name}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              ))}
              {/* ATS Star Icon */}
              <div className="relative group">
                <button
                  onClick={() => window.open("https://ai-resume-ats-checker.netlify.app/", "_blank")}
                  aria-label="Open Resume Agnipariksha - AI Resume ATS Checker"
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 text-yellow-500 hover:text-yellow-600 transition-colors animate-pulse"
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Resume Agnipariksha
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            {/* Dark Mode Toggle */}
            {/* <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button> */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="md:hidden bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={item.submenu ? mobileOpenMenu === idx : undefined}
                    aria-label={item.submenu ? `${item.name} menu` : `Navigate to ${item.name}`}
                    className="flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={(e) => {
                      if (!item.submenu) handleNavigation(e, item.link || item.href);
                      else setMobileOpenMenu(mobileOpenMenu === idx ? null : idx);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (!item.submenu) handleNavigation(e, item.link || item.href);
                        else setMobileOpenMenu(mobileOpenMenu === idx ? null : idx);
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon} {item.name}
                    </div>
                    {item.submenu && <ChevronDown className={`w-5 h-5 transition-transform ${mobileOpenMenu === idx ? "rotate-180" : ""}`} />}
                  </div>

                  {item.submenu && mobileOpenMenu === idx && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.15 }} className="pl-6">
                      {item.submenu.map((sub, subIdx) => (
                        <div key={subIdx} className="flex flex-col">
                          <div
                            role="button"
                            tabIndex={0}
                            aria-expanded={sub.submenu ? mobileOpenSubmenu === subIdx : undefined}
                            aria-label={sub.submenu ? `${sub.name} submenu` : `Navigate to ${sub.name}`}
                            className="flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={(e) => {
                              if (!sub.submenu) handleNavigation(e, sub.link || sub.href);
                              else setMobileOpenSubmenu(mobileOpenSubmenu === subIdx ? null : subIdx);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                if (!sub.submenu) handleNavigation(e, sub.link || sub.href);
                                else setMobileOpenSubmenu(mobileOpenSubmenu === subIdx ? null : subIdx);
                              }
                            }}
                          >
                            {sub.name}
                            {sub.submenu && <ChevronDown className={`w-5 h-5 transition-transform ${mobileOpenSubmenu === subIdx ? "rotate-180" : ""}`} />}
                          </div>

                          {sub.submenu && mobileOpenSubmenu === subIdx && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.15 }}
                              className="pl-6 flex flex-col gap-2"
                            >
                              {sub.submenu.map((nested, nIdx) => (
                                <Link
                                  key={nIdx}
                                  to={nested.link}
                                  onClick={(e) => handleNavigation(e, nested.link)}
                                  className="px-2 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  {nested.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
