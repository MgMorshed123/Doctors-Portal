import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctor = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="py-12 animate-fade-in">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold">Recommended Doctors</h1>
        <p className="text-sm max-w-md">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {relDoc.slice(0, 5).map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-secondary-light dark:border-secondary-dark rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                className="w-full h-48 object-cover bg-accent-light dark:bg-accent-dark"
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
        <button
          onClick={() => {
            navigate("/doctors");
            window.scrollTo(0, 0);
          }}
          className="mt-8 bg-accent-light dark:bg-accent-dark text-text-dark dark:text-text-light px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-md"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default RelatedDoctor;
