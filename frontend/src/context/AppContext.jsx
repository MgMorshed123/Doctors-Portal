import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import React from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [userData, setUserData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      console.log(data);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        Swal.fire({
          title: data.message,
          // text: "You clicked the button!",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: error.message,
        // text: "You clicked the button!",
        icon: "success",
      });
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        Swal.fire({
          title: "Something Went Wrong",
          icon: "error",
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  const values = {
    doctors,
    getDoctorsData,
    token,
    backendUrl,
    setToken,
    currencySymbol,

    userData,
    setUserData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
