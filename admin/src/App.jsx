import React, { useContext, useEffect } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointment from "./pages/Admin/AllAppointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import { useThemeStore } from "./context/useThems";

const App = () => {
  const { atoken } = useContext(AdminContext);

  const { dToken } = useContext(DoctorContext);
  const { theme } = useThemeStore();
  console.log(dToken);

  useEffect(() => {
    // Apply the theme to the body element
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return atoken || dToken ? (
    <div>
      <ToastContainer />
      <Navbar></Navbar>
      <div className="flex items-start ">
        <Sidebar></Sidebar>
        {/* admin  */}
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard></Dashboard>} />
          <Route
            path="/all-appointments"
            element={<AllAppointment></AllAppointment>}
          />

          <Route path="/add-doctor" element={<AddDoctor></AddDoctor>} />
          <Route path="/doctor-list" element={<DoctorList></DoctorList>} />

          {/* doctor  */}
          <Route
            path="/doctor-dashboard"
            element={<DoctorDashboard></DoctorDashboard>}
          />
          <Route
            path="/doctor-profile"
            element={<DoctorProfile></DoctorProfile>}
          />

          <Route
            path="/doctor-appointments"
            element={<DoctorAppointment></DoctorAppointment>}
          />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login></Login>
      <ToastContainer />
    </div>
  );
};

export default App;
