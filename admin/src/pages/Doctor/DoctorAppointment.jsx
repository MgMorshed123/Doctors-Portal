import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import { useThemeStore } from "@/context/useThems";

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

  const { theme } = useThemeStore();

  useEffect(() => {
    getAppointments();
  }, [dToken]);

  const calculateAge = (dob) => {
    const today = new Date(); // Current date
    const birthDate = new Date(dob); // Convert dob to Date object

    let age = today.getFullYear() - birthDate.getFullYear(); // Initial age calculation
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the current date is before the birthday this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  //   console.log(appointments);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointment</p>

      <div
        className={`${
          theme === "dark"
            ? "bg-black text-white  border-white rounded"
            : "bg-white text-black"
        } border rounded text-sm max-h-[80vh] overflow-scroll min-h-[50vh]`}
      >
        <div className="max-sm:hidden grid grid-cols-[.5fr_2fr_1fr_1fr_3fr_1fr_1fr]  gap-1 py-3 px-3 border-b">
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
            className={`flex flex-wrap justify-between max-sm:gap-5 
              ${
                theme === "dark"
                  ? "bg-black text-white border-white rounded"
                  : "bg-white text-black"
              }
              max-sm:text-base sm:grid grid-cols-[.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 border-b px-6 hover:bg-green-400`}
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
                sizes=""
                srcset=""
              />
            </div>

            <div>
              <p className="text-xs w-14 inine border border-primary px-2 rounded-full">
                {item.payment ? "Online" : "Cash"}
              </p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item?.userData?.dob)}</p>
            <p>
              {item?.slotDate}, {item.slotTime}
            </p>
            <p>$ {item.amount}</p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => CancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => CompleteAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
