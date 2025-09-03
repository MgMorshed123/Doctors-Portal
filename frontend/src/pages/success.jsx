import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";
// import { toast } from "sonner";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleGoToAppointments = () => {
    // toast.success("Redirecting to My Appointments");
    navigate("/my-appointments");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <motion.div
        className="max-w-4xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your appointment has been confirmed.
          </p>
          <Button
            onClick={handleGoToAppointments}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Go to My Appointments
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
