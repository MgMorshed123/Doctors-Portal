import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "@/context/useThems";

const Banner = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-blue-800 text-black"
      }`}
    >
      <div className="flex  rounded-lg px-6 sm:px-10 lg:px-12 my-20 md:mx-20">
        {/* left */}
        <div className="flex-1 py-8  md:py-16 lg:py-24  lg:pl-5 ">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white ">
            <p>Book Appointment</p>
            <p className="mt-4">With 100+ Trusted Doctors</p>
          </div>
          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="bg-white text-sm sm:text-base text-gray-600 py-3 rounded-full px-3 mt-6 hover:scale-105 transition-all"
          >
            Create Appointment
          </button>
        </div>

        {/* right */}

        <div className="hidden md:block md:w-1/2  lg:w-[370px] relative">
          <img
            className="w-full absolute bottom-0 right-0 max-w-md"
            src={assets.appointment_img}
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
