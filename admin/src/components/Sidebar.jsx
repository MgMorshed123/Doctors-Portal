import React, { useContext } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useThemeStore } from "@/context/useThems";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const { theme } = useThemeStore();
  const shouldReduceMotion = useReducedMotion();

  const adminLinks = [
    {
      path: "/admin-dashboard",
      icon: assets.appointment_icon,
      label: "Dashboard",
      alt: "Dashboard icon",
    },
    {
      path: "/all-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
      alt: "Appointments icon",
    },
    {
      path: "/add-doctor",
      icon: assets.add_icon,
      label: "Add Doctor",
      alt: "Add doctor icon",
    },
    {
      path: "/doctor-list",
      icon: assets.people_icon,
      label: "Doctor List",
      alt: "Doctor list icon",
    },
  ];

  const doctorLinks = [
    {
      path: "/doctor-dashboard",
      icon: assets.appointment_icon,
      label: "Dashboard",
      alt: "Dashboard icon",
    },
    {
      path: "/doctor-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
      alt: "Appointments icon",
    },
    {
      path: "/doctor-profile",
      icon: assets.people_icon,
      label: "Profile",
      alt: "Profile icon",
    },
  ];

  const linkVariants = {
    hover: shouldReduceMotion ? {} : { scale: 1.05, x: 5 },
    tap: shouldReduceMotion ? {} : { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark border-r border-secondary-light/50 dark:border-secondary-dark/50 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-light/10 dark:from-primary-dark/10 to-transparent pointer-events-none"></div>

      <motion.div
        className="relative z-10 pt-5 px-3 sm:px-6 md:px-9 max-w-xs w-full glow-effect"
        initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        aria-label="Sidebar navigation"
      >
        {atoken ? (
          <ul className="space-y-2">
            {adminLinks.map((link, index) => (
              <motion.li
                key={link.path}
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3 px-4 rounded-lg text-text-light dark:text-text-dark transition-all ${
                      isActive
                        ? "bg-primary-light/10 dark:bg-primary-dark/10 border-r-4 border-primary-light dark:border-primary-dark"
                        : "hover:bg-primary-light/5 dark:hover:bg-primary-dark/5"
                    }`
                  }
                  aria-label={link.label}
                >
                  <img src={link.icon} alt={link.alt} className="w-6 h-6" />
                  <p className="text-sm font-medium">{link.label}</p>
                </NavLink>
              </motion.li>
            ))}
          </ul>
        ) : dToken ? (
          <ul className="space-y-2">
            {doctorLinks.map((link, index) => (
              <motion.li
                key={link.path}
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3 px-4 rounded-lg text-text-light dark:text-text-dark transition-all ${
                      isActive
                        ? "bg-primary-light/10 dark:bg-primary-dark/10 border-r-4 border-primary-light dark:border-primary-dark"
                        : "hover:bg-primary-light/5 dark:hover:bg-primary-dark/5"
                    }`
                  }
                  aria-label={link.label}
                >
                  <img src={link.icon} alt={link.alt} className="w-6 h-6" />
                  <p className="text-sm font-medium">{link.label}</p>
                </NavLink>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-4 text-secondary-light dark:text-secondary-dark">
            <p className="text-sm">Please log in to access the dashboard.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Sidebar;
