import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  MessageCircle,
  X,
  Award,
  Star,
  Shield,
  Users,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Heart,
  Activity,
  Stethoscope,
  Clock,
  CheckCircle,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Static JSON Data
const staticData = {
  faqs: [
    {
      id: 1,
      question: "What are your operating hours?",
      answer:
        "We are open Monday to Friday from 8:00 AM to 8:00 PM, and weekends from 9:00 AM to 5:00 PM.",
    },
    {
      id: 2,
      question: "Do you accept insurance?",
      answer:
        "Yes, we accept most major insurance plans. Please check with our reception team for specific coverage details.",
    },
    {
      id: 3,
      question: "How do I book an appointment?",
      answer:
        "You can book appointments online through our portal, call us directly, or visit our clinic in person.",
    },
    {
      id: 4,
      question: "What should I bring to my first appointment?",
      answer:
        "Please bring a valid ID, insurance card, list of current medications, and any previous medical records.",
    },
  ],
  awards: [
    {
      id: 1,
      title: "Best Healthcare Provider 2024",
      organization: "Medical Excellence Awards",
    },
    {
      id: 2,
      title: "Patient Safety Excellence",
      organization: "Healthcare Quality Institute",
    },
    {
      id: 3,
      title: "Innovation in Digital Health",
      organization: "Tech Health Summit",
    },
    {
      id: 4,
      title: "Community Service Award",
      organization: "Local Healthcare Board",
    },
  ],
  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Excellent care and very professional staff. The online portal made everything so convenient!",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment:
        "Dr. Smith was incredibly thorough and took time to explain everything. Highly recommend!",
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 5,
      comment:
        "The facility is modern and clean. The appointment booking system is very user-friendly.",
    },
  ],
  insurance: [
    "Blue Cross Blue Shield",
    "Aetna",
    "Cigna",
    "UnitedHealthcare",
    "Medicare",
    "Medicaid",
    "Kaiser Permanente",
    "Humana",
  ],
  chatbotQuestions: [
    {
      id: 1,
      question: "What are your hours?",
      answer:
        "We are open Monday to Friday from 8:00 AM to 8:00 PM, and weekends from 9:00 AM to 5:00 PM.",
    },
    {
      id: 2,
      question: "How to book appointment?",
      answer:
        "You can book appointments online through our portal, call us at (555) 123-4567, or visit our clinic.",
    },
    {
      id: 3,
      question: "Insurance accepted?",
      answer:
        "We accept most major insurance plans including Blue Cross, Aetna, Cigna, and UnitedHealthcare.",
    },
    {
      id: 4,
      question: "Emergency services?",
      answer:
        "For emergencies, please call 911 or visit your nearest emergency room. We offer urgent care during business hours.",
    },
  ],
  statistics: [
    { label: "Patients Served", value: 15000, suffix: "+" },
    { label: "Expert Doctors", value: 25, suffix: "" },
    { label: "5-Star Reviews", value: 1200, suffix: "+" },
    { label: "Years Experience", value: 20, suffix: "+" },
  ],
  trustedBy: [
    "City General Hospital",
    "Metropolitan Medical Center",
    "Regional Health Network",
    "University Medical Center",
    "Community Health System",
    "Advanced Care Facilities",
  ],
  healthTips: [
    {
      id: 1,
      title: "Stay Hydrated",
      tip: "Drink at least 8 glasses of water daily to maintain optimal health and energy levels.",
    },
    {
      id: 2,
      title: "Regular Exercise",
      tip: "Aim for 30 minutes of moderate exercise at least 5 days a week for cardiovascular health.",
    },
    {
      id: 3,
      title: "Balanced Diet",
      tip: "Include plenty of fruits, vegetables, whole grains, and lean proteins in your daily meals.",
    },
    {
      id: 4,
      title: "Quality Sleep",
      tip: "Get 7-9 hours of quality sleep each night to support your immune system and mental health.",
    },
  ],
  upcomingEvents: [
    {
      id: 1,
      title: "Free Health Screening Camp",
      date: "2025-09-15",
      description:
        "Comprehensive health checkups including blood pressure, diabetes, and cholesterol screening.",
    },
    {
      id: 2,
      title: "Women's Health Workshop",
      date: "2025-09-22",
      description:
        "Educational workshop covering women's health topics and preventive care.",
    },
    {
      id: 3,
      title: "Senior Care Seminar",
      date: "2025-09-30",
      description:
        "Information session about healthcare options and services for seniors.",
    },
  ],
  healthPackages: [
    {
      id: 1,
      name: "Basic Health Checkup",
      price: 199,
      features: ["Blood Test", "Blood Pressure", "BMI Check"],
    },
    {
      id: 2,
      name: "Comprehensive Package",
      price: 399,
      features: ["Full Blood Panel", "ECG", "X-Ray", "Doctor Consultation"],
    },
    {
      id: 3,
      name: "Executive Health Package",
      price: 799,
      features: [
        "Advanced Screening",
        "MRI",
        "Specialist Consultation",
        "Health Report",
      ],
    },
  ],
  trustBadges: [
    { id: 1, name: "HIPAA Compliant", icon: Shield },
    { id: 2, name: "Joint Commission Accredited", icon: Award },
    { id: 3, name: "ISO 9001 Certified", icon: CheckCircle },
    { id: 4, name: "Patient Safety Certified", icon: Heart },
  ],
  forumPosts: [
    {
      id: 1,
      title: "Tips for managing diabetes?",
      author: "HealthSeeker123",
      replies: 12,
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      title: "Best exercises for back pain",
      author: "FitnessFan",
      replies: 8,
      lastActivity: "5 hours ago",
    },
    {
      id: 3,
      title: "Nutrition advice for seniors",
      author: "CaringDaughter",
      replies: 15,
      lastActivity: "1 day ago",
    },
  ],
};

