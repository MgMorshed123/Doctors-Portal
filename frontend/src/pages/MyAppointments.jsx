import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Swal from "sweetalert2";

const MyAppointments = () => {
  const { token, backendUrl, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  console.log("appointments", appointments);

  // months

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

  const slotDateFormate = (slotDate) => {
    console.log(slotDate);
    const dateArray = slotDate.split("_");

    return (
      dateArray[0] + " " + months[Number(dateArray[1] - 1)] + " " + dateArray[2]
    );
  };

  // Function to fetch user appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/list-appointment",
        { headers: { token } }
      );

      console.log(data);

      if (data.success) {
        // Update state with fetched data
        setAppointments(data.appointment); // Assuming the response has "appointments" property
      } else {
        console.error("Failed to fetch appointments or invalid data format");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch appointments once when component mounts or token changes
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, []);
  // Add token as a dependency to refetch if the token changes

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      console.log(data);

      if (data.success) {
        getUserAppointments();
        getDoctorsData();
        console.log(data);
        Swal.fire({
          title: "Appointmment Cacnelled",
        });
      } else {
      }
    } catch (error) {}
  };

  const payment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success && data.paymentUrl) {
        console.log("Redirecting to Stripe...", data);

        window.location.href = data.paymentUrl; // Redirect to Stripe payment page
        getUserAppointments();
      } else {
        console.error("Payment initialization failed:", data.message);
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
    }
  };

  console.log("appointments.payment ", appointments.payment);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div className="">
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            >
              <div>
                <img
                  className="w-32 bg-indigo-200"
                  src={item.docData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-small text-zinc-600">
                <p className="text-neutral-50 font-semibold ">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time :{" "}
                  </span>
                  {/* Replace with actual time from the backend */}
                  {slotDateFormate(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div className="flex flex-col justify-end">
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => payment(item._id)}
                    className="text-sm hover:bg-green-900 bg-green-500 hover:text-white translate-all duration-300 text-stone-500 text-center sm:min-w-48 py-2 border rounded"
                  >
                    {item.payment === true ? (
                      <p>Payment Done </p>
                    ) : (
                      "Pay Online"
                    )}
                  </button>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm hover:bg-red-500 hover:text-black translate-all duration-300 text-stone-500 text-center sm:min-w-48 py-2 border rounded"
                  >
                    Cancel Appointment
                  </button>
                )}
                {!item.isCompleted && item.cancelled == true ? (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-red-600  hover:border-red-800 translate-all duration-300 text-center sm:min-w-48 py-2 border rounded"
                  >
                    Appointment Cancelled
                  </button>
                ) : (
                  ""
                )}

                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-400 ">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
