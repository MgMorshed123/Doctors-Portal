import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    CompleteAppointment,
    CancelAppointment,
  } = useContext(DoctorContext);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  const defaultAvatar =
    assets.default_avatar || "https://via.placeholder.com/64?text=Patient";

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  <div></div>;
  return (
    dashData && (
      <div
        className="m-5 max-w-7xl mx-auto md:ml-64"
        role="region"
        aria-label="Doctor Dashboard"
      >
        {/* Top Cards */}
        <div className="flex flex-wrap gap-4">
          {[
            {
              icon: assets.earning_icon,
              label: "Earnings",
              value: `$${dashData.earnings || 0}`,
              alt: "Earnings icon",
            },
            {
              icon: assets.appointment_icon,
              label: "Appointments",
              value: dashData.appointments || 0,
              alt: "Appointments icon",
            },
            {
              icon: assets.patients_icon,
              label: "Patients",
              value: dashData.patients || 0,
              alt: "Patients icon",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="flex items-center gap-3 p-4 min-w-52 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all"
              role="article"
              aria-label={`${card.label}: ${card.value}`}
            >
              <img
                className="w-12 h-12 object-contain"
                src={card.icon}
                alt={card.alt}
              />
              <div>
                <p className="text-xl font-bold">{card.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {card.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Bookings */}
        <div
          className="mt-10 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
          role="table"
          aria-label="Latest Bookings"
        >
          {/* Table Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300 dark:border-gray-700 bg-teal-50 dark:bg-teal-900/20">
            <img
              className="w-6 h-6"
              src={assets.list_icon}
              alt="Latest bookings icon"
            />
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Latest Bookings
            </p>
          </div>

          {/* Table Body */}
          <div className="max-h-[50vh] overflow-y-auto">
            {dashData.latestAppointments &&
            dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center px-6 py-3 gap-4 border-b border-gray-200 dark:border-gray-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-900"
                  }`}
                  role="row"
                >
                  <img
                    className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
                    src={
                      imageErrors[item._id] || !item.userData.image
                        ? defaultAvatar
                        : item.userData.image
                    }
                    alt={`Profile of ${item.userData.name || "Unknown"}`}
                    onError={() => handleImageError(item._id)}
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-900 dark:text-gray-100 font-medium m-0">
                      {item.userData.name || "N/A"}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 m-0">
                      {item.slotDate || "N/A"}
                    </p>
                  </div>
                  <div>
                    {item.cancelled ? (
                      <p className="text-amber-600 dark:text-amber-400 text-xs font-medium m-0">
                        Cancelled
                      </p>
                    ) : item.isCompleted ? (
                      <p className="text-teal-600 dark:text-teal-400 text-xs font-medium m-0">
                        Completed
                      </p>
                    ) : (
                      <div className="flex gap-2">
                        <img
                          onClick={() => CancelAppointment(item._id)}
                          className="w-8 h-8 cursor-pointer p-1 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition"
                          src={assets.cancel_icon}
                          alt="Cancel appointment"
                        />
                        <img
                          onClick={() => CompleteAppointment(item._id)}
                          className="w-8 h-8 cursor-pointer p-1 rounded-full hover:bg-teal-100 dark:hover:bg-teal-900/30 transition"
                          src={assets.tick_icon}
                          alt="Complete appointment"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-4 text-gray-600 dark:text-gray-400">
                No recent bookings
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
