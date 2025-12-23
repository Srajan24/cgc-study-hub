import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext.jsx";
import { fadeIn } from "../../Constants/Animations";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ExternalLink, Send, Loader2 } from "lucide-react";

const RoadmapPage = () => {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [activeRoadmap, setActiveRoadmap] = useState("frontend");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I can help you find roadmaps for different technologies. What would you like to learn about?",
    },
  ]);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setIsLoading(true);

    // Simulated AI response (replace with API call)
    setTimeout(() => {
      const roadmapPath = getRoadmapUrl(query);
      const roadmapName = roadmapPath ? query : "frontend";
      const response = {
        role: "assistant",
        content: roadmapPath
          ? `Here's a learning path for ${query}. Click the button below to view it.`
          : `I couldn't find a specific roadmap for "${query}". Here's a general frontend development roadmap to get you started.`,
        roadmap: true,
        roadmapName: roadmapName,
      };
      setMessages((prev) => [...prev, response]);
      setActiveRoadmap(roadmapPath || "frontend");
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getRoadmapUrl = (topic) => {
    const roadmapMap = {
      frontend: "frontend",
      backend: "backend",
      fullstack: "full-stack",
      devops: "devops",
      android: "android",
      ios: "ios",
      react: "react",
      node: "nodejs",
      python: "python",
      java: "java",
      javascript: "javascript",
      typescript: "typescript",
      "data science": "data-science",
      "machine learning": "ai-data-scientist",
      ai: "ai-data-scientist",
      "cyber security": "cyber-security",
      blockchain: "blockchain",
      cloud: "aws",
      aws: "aws",
      azure: "azure",
      "google cloud": "gcp",
      gcp: "gcp",
    };

    const lowerTopic = topic.toLowerCase();
    return roadmapMap[lowerTopic] || "";
  };

  const roadmapUrl = `https://roadmap.sh/${activeRoadmap}`;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-20 relative z-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          {/* Page Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4"
            >
              Start Your Journey
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-blue-600 to-blue-500 bg-clip-text text-transparent mb-6"
            >
              Learning Roadmaps
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Discover structured learning paths to master in-demand technologies
              and accelerate your career growth
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Roadmap Explorer */}
            <div className="lg:col-span-2">
              {/* Roadmap Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-border/50 hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-20 bg-gradient-to-r from-primary to-blue-600 dark:from-primary/90 dark:to-blue-700 flex items-center px-8 justify-between border-b border-primary/20">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="mr-4 p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      📚
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                      Learning Path Explorer
                    </span>
                  </h2>
                  <a
                    href={roadmapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors"
                  >
                    Open in roadmap.sh <ExternalLink size={14} />
                  </a>
                </div>
                <div className="p-6">
                  {/* Main Content */}
                  <div className="relative p-8 md:p-10 text-center">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                      Interactive Learning Path
                    </h3>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                      Explore curated roadmaps to guide your journey. Each path
                      is designed by industry experts to help you master skills
                      effectively.
                    </p>
                    <a
                      href={roadmapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-blue-600 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:scale-105"
                    >
                      🚀 Explore {activeRoadmap} Roadmap
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: AI Assistant */}
            <motion.div
              id="ai-assistant"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative h-full"
            >
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-border/50 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <div className="h-20 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800 flex items-center px-8 justify-between">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    🤖 AI Assistant
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/90 hover:bg-white/20 hover:text-white h-9 w-9 p-0 rounded-full"
                    onClick={() => setShowChat(!showChat)}
                  >
                    {showChat ? "✖" : "+"}
                  </Button>
                </div>

                {showChat && (
                  <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    <form
                      onSubmit={handleSendMessage}
                      className="p-4 border-t border-border"
                    >
                      <div className="flex space-x-2">
                        <Input
                          type="text"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Ask about a roadmap..."
                          className="flex-1"
                        />
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Explore More Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Explore More Roadmaps
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Frontend",
              "Backend",
              "Full Stack",
              "DevOps",
              "Android",
              "iOS",
              "React",
              "Node.js",
              "Python",
              "Java",
              "JavaScript",
              "TypeScript",
              "Data Science",
              "Machine Learning",
              "AI",
              "Cyber Security",
              "Blockchain",
              "Cloud",
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setQuery(`Show me the ${topic} roadmap`);
                  const event = { preventDefault: () => {} };
                  handleSendMessage(event);
                  setTimeout(() => {
                    document
                      .getElementById("ai-assistant")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="px-4 py-3 bg-card hover:bg-primary/10 dark:hover:bg-primary/20 border border-border rounded-lg transition-all duration-200 text-sm font-medium hover:shadow-md"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
