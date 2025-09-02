import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between rounded-xl px-6 md:px-10 lg:px-20 py-12 bg-primary-light dark:bg-primary-dark/10 text-white animate-fade-in">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <img src={assets.group_profiles} alt="Profiles" />
          <p className="leading-relaxed">
            Simply browse through our extensive list of trusted doctors,{" "}
            <br className="hidden md:block" />
            schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="inline-flex items-center gap-2  dark:bg-accent-dark px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-md text-text-dark dark:text-text-light"
        >
          Book Appointment
          <img className="w-4" src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0">
        <img
          className="w-full rounded-lg shadow-lg"
          src="https://media.istockphoto.com/id/2211325498/photo/people-and-doctors-walking-at-the-hospitals-entrance-hall.webp?a=1&b=1&s=612x612&w=0&k=20&c=8ugh78Mbn1SwpWQNb0ZzeHQh5kfA_d1_DAYrWTg_-34="
          alt="Header"
        />
      </div>
    </div>
  );
};

export default Header;
