import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((item) => item.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div className="py-8 animate-fade-in">
      <p className="text-lg mb-5">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row gap-5">
        <button
          className={`py-2 px-4 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary-light dark:bg-primary-dark text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex flex-col gap-4 text-sm ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {specialities.map((spec) => (
            <p
              key={spec}
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className={`w-full sm:w-auto px-4 py-2 border border-secondary-light dark:border-secondary-dark rounded transition-all cursor-pointer hover:bg-accent-light dark:hover:bg-accent-dark hover:text-white ${
                speciality === spec
                  ? "bg-primary-light dark:bg-primary-dark text-white"
                  : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-secondary-light dark:border-secondary-dark rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                className="bg-accent-light dark:bg-accent-dark w-full h-48 object-cover"
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
                    className={
                      item.available ? "text-green-600" : "text-red-600"
                    }
                  >
                    {item.available ? "Available" : "Not Available"}
                  </p>
                </div>
                <p className="text-lg font-semibold mt-2">{item.name}</p>
                <p className="text-sm text-secondary-light dark:text-secondary-dark">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
