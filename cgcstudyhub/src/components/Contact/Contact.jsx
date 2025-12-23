import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import {
    FiMail,
    FiUser,
    FiMapPin,
    FiPhone
} from "react-icons/fi";
import {
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaInstagram,
    FaWhatsapp
} from "react-icons/fa";
import { MessageCircle, Send, Phone, Mail } from "lucide-react";

// Lazy-load Lottie Player to reduce memory load
const Player = lazy(() =>
    import("@lottiefiles/react-lottie-player").then(mod => ({ default: mod.Player }))
);

export default function ContactSection() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email.";
        }
        if (!formData.message.trim() || formData.message.length < 10) {
            newErrors.message = "Message should be at least 10 characters.";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setStatus("Sending...");

        try {
            await emailjs.send(
                "service_3zp1ex7",
                "template_qb7dvw8",
                formData,
                "SHlm2mC0HUFt6JeXt"
            );
            setStatus("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            console.error(err);
            setStatus("Failed to send. Try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="Contacts"
            className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
            
            <div className="relative max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 sm:mb-12 lg:mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <MessageCircle className="w-8 h-8 text-blue-600" />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                            Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
                        </h2>
                        <Mail className="w-8 h-8 text-purple-600" />
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4"
                    >
                        Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </motion.p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
                    {/* Left Side - Animation & Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center lg:items-start space-y-6 sm:space-y-8"
                    >
                        {/* Enhanced Animation Container */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl blur-xl" />
                            <Suspense fallback={
                                <div className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl animate-pulse flex items-center justify-center">
                                    <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 animate-pulse" />
                                </div>
                            }>
                                <Player
                                    autoplay
                                    loop
                                    src="/lottie/CONTACT.json"
                                    style={{ height: "240px", width: "240px" }}
                                    className="relative z-10 drop-shadow-2xl sm:!w-[280px] sm:!h-[280px] md:!w-[320px] md:!h-[320px]"
                                />
                            </Suspense>
                        </div>

                        {/* Contact Methods */}
                        <div className="w-full max-w-md space-y-3 sm:space-y-4">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center lg:text-left mb-4 sm:mb-6"
                            >
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Connect
                                </span>{" "}
                                with us
                            </motion.h3>

                            {/* Contact Cards */}
                            <div className="space-y-3 sm:space-y-4">
                                {[
                                    {
                                        icon: <FaWhatsapp className="w-5 h-5" />,
                                        title: "WhatsApp Group",
                                        description: "Join our study community",
                                        link: "https://chat.whatsapp.com/EWTTV8ho6KN0NEfOM9lz1k",
                                        color: "from-green-500 to-green-600"
                                    },
                                    {
                                        icon: <Mail className="w-5 h-5" />,
                                        title: "Email Us",
                                        description: "cgcstudyhub@gmail.com",
                                        link: "mailto:cgcstudyhub@gmail.com",
                                        color: "from-blue-500 to-blue-600"
                                    }
                                ].map(({ icon, title, description, link, color }, index) => (
                                    <motion.a
                                        key={index}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group"
                                    >
                                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            {icon}
                                        </div>
                                        <div>
                                            <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {title}
                                            </h4>
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                                {description}
                                            </p>
                                        </div>
                                        <Send className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 ml-auto transition-colors" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Enhanced Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Form Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl" />
                        
                        <form
                            onSubmit={handleSubmit}
                            className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 space-y-4 sm:space-y-6"
                        >
                            <div className="text-center mb-6 sm:mb-8">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Send us a Message
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                                    Fill out the form below and we'll get back to you soon
                                </p>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-4 sm:space-y-6">
                                {[
                                    { name: "name", type: "text", icon: <FiUser className="w-5 h-5" />, placeholder: "Your full name" },
                                    { name: "email", type: "email", icon: <FiMail className="w-5 h-5" />, placeholder: "your.email@example.com" },
                                ].map(({ name, type, icon, placeholder }, index) => (
                                    <motion.div
                                        key={name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                                        viewport={{ once: true }}
                                        className="relative"
                                    >
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">
                                            {name}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                {icon}
                                            </div>
                                            <input
                                                name={name}
                                                type={type}
                                                value={formData[name]}
                                                onChange={handleChange}
                                                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                                                placeholder={placeholder}
                                            />
                                        </div>
                                        {errors[name] && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-500 text-xs mt-2 flex items-center gap-1"
                                            >
                                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                                {errors[name]}
                                            </motion.p>
                                        )}
                                    </motion.div>
                                ))}

                                {/* Message Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
                                            <MessageCircle className="w-5 h-5" />
                                        </div>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 resize-none sm:rows-5"
                                            placeholder="Tell us about your question, feedback, or how we can help you..."
                                        />
                                    </div>
                                    {errors.message && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-500 text-xs mt-2 flex items-center gap-1"
                                        >
                                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                            {errors.message}
                                        </motion.p>
                                    )}
                                </motion.div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </>
                                )}
                                
                            </motion.button>

                            {/* Status Message */}
                            {status && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`text-center p-2 sm:p-3 text-xs sm:text-sm rounded-lg sm:rounded-xl ${
                                        status.includes("success") 
                                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
                                            : status.includes("Failed")
                                            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                    }`}
                                >
                                    {status}

                                </motion.div>
                                
                            )}
                            
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
