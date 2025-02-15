import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setatoken] = useState(localStorage.getItem("atoken"));

  const [dashData, setDashData] = useState();

  useEffect(() => {
    setatoken(localStorage.getItem("atoken"));
  });

  //  console.log(atoken)
  // console.log(localStorage.getItem("atoken"));

  const [doctors, setDoctors] = useState([]);

  const [appointments, setAppointments] = useState();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { atoken } }
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        Swal.fire({
          title: data.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
      });
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availablity",
        { docId },

        { headers: { atoken } }
      );

      if (data.success) {
        getAllDoctors();
        Swal.fire({
          title: data.message,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: data.message,
          icon: "error",
        });
      }
    } catch (error) {}
  };

  const getAllAppointments = async (req, res) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { atoken },
      });
      console.log(data);

      if (data.success) {
        setAppointments(data.appointments);
        console.log(appointments);
      } else {
        Swal.fire({
          title: data.message,
        });
      }
    } catch (error) {}
  };

  const calculateAge = (dob) => {
    const today = new Date(); // Current date
    const birthDate = new Date(dob); // Convert dob to Date object

    let age = today.getFullYear() - birthDate.getFullYear(); // Initial age calculation
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the current date is before the birthday this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split("_");
    return new Date(`${year}-${month}-${day}`);
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/appointment-cancel",
        { appointmentId },
        {
          headers: { atoken },
        }
      );

      console.log(data);

      if (data.success) {
        Swal.fire({
          title: data.message,
        });
        getAllAppointments();
      }
    } catch (error) {
      // Swal.fire({
      //   title: "",
      // });

      console.log(error);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { atoken },
      });

      console.log(data);

      if (data.success) {
        setDashData(data.dashData);
        console.log(data);
      } else {
        Swal.fire({
          title: "Error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    convertToDate,
    calculateAge,
    atoken,
    backendUrl,
    setatoken,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
