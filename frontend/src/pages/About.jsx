import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/assets_frontend/assets";
import { useThemeStore } from "@/context/useThems";
import { Award, Users, Clock, Heart } from "lucide-react";

const About = () => {
  const { theme } = useThemeStore();

  const teamMembers = [
    {
      name: "Dr. John Smith",
      role: "Chief Medical Officer",
      image: assets.team_member_1 || "https://via.placeholder.com/150",
    },
    {
      name: "Jane Doe",
      role: "Lead Developer",
      image: assets.team_member_2 || "https://via.placeholder.com/150",
    },
    {
      name: "Emily Johnson",
      role: "Customer Success Manager",
      image: assets.team_member_3 || "https://via.placeholder.com/150",
    },
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Patients" },
    { icon: Award, value: "50+", label: "Certified Doctors" },
    { icon: Clock, value: "24/7", label: "Support Available" },
  ];

  return (
    <div className="px-4 py-12 md:px-8 lg:px-16 bg-background-light dark:bg-background-dark relative overflow-hidden animate-fade-in">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-light/10 dark:from-primary-dark/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center text-3xl font-bold mb-12">
          <p>
            About{" "}
            <span className="text-primary-light dark:text-primary-dark">
              Us
            </span>
          </p>
        </div>

        {/* Intro Section */}
        <div className="flex flex-col md:flex-row gap-12 mb-16">
          <img
            className="w-full md:max-w-[400px] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            src={assets.about_image}
            alt="About HM Medical"
          />
          <div className="flex flex-col justify-center gap-6 md:w-1/2 text-base leading-relaxed">
            <p className="text-text-light dark:text-text-dark">
              Welcome to HM Medical, your trusted partner in healthcare. We
              simplify the process of scheduling doctor appointments, managing
              health records, and accessing personalized care, making healthcare
              seamless and stress-free.
            </p>
            <p className="text-text-light dark:text-text-dark">
              At HM Medical, we leverage cutting-edge technology to connect you
              with trusted healthcare providers. Our platform is designed to
              empower you to take control of your health with ease and
              confidence.
            </p>
          </div>
        </div>

        {/* Mission and Vision Section */}
        <div className="bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-lg border border-secondary-light/50 dark:border-secondary-dark/50 glow-effect mb-16">
          <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
            <Heart
              className="text-accent-light dark:text-accent-dark"
              size={24}
            />
            Our Mission
          </h3>
          <p className="text-secondary-light dark:text-secondary-dark leading-relaxed mb-6">
            To empower individuals with accessible, efficient, and personalized
            healthcare solutions, ensuring everyone can achieve optimal health
            and well-being.
          </p>
          <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
            <Heart
              className="text-accent-light dark:text-accent-dark"
              size={24}
            />
            Our Vision
          </h3>
          <p className="text-secondary-light dark:text-secondary-dark leading-relaxed">
            To create a seamless healthcare experience, bridging the gap between
            patients and providers with innovative technology and compassionate
            care.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="text-2xl font-bold mb-8 text-center">
          <p>
            Why{" "}
            <span className="text-primary-light dark:text-primary-dark">
              Choose Us
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "EFFICIENCY",
              description:
                "Streamlined appointment scheduling that fits into your busy lifestyle.",
            },
            {
              title: "CONVENIENCE",
              description:
                "Access to a network of trusted healthcare professionals in your area.",
            },
            {
              title: "PERSONALIZATION",
              description:
                "Tailored recommendations and reminders to help you stay on top of your health.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="border border-secondary-light/50 dark:border-secondary-dark/50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 glow-effect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <b className="text-lg text-text-light dark:text-text-dark">
                {item.title}
              </b>
              <p className="mt-4 text-secondary-light dark:text-secondary-dark leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-2xl font-bold mb-8 text-center">
          <p>
            Meet Our{" "}
            <span className="text-primary-light dark:text-primary-dark">
              Team
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="border border-secondary-light/50 dark:border-secondary-dark/50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 glow-effect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                src={member.image}
                alt={member.name}
              />
              <h4 className="text-lg font-bold text-text-light dark:text-text-dark text-center">
                {member.name}
              </h4>
              <p className="text-sm text-secondary-light dark:text-secondary-dark text-center">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-lg border border-secondary-light/50 dark:border-secondary-dark/50 glow-effect mb-16">
          <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6 text-center">
            Our Impact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 }}
              >
                <stat.icon
                  className="text-accent-light dark:text-accent-dark mb-2"
                  size={32}
                />
                <p className="text-xl font-bold text-text-light dark:text-text-dark">
                  {stat.value}
                </p>
                <p className="text-sm text-secondary-light dark:text-secondary-dark">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <NavLink to="/contact">
            <button className="px-8 py-3 bg-primary-light dark:bg-accent-dark text-text-light dark:text-text-dark rounded-md hover:bg-primary-light/90 dark:hover:bg-accent-dark/90 transition-colors shadow-md">
              Get in Touch
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default About;
