import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctor from "../components/RelatedDoctor";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, getDoctorsData, token } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [docInfo, setDocInfo] = useState(null);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = () => {
    if (!docInfo || !docInfo.slot_booked) return;
    const today = new Date();
    const allSlots = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);
      currentDate.setHours(10, 0, 0, 0);
      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const bookedSlots = docInfo.slot_booked[slotDate] || [];
        const isSlotAvailable = !bookedSlots.includes(formattedTime);
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      allSlots.push({
        date: new Date(today.getTime() + i * 24 * 60 * 60 * 1000),
        slots: timeSlots,
      });
    }
    setDocSlots(allSlots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  const bookAppointment = async () => {
    if (!token) {
      return Swal.fire({ title: "Login to book appointment" });
    }
    try {
      const selectedSlot = docSlots[slotIndex];
      const date = selectedSlot?.date;
      if (!date) throw new Error("Invalid date in selected slot");
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
      const slotTimeLocal = slotTime || selectedSlot.slots?.[0]?.time;
      if (!slotTimeLocal) throw new Error("No time slot selected");
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime: slotTimeLocal },
        { headers: { token } }
      );
      if (data.success) {
        Swal.fire({ title: "Appointment booked" });
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        Swal.fire({ title: data.message, icon: "error" });
      }
    } catch (error) {
      Swal.fire({ title: "Something went wrong", icon: "error" });
    }
  };

  return docInfo ? (
    <div className="py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <img
          className="w-full sm:max-w-72 rounded-xl shadow-md"
          src={docInfo.image}
          alt={docInfo.name}
        />
        <div className="flex-1 border border-secondary-light dark:border-secondary-dark rounded-xl p-6 bg-background-light dark:bg-background-dark shadow-lg">
          <p className="flex items-center gap-2 text-2xl font-semibold">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-secondary-light dark:text-secondary-dark">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-1 px-3 border text-xs rounded-full bg-accent-light dark:bg-accent-dark text-white">
              {docInfo.experience}
            </button>
          </div>
          <div className="mt-4">
            <p className="flex items-center gap-1 text-sm font-medium text-text-light dark:text-text-dark">
              About <img src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-secondary-light dark:text-secondary-dark max-w-prose mt-1 leading-relaxed">
              {docInfo.about}
            </p>
          </div>
          <p className="text-secondary-light dark:text-secondary-dark font-medium mt-4">
            Appointment Fee:{" "}
            <span className="text-text-light dark:text-text-dark">
              {currencySymbol} {docInfo.fees}
            </span>
          </p>
        </div>
      </div>
      <div className="sm:ml-4 mt-4 font-medium text-text-light dark:text-text-dark">
        <p className="text-xl mb-4">Booking Slots</p>
        <div className="flex gap-3 overflow-x-auto pb-4">
          {docSlots.map((daySlot, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center py-4 px-6 min-w-[80px] rounded-full cursor-pointer transition-all duration-300 ${
                slotIndex === index
                  ? "bg-primary-light dark:bg-primary-dark text-white"
                  : "border border-secondary-light dark:border-secondary-dark hover:bg-accent-light dark:hover:bg-accent-dark"
              }`}
            >
              <p className="font-bold">{daysOfWeek[daySlot.date.getDay()]}</p>
              <p>{daySlot.date.toLocaleDateString([], { day: "2-digit" })}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 overflow-x-auto mt-4 pb-4">
          {docSlots[slotIndex]?.slots.map((slot, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(slot.time)}
              className={`text-sm px-5 py-2 rounded-full cursor-pointer transition-colors duration-300 ${
                slot.time === slotTime
                  ? "bg-primary-light dark:bg-primary-dark text-white"
                  : "bg-secondary-light dark:bg-secondary-dark hover:bg-accent-light dark:hover:bg-accent-dark"
              }`}
            >
              {slot.time}
            </p>
          ))}
        </div>
        <Button
          onClick={bookAppointment}
          className="mt-6 bg-primary-light dark:bg-primary-dark text-white px-8 py-3 rounded-full hover:bg-accent-light dark:hover:bg-accent-dark transition-colors duration-300"
        >
          Book An Appointment
        </Button>
      </div>
      <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
    </div>
  ) : null;
};

export default Appointments;
