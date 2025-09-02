import React, { useContext, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorList = () => {
  const { doctors, atoken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);
  const [imageErrors, setImageErrors] = useState({});
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  const defaultAvatar =
    assets.default_avatar || "https://via.placeholder.com/150?text=Doctor";

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const cardVariants = {
    hover: shouldReduceMotion ? {} : { y: -5, scale: 1.02 },
    tap: shouldReduceMotion ? {} : { scale: 0.98 },
  };

  return (
    <motion.div
      className="m-5 max-w-7xl mx-auto bg-background-light dark:bg-background-dark md:ml-64"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      role="region"
      aria-label="Doctor List"
    >
      <h1 className="text-lg font-semibold text-text-light dark:text-text-dark mb-5">
        All Doctors
      </h1>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
        {doctors.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col w-full rounded-lg border border-secondary-light/50 dark:border-secondary-dark/50 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark overflow-hidden cursor-pointer hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-all"
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            role="article"
            aria-label={`Doctor: ${item.name}`}
          >
            <img
              className="w-full h-40 object-cover bg-secondary-light/20 dark:bg-secondary-dark/20"
              src={
                imageErrors[item._id] || !item.image
                  ? defaultAvatar
                  : item?.image
              }
              alt={`Profile of ${item.name || "Unknown"}`}
              onError={() => handleImageError(item._id)}
            />
            <div className="p-4 flex flex-col gap-2">
              <p className="text-lg font-medium text-text-light dark:text-text-dark">
                {item.name || "N/A"}
              </p>
              <p className="text-sm text-secondary-light dark:text-secondary-dark">
                {item.speciality || "N/A"}
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`availability-${item._id}`}
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                  className="w-4 h-4 text-primary-light dark:text-primary-dark border-secondary-light/50 dark:border-secondary-dark/50 rounded focus:ring-accent-light dark:focus:ring-accent-dark"
                  aria-label={`Toggle availability for ${item.name}`}
                />
                <label
                  htmlFor={`availability-${item._id}`}
                  className="text-sm text-secondary-light dark:text-secondary-dark"
                >
                  Available
                </label>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DoctorList;
