import React, { useState, useEffect, useContext } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { assets } from "../../assets/assets_admin/assets";
import { useThemeStore } from "@/context/useThems";

const AllAppointment = () => {
  const {
    atoken,
    getAllAppointments,
    appointments,
    backendUrl,
    calculateAge,
    convertToDate,
    cancelAppointment,
  } = useContext(AdminContext);

  const { theme } = useThemeStore();
  const shouldReduceMotion = useReducedMotion();

  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id, type) => {
    setImageErrors((prev) => ({ ...prev, [`${type}_${id}`]: true }));
  };

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);

  const defaultAvatar =
    assets.default_avatar || "https://via.placeholder.com/32?text=User";

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto my-5 bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-md"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="table"
      aria-label="Appointments table"
    >
      <p className="mb-4 text-lg font-semibold text-text-light dark:text-text-dark">
        All Appointments
      </p>

      <div className="border border-secondary-light/50 dark:border-secondary-dark/50 rounded-lg text-sm max-h-[80vh] overflow-y-auto min-h-[60vh] bg-background-light dark:bg-background-dark">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_2fr_2fr_1fr_1fr_1fr] py-3 px-6 border-b border-secondary-light/50 dark:border-secondary-dark/50 bg-primary-light/10 dark:bg-accent-dark/10 text-text-light dark:text-text-dark font-medium">
          <p>No</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments?.map((item, index) => (
          <motion.div
            key={item._id}
            className={`sm:grid grid-cols-[0.5fr_3fr_1fr_2fr_2fr_1fr_1fr_1fr] flex flex-col sm:flex-row gap-4 sm:gap-1 items-start sm:items-center py-3 px-6 border-b border-secondary-light/50 dark:border-secondary-dark/50 text-secondary-light dark:text-secondary-dark hover:bg-primary-light/10 dark:hover:bg-accent-dark/10 transition-colors ${
              index % 2 === 0
                ? "bg-background-light dark:bg-background-dark"
                : "bg-secondary-light/5 dark:bg-secondary-dark/5"
            }`}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            role="row"
          >
            <p className="font-medium">{index + 1}</p>

            <div className="flex items-center gap-3">
              <img
                className="w-8 h-8 rounded-full object-cover border border-secondary-light/50 dark:border-secondary-dark/50"
                src={
                  imageErrors[`user_${item._id}`] || !item.userData.image
                    ? defaultAvatar
                    : item.userData.image
                }
                alt={`Profile of ${item.userData.name}`}
                onError={() => handleImageError(item._id, "user")}
              />
              <p className="m-0">{item.userData?.name || "N/A"}</p>
            </div>

            <p>
              {item.userData?.dob ? calculateAge(item.userData.dob) : "N/A"}
            </p>

            <p className="m-0">
              {item.slotDate} {item.slotTime}
            </p>

            <div className="flex items-center gap-3">
              <img
                className="w-8 h-8 rounded-full object-cover border border-secondary-light/50 dark:border-secondary-dark/50"
                src={
                  imageErrors[`doc_${item._id}`] || !item.docData.image
                    ? defaultAvatar
                    : item.docData.image
                }
                alt={`Profile of ${item.docData.name}`}
                onError={() => handleImageError(item._id, "doc")}
              />
              <p className="m-0 text-center sm:text-left">
                {item.docData.name || "N/A"}
              </p>
            </div>

            <p className="m-0">${item.amount}</p>

            {item.cancelled ? (
              <p className="text-accent-light dark:text-accent-dark text-xs font-medium">
                Cancelled
              </p>
            ) : item.isCompleted ? (
              <p className="text-primary-light dark:text-primary-dark text-xs font-medium">
                Completed
              </p>
            ) : (
              <motion.img
                onClick={() => cancelAppointment(item._id)}
                className="w-8 h-8 cursor-pointer p-1 rounded-full hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
                src={assets.cancel_icon}
                alt="Cancel appointment"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AllAppointment;
