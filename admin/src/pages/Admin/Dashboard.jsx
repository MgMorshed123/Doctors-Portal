import React, { useContext, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import { useThemeStore } from "@/context/useThems";

const Dashboard = () => {
  const { atoken, cancelAppointment, dashData, getDashData } =
    useContext(AdminContext);
  const { theme } = useThemeStore();
  const [imageErrors, setImageErrors] = useState({});
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);

  const defaultAvatar =
    assets.default_avatar || "https://via.placeholder.com/64?text=User";

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const cardVariants = {
    hover: shouldReduceMotion ? {} : { scale: 1.05 },
    tap: shouldReduceMotion ? {} : { scale: 0.95 },
  };

  return (
    dashData && (
      <motion.div
        className="m-5 max-w-7xl mx-auto bg-background-light dark:bg-background-dark border border-secondary-light/50 dark:border-secondary-dark/50 rounded-xl shadow-lg"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        role="main"
        aria-label="Admin Dashboard"
      >
        <div className="flex flex-wrap gap-4 p-5">
          {[
            {
              icon: assets.doctor_icon,
              label: "Doctors",
              value: dashData.doctors ?? 0,
              alt: "Doctors icon",
            },
            {
              icon: assets.appointment_icon,
              label: "Appointments",
              value: dashData.appointment ?? 0, // Note: 'appointment' (not 'appointments') matches original code
              alt: "Appointments icon",
            },
            {
              icon: assets.patients_icon,
              label: "Patients",
              value: dashData.patinets ?? 0, // Note: 'patinets' typo matches original code
              alt: "Patients icon",
            },
          ].map((card, index) => (
            <motion.div
              key={card.label}
              className="flex items-center gap-3 p-4 min-w-52 rounded-lg border border-secondary-light/50 dark:border-secondary-dark/50 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark cursor-pointer hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-all"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              aria-label={`${card.label}: ${card.value}`}
            >
              <img className="w-12 h-12" src={card.icon} alt={card.alt} />
              <div>
                <p className="text-xl font-bold text-text-light dark:text-text-dark">
                  {card.value}
                </p>
                <p className="text-sm text-secondary-light dark:text-secondary-dark">
                  {card.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-5" role="table" aria-label="Latest Bookings">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-secondary-light/50 dark:border-secondary-dark/50 bg-primary-light/10 dark:bg-primary-dark/10">
            <img
              className="w-6 h-6"
              src={assets.list_icon}
              alt="Latest bookings icon"
            />
            <p className="text-lg font-semibold text-text-light dark:text-text-dark">
              Latest Bookings
            </p>
          </div>
          <div className="max-h-[50vh] overflow-y-auto">
            {dashData.latestAppointments?.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <motion.div
                  key={index}
                  className={`sm:grid sm:grid-cols-[auto_1fr_auto] flex flex-col gap-4 sm:gap-6 items-start sm:items-center px-4 py-3 border-b border-secondary-light/50 dark:border-secondary-dark/50 hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-all ${
                    index % 2 === 0
                      ? "bg-background-light dark:bg-background-dark"
                      : "bg-secondary-light/5 dark:bg-secondary-dark/5"
                  }`}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                  animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  role="row"
                >
                  <img
                    className="w-16 h-16 object-cover rounded-full border border-secondary-light/50 dark:border-secondary-dark/50"
                    src={
                      imageErrors[item._id] || !item.docData.image
                        ? defaultAvatar
                        : item.docData.image
                    }
                    alt={`Profile of ${item.docData.name || "Unknown"}`}
                    onError={() => handleImageError(item._id)}
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-text-light dark:text-text-dark font-medium m-0">
                      {item.docData.name || "N/A"}
                    </p>
                    <p className="text-secondary-light dark:text-secondary-dark m-0">
                      {item.slotDate} {item.slotTime || ""}
                    </p>
                  </div>
                  <div>
                    {item.cancelled ? (
                      <p className="text-accent-light dark:text-accent-dark text-xs font-medium m-0">
                        Cancelled
                      </p>
                    ) : item.isCompleted ? (
                      <p className="text-primary-light dark:text-primary-dark text-xs font-medium m-0">
                        Completed
                      </p>
                    ) : (
                      <motion.img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-8 h-8 cursor-pointer p-1 rounded-full hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
                        src={assets.cancel_icon}
                        alt="Cancel appointment icon"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                      />
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center p-4 text-secondary-light dark:text-secondary-dark">
                No recent bookings
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  );
};

export default Dashboard;
