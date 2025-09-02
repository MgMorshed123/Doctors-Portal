import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Button } from "./ui/button";

const TopDoctor = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="py-16 text-center space-y-6 animate-fade-in bg-background-light dark:bg-background-dark">
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">
        Top Doctors to Book
      </h1>
      <p className="text-sm max-w-md mx-auto text-text-light dark:text-text-dark">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="border border-secondary-light/50 dark:border-secondary-dark/50 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img
              className="w-full h-48 object-cover bg-background-light dark:bg-background-dark"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm">
                <p
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></p>
                <p
                  className={item.available ? "text-green-600" : "text-red-600"}
                >
                  {item.available ? "Available" : "Not Available"}
                </p>
              </div>
              <p className="text-lg font-semibold mt-2 text-text-light dark:text-text-dark">
                {item.name}
              </p>
              <p className="text-sm text-secondary-light dark:text-secondary-dark">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="mt-8 bg-primary-light dark:bg-accent-dark text-text-light dark:text-text-dark px-8 py-3 rounded-full hover:bg-primary-light/90 dark:hover:bg-accent-dark/90 transition-colors duration-300"
      >
        View All
      </Button>
    </div>
  );
};

export default TopDoctor;
