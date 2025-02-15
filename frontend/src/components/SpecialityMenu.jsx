import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";
import { useThemeStore } from "@/context/useThems";
const SpecialityMenu = () => {
  const { theme } = useThemeStore();

  return (
    <div
      id="speciality"
      className={`flex flex-col items-center gap-4 py-16 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-medium">Find By Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => {
          return (
            <Link
              onClick={() => scrollTo(0, 0)}
              className="flex flex-col items-center text-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] translate-all duration-500"
              to={`/doctors/${item.speciality}`}
              key={index}
            >
              <img src={item.image} alt="" srcset="" />
              <p>{item.speciality}</p>
            </Link>
          );
        })}
      </div>

      <div></div>
    </div>
  );
};

export default SpecialityMenu;