// Counter Component
const Counter = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={counterRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// Animated Section Component
const AnimatedSection = ({ children, className = "" }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// FAQ Component
const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  return (
    <AnimatedSection className="py-16 bg-background-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-text-light mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {staticData.faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                <span className="font-semibold text-text-light">
                  {faq.question}
                </span>
                {openId === faq.id ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openId === faq.id && (
                <div className="px-6 pb-4">
                  <p className="text-secondary-light">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// Awards Component
const Awards = () => (
  <AnimatedSection className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light mb-12">
        Awards & Certificates
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staticData.awards.map((award, index) => (
          <motion.div
            key={award.id}
            className="bg-primary-light/10 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Award className="mx-auto mb-4 text-accent-light" size={48} />
            <h3 className="font-bold text-text-light mb-2">{award.title}</h3>
            <p className="text-secondary-light text-sm">{award.organization}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// Testimonials Component
const Testimonials = () => (
  <AnimatedSection className="py-16 bg-background-light">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light mb-12">
        What Our Patients Say
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {staticData.testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="bg-white p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-400 fill-current"
                  size={20}
                />
              ))}
            </div>
            <p className="text-secondary-light mb-4">"{testimonial.comment}"</p>
            <p className="font-semibold text-text-light">
              - {testimonial.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// Insurance Options Component
const InsuranceOptions = () => (
  <AnimatedSection className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light mb-12">
        Insurance Partners
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {staticData.insurance.map((insurance, index) => (
          <motion.div
            key={index}
            className="bg-background-light p-4 rounded-lg text-center hover:shadow-md transition-shadow"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="font-semibold text-text-light">{insurance}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// Google Maps Component
const GoogleMaps = () => {
  const mapRef = useRef(null);
  const isInView = useInView(mapRef, { once: true });

  return (
    <AnimatedSection className="py-16 bg-background-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-text-light mb-12">
          Find Us
        </h2>
        <motion.div
          ref={mapRef}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1sen!2sus!4v1510579767645"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg"
          ></iframe>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

// Chatbot Component
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 bg-primary-light text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-6 bg-white rounded-lg shadow-xl w-80 max-h-96 overflow-y-auto z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="p-4 bg-primary-light text-white rounded-t-lg">
            <h3 className="font-bold">How can we help?</h3>
          </div>
          <div className="p-4">
            {selectedQuestion ? (
              <div>
                <button
                  className="text-primary-light mb-2"
                  onClick={() => setSelectedQuestion(null)}
                >
                  ← Back to questions
                </button>
                <div className="bg-background-light p-3 rounded">
                  <p className="font-semibold mb-2">
                    {selectedQuestion.question}
                  </p>
                  <p className="text-secondary-light">
                    {selectedQuestion.answer}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {staticData.chatbotQuestions.map((q) => (
                  <button
                    key={q.id}
                    className="w-full text-left p-3 bg-background-light hover:bg-gray-200 rounded transition-colors"
                    onClick={() => setSelectedQuestion(q)}
                  >
                    {q.question}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

// Statistics Component
const Statistics = () => (
  <AnimatedSection className="py-16 bg-primary-light text-white">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8 text-center">
        {staticData.statistics.map((stat, index) => (
          <motion.div
            key={index}
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-4xl font-bold mb-2">
              <Counter end={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-white/80">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// Trusted By Component
const TrustedBy = () => (
  <AnimatedSection className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light mb-12">
        Trusted By
      </h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
        {staticData.trustedBy.map((org, index) => (
          <motion.div
            key={index}
            className="text-center p-4 hover:shadow-md rounded-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-secondary-light font-medium">{org}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// Health Tips Component
const HealthTips = () => (
  <AnimatedSection className="py-16 bg-background-light">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light mb-12">
        Health Tips
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staticData.healthTips.map((tip, index) => (
          <motion.div
            key={tip.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Heart className="text-accent-light mb-4" size={32} />
            <h3 className="font-bold text-text-light mb-2">{tip.title}</h3>
            <p className="text-secondary-light text-sm">{tip.tip}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// Upcoming Events Component
const UpcomingEvents = () => (
  <AnimatedSection className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light mb-12">
        Upcoming Health Camps
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {staticData.upcomingEvents.map((event, index) => (
          <motion.div
            key={event.id}
            className="bg-background-light p-6 rounded-lg hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Calendar className="text-accent-light mb-4" size={32} />
            <h3 className="font-bold text-text-light mb-2">{event.title}</h3>
            <p className="text-primary-light font-semibold mb-2">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-secondary-light text-sm">{event.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// Health Packages Component
const HealthPackages = () => (
  <AnimatedSection className="py-16 bg-background-light">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light mb-12">
        Health Check Packages
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {staticData.healthPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Stethoscope className="text-primary-light mb-4" size={32} />
            <h3 className="font-bold text-text-light mb-2">{pkg.name}</h3>
            <div className="text-3xl font-bold text-accent-light mb-4">
              ${pkg.price}
            </div>
            <ul className="space-y-2">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center text-secondary-light">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full mt-6 bg-primary-light text-white py-2 rounded hover:bg-primary-light/90 transition-colors">
              Choose Package
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// Trust Badges Component
const TrustBadges = () => (
  <AnimatedSection className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light mb-12">
        Trust & Security
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {staticData.trustBadges.map((badge, index) => {
          const IconComponent = badge.icon;
          return (
            <motion.div
              key={badge.id}
              className="bg-background-light p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <IconComponent
                className="mx-auto mb-4 text-accent-light"
                size={48}
              />
              <p className="font-semibold text-text-light">{badge.name}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </AnimatedSection>
);

// Forum Component
const Forum = () => (
  <AnimatedSection className="py-16 bg-background-light">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light mb-12">
        Community Forum
      </h2>
      <div className="max-w-4xl mx-auto space-y-4">
        {staticData.forumPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ x: 5 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-text-light mb-2">{post.title}</h3>
                <p className="text-secondary-light text-sm">By {post.author}</p>
              </div>
              <div className="text-right text-sm text-secondary-light">
                <div>{post.replies} replies</div>
                <div>{post.lastActivity}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// Hero Section Component
const HeroSection = () => (
  <section className="bg-gradient-to-r from-primary-light to-accent-light text-white py-20">
    <div className="container mx-auto px-4 text-center">
      <motion.h1
        className="text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Your Health, Our Priority
      </motion.h1>
      <motion.p
        className="text-xl mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Experience world-class healthcare with our team of expert doctors and
        state-of-the-art facilities.
      </motion.p>
      <motion.div
        className="space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <button className="bg-white text-primary-light px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Book Appointment
        </button>
        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-light transition-colors">
          Learn More
        </button>
      </motion.div>
    </div>
  </section>
);

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Statistics />
      <Awards />
      <HealthPackages />
      <Testimonials />
      <UpcomingEvents />
      <HealthTips />
      <FAQ />
      <InsuranceOptions />
      <TrustedBy />
      <TrustBadges />
      <Forum />
      <GoogleMaps />
      <Chatbot />
    </div>
  );
};

export default App;
