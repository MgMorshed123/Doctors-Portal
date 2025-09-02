import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary-light dark:bg-primary-dark/10 rounded-xl px-6 py-8 md:px-10 lg:px-12 my-20 md:mx-10 text-white animate-slide-up">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Book Appointment <br /> With 100+ Trusted Doctors
          </h2>
          <button
            onClick={() => {
              navigate("/login");
              window.scrollTo(0, 0);
            }}
            className="bg-primary-light dark:bg-accent-dark text-text-dark dark:text-text-light px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-md"
          >
            Create Appointment
          </button>
        </div>
        <div className="hidden md:block md:w-1/2 lg:w-[370px]">
          <img
            className="w-full rounded-lg shadow-lg"
            src="https://t4.ftcdn.net/jpg/02/91/56/81/240_F_291568147_nMq52oFmK4Ulr5HSBOLsSxlHKtLRve3Z.jpg"
            alt="Appointment"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
