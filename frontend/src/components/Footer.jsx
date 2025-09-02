import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { AnimatedSection } from "./Animated";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <AnimatedSection className="py-12 md:mx-10 mt-20 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-light/10 dark:from-primary-dark/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {/* Logo and Description */}
        <div className="space-y-4">
          <NavLink to="/">
            <img src={assets.LOGO} className="mb-5 w-40" alt="Logo" />
          </NavLink>
          <p className="text-sm leading-relaxed text-secondary-light dark:text-secondary-dark">
            Empowering your health with trusted doctors and personalized care.
            Book appointments, access health tips, and stay connected with HM
            Medical
          </p>
          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-semibold mb-5 text-text-light dark:text-text-dark">
            Company
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <NavLink
                to="/"
                className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy"
                className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
              >
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/terms"
                className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
              >
                Terms of Service
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <p className="text-xl font-semibold mb-5 text-text-light dark:text-text-dark">
            Get In Touch
          </p>
          <ul className="space-y-3 text-sm text-secondary-light dark:text-secondary-dark">
            <li className="flex items-center gap-2">
              <Phone
                size={18}
                className="text-accent-light dark:text-accent-dark"
              />
              +1-212-456-7890
            </li>
            <li className="flex items-center gap-2">
              <Mail
                size={18}
                className="text-accent-light dark:text-accent-dark"
              />
              contact@HM Medicalcom
            </li>
            <li className="flex items-center gap-2">
              <MapPin
                size={18}
                className="text-accent-light dark:text-accent-dark"
              />
              123 Health St, Wellness City, USA
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <p className="text-xl font-semibold mb-5 text-text-light dark:text-text-dark">
            Newsletter
          </p>
          <p className="text-sm text-secondary-light dark:text-secondary-dark mb-4">
            Subscribe to receive health tips and updates.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-full border border-secondary-light/50 dark:border-secondary-dark/50 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
            />
            <button className="px-4 py-2 bg-primary-light dark:bg-accent-dark text-text-light dark:text-text-dark rounded-r-full hover:bg-primary-light/90 dark:hover:bg-accent-dark/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <hr className="my-8 border-secondary-light/50 dark:border-secondary-dark/50" />
      <p className="text-center text-sm text-secondary-light dark:text-secondary-dark">
        &copy; 2025 HM Medical All rights reserved.
      </p>
    </AnimatedSection>
  );
};

export default Footer;
