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

export const GoogleMaps = () => {
  const mapRef = useRef(null);
  const isInView = useInView(mapRef, { once: true });

  return (
    <AnimatedSection className="py-16 bg-background-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center dark:text-text-dark mb-12">
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
