// src/pages/CertificatesPage.jsx
import React, { useState, useEffect, useState as useReactState, useMemo, useRef } from "react";
import { ExternalLink, Search } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { certificatesData } from "../../Constants/Animations";

export default function CertificatesPage() {
  const [search, setSearch] = useState("");

  const filteredCertificates = useMemo(() => 
    certificatesData.filter(
      (cert) =>
        cert.name.toLowerCase().includes(search.toLowerCase()) ||
        cert.description.toLowerCase().includes(search.toLowerCase())
    ), [search]
  );

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
          Certificates & <span className="text-blue-600">Learning Platforms</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Explore various platforms to earn certificates and enhance your skills.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-lg mx-auto mb-10"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search certificates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((cert, index) => (
          <CertificateCard 
            cert={cert} 
            key={cert.name} 
            index={index}
          />
        ))}
      </div>
      
      {/* Footer Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base"
      >
        ✨ More free certificate websites are coming soon...
        <p className="text-white dark:text-gray-800">cgc assgn</p>
      </motion.div>
    </div>

  );
}

// Certificate Card Component
function CertificateCard({ cert, index }) {
  const [imgSrc, setImgSrc] = useReactState(null);
  const [imageLoaded, setImageLoaded] = useReactState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    let mounted = true;

    if (isInView && !imgSrc) {
      cert.image().then((mod) => {
        if (mounted) {
          setImgSrc(mod.default);
        }
      }).catch(() => {
        // Handle error silently
      });
    }

    return () => {
      mounted = false;
    };
  }, [isInView, cert, imgSrc]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20"
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
      <div className="relative w-full h-52 bg-gray-50 dark:bg-gray-800">
        {imgSrc ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
            <img
              src={imgSrc}
              alt={cert.name}
              loading={index < 3 ? "eager" : "lazy"}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-contain p-4 transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {cert.name === "Prompt Engineering Certification on Infosys Springboard" && (
              <span className="absolute top-3 right-3 bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full animate-pulse">
                New
              </span>
            )}
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
      
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {cert.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {cert.description}
        </p>
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
        >
          Visit <ExternalLink size={16} className="ml-2" />
        </a>
      </div>
    </motion.div>
  );
}
