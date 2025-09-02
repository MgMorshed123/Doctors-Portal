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
import { AnimatedSection } from "./Animated";

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

export const TrustedBy = () => (
  <AnimatedSection className="py-16 ">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-4 dark:text-text-dark">
        Trusted By
      </h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
        {staticData.trustedBy.map((org, index) => (
          <motion.div
            key={index}
            className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-secondary-light/50 dark:border-secondary-dark/50 glow-effect"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="dark:text-text-dark">{org}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);
