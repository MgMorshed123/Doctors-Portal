import axios from "axios";
import { use } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(localStorage.getItem("dToken"));
  const backendUrl = "https://doctor-for-u-backend.onrender.com";

  const [appointments, setAppointments] = useState([]);

  const [dashData, setDashData] = useState(false);

  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        Swal({
          title: data.message,
        });
      }
    } catch (error) {}
  };

  const CompleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/appointments-complete",
        { appointmentId },
        { headers: { dToken } }
      );

      console.log("data", data);

      if (data.success) {
        getAppointments();
        Swal.fire({
          title: "Appointment Completed ",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Something Went Wrong",
      });
    }
  };

  const CancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/appointments-cancelled",
        { appointmentId },
        { headers: { dToken } }
      );

      if (data.success) {
        console.log(data);
        getAppointments();

        Swal.fire({
          title: "Appointment Cancelled",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Something Went Wrong",
      });
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
      });

      console.log(data);

      if (data.success) {
        setDashData(data.dashData);
      } else {
        // console.log(error);
        // Swal({
        //   // title: data.message,
        // });
      }
    } catch (error) {
      console.log(error);
      // Swal.fire({

      //   title: error.message,
      // });
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken },
      });

      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.message,
      });
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    CompleteAppointment,
    CancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
