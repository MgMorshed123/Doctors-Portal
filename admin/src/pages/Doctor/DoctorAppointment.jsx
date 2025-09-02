import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointment = () => {
  const {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    CompleteAppointment,
    CancelAppointment,
  } = useContext(DoctorContext);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const defaultAvatar =
    assets.default_avatar || "https://via.placeholder.com/64?text=Patient";

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="m-5 max-w-7xl mx-auto md:ml-64">
      <p className="mb-3 text-lg font-medium text-text-light dark:text-text-dark">
        All Appointments
      </p>

      <div
        className="bg-background-light dark:bg-background-dark border border-secondary-light/50 dark:border-secondary-dark/50 rounded-lg text-sm max-h-[80vh] overflow-y-auto min-h-[50vh]"
        role="table"
        aria-label="Appointments Table"
      >
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-secondary-light/50 dark:border-secondary-dark/50 text-secondary-light dark:text-secondary-dark font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col max-sm:gap-5 sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-start sm:items-center text-secondary-light dark:text-secondary-dark py-3 border-b border-secondary-light/50 dark:border-secondary-dark/50 px-6 hover:bg-primary-light/10 dark:hover:bg-primary-dark/10"
            role="row"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full border border-secondary-light/50 dark:border-secondary-dark/50 object-cover"
                src={
                  imageErrors[item._id] || !item.userData.image
                    ? defaultAvatar
                    : item.userData.image
                }
                alt={`Profile of ${item.userData.name || "Unknown"}`}
                onError={() => handleImageError(item._id)}
              />
              <p className="text-sm m-0">{item.userData.name || "N/A"}</p>
            </div>
            <div>
              <span className="text-xs inline-block border border-primary-light dark:border-primary-dark px-2 rounded-full bg-primary-light/10 dark:bg-primary-dark/10">
                {item.payment ? "Online" : "Cash"}
              </span>
            </div>
            <p className="max-sm:hidden text-sm">
              {calculateAge(item?.userData?.dob) || "N/A"}
            </p>
            <p className="text-sm m-0">
              {item?.slotDate} {item.slotTime || ""}
            </p>
            <p className="text-sm m-0">$ {item.amount || "N/A"}</p>
            <div className="flex items-center gap-2">
              {item.cancelled ? (
                <p className="text-accent-light dark:text-accent-dark text-xs font-medium m-0">
                  Cancelled
                </p>
              ) : item.isCompleted ? (
                <p className="text-primary-light dark:text-primary-dark text-xs font-medium m-0">
                  Completed
                </p>
              ) : (
                <div className="flex gap-2">
                  <img
                    onClick={() => CancelAppointment(item._id)}
                    className="w-8 h-8 cursor-pointer p-1 rounded-full hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
                    src={assets.cancel_icon}
                    alt="Cancel appointment"
                  />
                  <img
                    onClick={() => CompleteAppointment(item._id)}
                    className="w-8 h-8 cursor-pointer p-1 rounded-full hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
                    src={assets.tick_icon}
                    alt="Complete appointment"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
