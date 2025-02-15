import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useThemeStore } from "@/context/useThems";
import { Button } from "./ui/button";

const TopDoctor = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const { theme } = useThemeStore();

  console.log(doctors);

  return (
    <div
      className={`flex flex-col items-center gap-4    ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6 px-3 sm:px-3">
        {doctors.slice(0, 10).map((item, index) => {
          return (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0); // Scroll to the top of the page
              }}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] translate-all duration-500"
              key={index}
            >
              <img
                className="bg-blue-50 h-[350px] w-full"
                src={item.image}
                alt=""
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-700 ">
                  <p className="w-2 h-2 rounded-full bg-green-700"></p>
                  <p
                    className={
                      item?.available ? "text-green-700" : "text-red-700"
                    }
                  >
                    {item?.available ? "Available" : "Not Available"}
                  </p>
                </div>
                <p className=" text-lg font-medium">{item.name}</p>
                <p className=" text-sm ">{item.speciality}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        onClick={() => {
          navigate("/doctors/");
          window.scrollTo(0, 0); // Scroll to the top of the page
        }}
        className="bg-white text-sm sm:text-base text-gray-600 py-3 rounded-full px-3 mt-6 hover:scale-105 hover:bg-blue-800  hover:text-black transition-all"
      >
        View All
      </Button>
    </div>
  );
};

export default TopDoctor;
