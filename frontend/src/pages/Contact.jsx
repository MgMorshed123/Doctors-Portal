import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add API call or form submission logic here
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="px-4 py-12 md:px-8 lg:px-16 bg-background-light dark:bg-background-dark relative overflow-hidden animate-fade-in">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-light/10 dark:from-primary-dark/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center text-3xl font-bold mb-12">
          <p>
            Contact{" "}
            <span className="text-primary-light dark:text-primary-dark">
              Us
            </span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          {/* Contact Image */}
          <div className="w-full lg:w-1/2">
            <img
              className="w-full max-w-[400px] mx-auto rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              src={assets.contact_image}
              alt="Contact"
            />
          </div>

          {/* Contact Info and Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8">
            <div>
              <p className="font-semibold text-xl text-primary-light dark:text-primary-dark mb-4">
                OUR OFFICE
              </p>
              <ul className="space-y-4 text-secondary-light dark:text-secondary-dark">
                <li className="flex items-center gap-3">
                  <MapPin
                    size={20}
                    className="text-accent-light dark:text-accent-dark"
                  />
                  123 Health Street, Suite 100, Wellness City, WA 98001, USA
                </li>
                <li className="flex items-center gap-3">
                  <Phone
                    size={20}
                    className="text-accent-light dark:text-accent-dark"
                  />
                  +1-212-456-7890
                </li>
                <li className="flex items-center gap-3">
                  <Mail
                    size={20}
                    className="text-accent-light dark:text-accent-dark"
                  />
                  contact@HM Medicalcom
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-xl text-primary-light dark:text-primary-dark mb-4">
                OFFICE HOURS
              </p>
              <p className="text-secondary-light dark:text-secondary-dark">
                Monday - Friday: 9:00 AM - 5:00 PM <br />
                Saturday: 10:00 AM - 2:00 PM <br />
                Sunday: Closed
              </p>
            </div>

            <div>
              <p className="font-semibold text-xl text-primary-light dark:text-primary-dark mb-4">
                FOLLOW US
              </p>
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
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-lg border border-secondary-light/50 dark:border-secondary-dark/50 mb-16">
          <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
            Send Us a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-md border border-secondary-light/50 dark:border-secondary-dark/50 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-md border border-secondary-light/50 dark:border-secondary-dark/50 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-secondary-light/50 dark:border-secondary-dark/50 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-primary-light dark:bg-accent-dark text-text-light dark:text-text-dark rounded-md hover:bg-primary-light/90 dark:hover:bg-accent-dark/90 transition-colors shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map Placeholder */}
        <div className="bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-lg border border-secondary-light/50 dark:border-secondary-dark/50">
          <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
            Find Us
          </h3>
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
        </div>
      </div>
    </div>
  );
};

export default Contact;
