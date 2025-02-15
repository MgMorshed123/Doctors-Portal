import React from "react";
import { useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import Appointments from "../../../../frontend/src/pages/Appointments";
// import { assets } from "../../../../frontend/src/assets/assets_frontend/assets";
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

  // console.log(atoken);
  // console.log(localStorage.getItem("atoken"));
  // console.log(appointments[0]?.userData?.dob);

  const { theme } = useThemeStore();
  // console.log("appointments", appointments);

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium"> All Appointments</p>

      <div className=" border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
        <div className="hidden sm:grid grid-cols-[.5fr_3fr_1fr_2fr_2fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>No</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* {appointments?.map((item, index) => {
          // console.log(appointments.userData)

          <div>
            <p>{index + 1}</p>
            <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-400">
              <p>{item?.userData?.name}</p>
              <div className="flex items-center gap-2">
                <img
                  className="w-8 rounded-full"
                  src={item.userData.image}
                  alt=""
                  srcset=""
                />
              </div>
            </div>
          </div>;
        })} */}

        {appointments?.map((item, index) => {
          return (
            <div key={item._id}>
              <div
                className={`flex flex-wrap justify-between max-sm:gap-5 
              ${
                theme === "dark"
                  ? "bg-black text-white border-white rounded"
                  : "bg-white text-black"
              }
              max-sm:text-base sm:grid grid-cols-[.5fr_3fr_1fr_2fr_2fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 border-b px-6 hover:bg-green-400`}
              >
                <p>{index + 1}</p>

                <div className="flex items-center gap-2">
                  <p>{item?.userData?.name}</p>
                  <img
                    className="w-8 rounded-full"
                    src={item.userData.image}
                    alt="User profile"
                  />
                </div>

                <p>
                  {item.userData?.dob ? calculateAge(item.userData.dob) : "N/A"}
                </p>
                <p>
                  {item.slotDate} {item.slotTime}
                </p>
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 rounded-full bg-gray-200"
                    src={item.docData.image}
                    alt=""
                    srcset=""
                  />
                  <p className="text-center m-0">{item.docData.name}</p>
                </div>
                <p>${item.amount}</p>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-modium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-400 text-xs font-modium">
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                    srcset=""
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllAppointment;
