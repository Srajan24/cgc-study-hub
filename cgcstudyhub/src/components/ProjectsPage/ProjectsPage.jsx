// src/pages/ProjectsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Filter, ExternalLink, X } from "lucide-react";
import { projectsData } from "../../Constants/Animations"; // Your data file

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDomain, setFilterDomain] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = React.useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain =
      filterDomain === "All" || project.domain === filterDomain;

    return matchesSearch && matchesDomain;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors duration-500 px-6 py-12 mt-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Student <span className="text-blue-600">Project Ideas</span> 🚀
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
          Explore projects built by your seniors and developers. Learn, adapt, and innovate.
        </p>
        <motion.a
          href="https://forms.gle/jLXbDvNVRd7piMLNA"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-semibold"
        >
          Share Your Project
        </motion.a>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
            >
              <option>All</option>
              <option>Web Development</option>
              <option>AI/ML</option>
              <option>Blockchain</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.slice(0, visibleCount).map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 dark:text-gray-400 col-span-full py-12"
          >
            No projects found.
          </motion.p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base"
      >
        ✨ More ideas are coming soon...
        <p className="text-white dark:text-gray-800">cgcassignments</p>
      </motion.div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Infinite Scroll Loader */}
      {visibleCount < filteredProjects.length && (
        <div
          ref={loaderRef}
          className="flex justify-center py-6 text-gray-600 dark:text-gray-400"
        >
          Loading more projects...
        </div>
      )}
    </div>
  );
}

/* 🔹 Individual Project Card */
function ProjectCard({ project, index, onClick }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    let mounted = true;

    if (isInView && !imgSrc) {
      if (typeof project.image === "function") {
        project.image().then((mod) => {
          if (mounted) setImgSrc(mod.default);
        }).catch(() => {
          // Handle error silently
        });
      } else {
        setImgSrc(project.image);
      }
    }

    return () => {
      mounted = false;
    };
  }, [isInView, project, imgSrc]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 flex flex-col"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: index * 0.15, duration: 0.5, ease: "easeOut" },
        },
      }}
    >
      {/* Fixed height container to prevent CLS */}
      <div className="relative w-full h-48 bg-gray-50 dark:bg-gray-800">
        {imgSrc ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
            <img
              src={imgSrc}
              alt={project.title}
              loading={index < 3 ? "eager" : "lazy"}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
              <span className="text-sm">Loading...</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {project.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
function ProjectModal({ project, onClose }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (typeof project.image === "function") {
      project.image().then((mod) => {
        if (mounted) setImgSrc(mod.default);
      }).catch(() => {
        // Handle error silently
      });
    } else {
      setImgSrc(project.image);
    }

    return () => {
      mounted = false;
    };
  }, [project]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors duration-200"
          onClick={onClose}
        >
          <X size={16} />
        </button>
        
        <div className="relative w-full h-64 bg-gray-50 dark:bg-gray-800">
          {imgSrc ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              )}
              <img
                src={imgSrc}
                alt={project.title}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
                <span className="text-sm">Loading...</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            {project.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            {project.description}
          </p>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Technologies:</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-semibold"
              >
                <ExternalLink size={16} className="mr-2" />
                View Live
              </a>
            )}
            {project.codeLink && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-semibold"
              >
                <ExternalLink size={16} className="mr-2" />
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
