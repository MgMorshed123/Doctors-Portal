import React from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { DoctorContext } from "../context/DoctorContext";
import { useThemeStore } from "@/context/useThems";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);

  const { dToken } = useContext(DoctorContext);

  const { theme } = useThemeStore();

  console.log(theme);

  return (
    <div
      className={`min-h-screen border-r ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {atoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF]  border-r-4 border-primary" : ""
              }`
            }
            to="/admin-dashboard"
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="text-inherit">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/all-appointments"
          >
            <img src={assets.appointment_icon} alt="" srcset="" />
            <p className="text-inherit">Appointment</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/add-doctor"
          >
            <img src={assets.add_icon} alt="" srcset="" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/doctor-list"
          >
            <img src={assets.people_icon} alt="" srcset="" />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/doctor-dashboard"
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/doctor-appointments"
          >
            <img src={assets.appointment_icon} alt="" srcset="" />
            <p className="hidden md:block">Appointment</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/doctor-profile"
          >
            <img src={assets.people_icon} alt="" srcset="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
