import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { token, backendUrl, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const navigate = useNavigate();

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/list-appointment",
        { headers: { token } }
      );
      if (data.success) {
        setAppointments(data.appointment.reverse());
      }
    } catch (error) {
      console.log(error);
      Swal.fire({ title: "Error fetching appointments", icon: "error" });
    } finally {
      setLoading(false); // Set loading to false when fetching is done
    }
  };

  const cancelAppointment = async (appointmentId) => {
    setLoading(true); // Optional: Show loader during cancellation
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        Swal.fire({ title: "Appointment Cancelled", icon: "success" });
        getUserAppointments();
        getDoctorsData();
      } else {
        Swal.fire({ title: data.message, icon: "error" });
      }
    } catch (error) {
      Swal.fire({ title: "Error cancelling appointment", icon: "error" });
    } finally {
      setLoading(false); // Hide loader after cancellation
    }
  };

  const initPay = async (appointmentId) => {
    setLoading(true); // Optional: Show loader during payment initiation
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        Swal.fire({ title: data.message, icon: "error" });
      }
    } catch (error) {
      Swal.fire({ title: "Payment error", icon: "error" });
    } finally {
      setLoading(false); // Hide loader after payment attempt
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="py-8 animate-fade-in">
      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70 z-50">
          <div className="w-12 h-12 border-4 border-t-4 border-primary-light dark:border-primary-dark border-opacity-50 dark:border-opacity-50 border-t-accent-light dark:border-t-accent-dark rounded-full animate-spin"></div>
        </div>
      )}
      <p className="pb-3 text-lg font-medium border-b border-secondary-light dark:border-secondary-dark mb-6">
        My Appointments
      </p>
      <div className="space-y-4">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 py-4 border-b border-secondary-light dark:border-secondary-dark items-start"
          >
            <img
              className="w-32 h-32 object-cover rounded-md shadow-md"
              src={item.docData.image}
              alt={item.docData.name}
            />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-lg">{item.docData.name}</p>
              <p className="text-secondary-light dark:text-secondary-dark">
                {item.docData.speciality}
              </p>
              <p className="font-medium mt-2">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="font-medium">Date & Time: </span>
                {slotDateFormate(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-4 sm:mt-0">
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => initPay(item._id)}
                  className={`text-sm px-6 py-2 rounded-md transition-all duration-300 ${
                    item.payment
                      ? "bg-green-500 text-white"
                      : "bg-primary-light dark:bg-primary-dark text-white hover:bg-accent-light dark:hover:bg-accent-dark"
                  }`}
                >
                  {item.payment ? "Payment Done" : "Pay Online"}
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm px-6 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className="text-sm px-6 py-2 border border-red-500 text-red-500 rounded-md">
                  Appointment Cancelled
                </button>
              )}
              {item.isCompleted && (
                <button className="text-sm px-6 py-2 border border-green-500 text-green-500 rounded-md">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
