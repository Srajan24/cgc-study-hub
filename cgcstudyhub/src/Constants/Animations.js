
// ---------------- ANIMATIONS ----------------
export const fadeIn = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// ---------------- COURSES ----------------
export const coursesData = [
  {
    id: "btech",
    title: "B.Tech",
    animation: "/lottie/BTECH.json", // lazy
  },
  {
    id: "pharma",
    title: "Pharmacy",
    animation:"/lottie/PHARMA.json", // lazy
    },
];

// ---------------- EXTERNAL SITES ----------------
export const externalSites = [
  { name: "BOOKSite", image: () => import("../assets/image/Bookztron-HomePage-1.webp") },
  { name: "Coursera", image: () => import("../assets/image/coursera.webp") },
  { name: "EdX", image: () => import("../assets/image/Edx.webp") },
  { name: "GoogleSkillshop", image: () => import("../assets/image/google.webp") },
  { name: "HubSpotAcademy", image: () => import("../assets/image/Hubsport.webp") },
  { name: "LinkedIn", image: () => import("../assets/image/linkdin.webp") },
];

// ---------------- FUN FACTS ----------------
export const funFacts = {
  pharmacy: [
    "Did you know? Aspirin is one of the oldest medicines still in use today!",
    "The first pharmacist is said to be Galen, a Greek physician.",
    "Over 70% of Americans take at least one prescription drug.",
  ],
  cse: [
    "The first computer bug was an actual moth stuck in a Harvard Mark II computer in 1947!",
    "C programming language was created in the early 1970s at Bell Labs.",
    "The first website ever created is still online!",
  ],
  ece: [
    "The first transistor was invented in 1947 by Bell Labs.",
    "Wi-Fi was invented by an Australian research team in 1992.",
    "The speed of electricity is nearly the speed of light!",
  ],
  it: [
    "The first email was sent by Ray Tomlinson in 1971.",
    "Over 300 billion emails are sent every day worldwide.",
    "The word 'robot' comes from the Czech word 'robota' meaning forced labor.",
  ],
  aiml: [
    "The term 'Artificial Intelligence' was first coined in 1956.",
    "AI can now write poems, paint pictures, and compose music!",
    "Machine learning is inspired by how human brains learn from experience.",
  ],
  aids: [
    "Big Data analysis is used in predicting disease outbreaks!",
    "Data Science is one of the fastest growing fields in the world.",
    "The world produces 2.5 quintillion bytes of data every day.",
  ],
};

// ---------------- BTECH COURSES ----------------
export const btechCourses = [
  {
    id: "cse",
    name: "Computer Science & Engineering (CSE)",
    description: "Dive into programming, AI, and software development.",
    animation: "/lottie/CSE.json", // lazy
  },
  {
    id: "aiml",
    name: "Artificial Intelligence & Machine Learning (AIML)",
    description: "Master AI, neural networks, and data-driven intelligence.",
    animation: "/lottie/AI.json", // lazy
  },
  {
    id: "aids",
    name: "Artificial Intelligence & Data Science (AIDS)",
    description: "Explore AI and data science for real-world problem-solving.",
    animation:"/lottie/AIDS.json", // lazy
  },
  {
    id: "it",
    name: "Information Technology (IT)",
    description: "Learn networking, security, and modern IT systems.",
    animation: "/lottie/IT.json", // lazy
  },
  {
    id: "ece",
    name: "Electronics & Communication Engineering (ECE)",
    description: "Focus on circuits, communication, and embedded systems.",
    animation: "/lottie/ECE.json", // lazy
  },
  {
    id:"robotics",
    name:"Robotics and Artificial intelligence",
    description:"Explore robotics and AI for real-world problem-solving.",
    animation:"/lottie/Robotics.json", // lazy
  }

];

// ---------------- PROJECTS ----------------


export const projectsData = [
  {
    id: 1,
    title: "Blockchain Voting System",
    description: "A secure online voting platform using Ethereum blockchain.",
    domain: "Blockchain",
    level: "Advanced",
    tech: ["Solidity", "React", "Web3.js"],
    image: "/lottie/Blockchain.webp",
    codeLink :"https://github.com/Krish-Depani/Decentralized-Voting-System.git",
  },
  {
    id: 2,
    title: "AI Chatbot for Students",
    description: "A chatbot to answer common student queries.",
    domain: "AI/ML",
    level: "Intermediate",
    tech: ["Python", "TensorFlow", "Flask"],
    image: "/lottie/Chatbot.webp",
    liveLink :"https://chatbot-ai-01.vercel.app/",
  },
  {
    id: 3,
    title: "College Event Website",
    description: "A responsive event site for managing college fests.",
    domain: "Web Development",
    level: "Beginner",
    tech: ["React", "Node.js", "MongoDB"],
    image: "/lottie/Events.webp",
    codeLink:"https://github.com/Nishanth1409/College-event-management-System.git",
  },
  {
    id: 4,
    title: "Online Book Store",
    description: "A responsive event site for Buying and selling books.",
    domain: "Web Development",
    level: "Beginner",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    image: () => import("../assets/image/Bookztron-HomePage-1.webp"), // lazy
    liveLink: "https://bookztron-dev-branch.netlify.app/",
  },
];

// ---------------- CERTIFICATES ----------------
export const certificatesData = [
  {
    name: "Coursera",
    description: "Online courses from top universities and companies. Earn professional certificates.",
    link: "https://www.coursera.org/",
    image: () => import("../assets/image/coursera.webp"), // lazy
  },
  {
    name: "edX",
    description: "University-level courses in a wide range of disciplines, some free and some paid.",
    link: "https://www.edx.org/",
    image: () => import("../assets/image/Edx.webp"), // lazy
  },
  {
    name: "Google Skillshop",
    description: "Free training and certifications for Google Ads, Analytics, and more.",
    link: "https://skillshop.exceedlms.com/student/catalog",
    image: () => import("../assets/image/google.webp"), // lazy
  },
  {
    name: "HubSpot Academy",
    description: "Free certifications in marketing, sales, and customer service.",
    link: "https://academy.hubspot.com/courses",
    image: () => import("../assets/image/Hubsport.webp"), // lazy
  },
  {
    name: "LinkedIn Learning",
    description: "Professional skills and certifications to boost your career.",
    link: "https://www.linkedin.com/learning/",
    image: () => import("../assets/image/linkdin.webp"), // lazy
  },
  {
    name: "Prompt Engineering Certification on Infosys Springboard",
    description: "Complete the course to earn a certificate.",
    link: "TOC - Prompt Engineering | Infosys Springboard",
    image: () => import("../assets/image/prompt.webp"), // lazy
  },
];

export const pharmacourses = [
  {
    id: "bpharma",
    name: "B-Pharma",
    description: "Pharmaceutical sciences and healthcare innovation.",
    animation: "/lottie/BPHARMA.json", // lazy loaded
  },
  {
    id: "pharmd",
    name: "Pharm-D",
    description: "Pharmaceutical sciences and healthcare innovation.",
    animation: "/lottie/PHARMD.json", // lazy loaded
  },
];
