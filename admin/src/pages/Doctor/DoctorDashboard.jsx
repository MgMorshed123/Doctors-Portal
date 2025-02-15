import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import { useThemeStore } from "@/context/useThems";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    setDashData,
    getDashData,
    CompleteAppointment,
    CancelAppointment,
  } = useContext(DoctorContext);

  console.log(dashData);

  const { theme } = useThemeStore();

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className=" m-5">
        <div className=" flex flex-wrap gap-3  ">
          <div className="flex items-center gap-2  p-4 min-w-52 rounded border-2 border-gray-50 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" srcset="" />

            <div>
              <p className="text-xl font-bold text-gray-950">
                ${dashData.earnings}
              </p>
              <p className=" text-gray-400">Earnings</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 ${
              theme === "dark" ? "bg-black text-white" : "bg-white text-black"
            } p-4 min-w-52 rounded border-2 border-gray-50 cursor-pointer hover:scale-105 transition-all`}
          >
            <img
              className="w-14"
              src={assets.appointment_icon}
              alt=""
              srcset=""
            />
            <div>
              <p className="text-xl font-bold text-gray-950">
                {dashData.appointments}
              </p>
              <p className=" text-gray-400">Appointments</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2${
              theme === "dark"
                ? "bg-black text-white border-white rounded"
                : "bg-white text-black"
            } p-4 min-w-52 rounded border-2 border-gray-50 cursor-pointer hover:scale-105 transition-all`}
          >
            <img className="w-14" src={assets.patients_icon} alt="" srcset="" />

            <div>
              <p className="text-xl font-bold text-gray-950">
                {dashData.patients}
              </p>
              <p className=" text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div
          className={`
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        `}
        >
          <div className=" flex items-center  gap-2.5 px-4 py-4 mt-10 rounded-t border ">
            <img src={assets.list_icon} alt="" srcset="" />
            <p className="font-semibold border-white rounded">
              Latest Booking{" "}
            </p>
          </div>

          <div
            className={`pt-4 border border-t-3 ${
              theme === "dark"
                ? "bg-black text-white border-white rounded"
                : "bg-white text-black"
            }`}
          >
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex  items-center px-6 py-3 gap-3 hover:bg-green-400"
                key={index}
              >
                <img
                  className="w-28"
                  src={item.userData.image}
                  alt=""
                  srcSet=""
                />

                <div className="flex-1 text-sm">
                  <p className="text-gray-800">{item.userData.name}</p>
                  <p className="text-gray-800">{item.slotDate}</p>
                </div>

                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
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
      </div>
    )
  );
};

export default DoctorDashboard;
