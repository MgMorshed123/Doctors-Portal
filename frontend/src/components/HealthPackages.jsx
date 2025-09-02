import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Stethoscope, CheckCircle } from "lucide-react";
import { AnimatedSection } from "./Animated";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

export const HealthPackages = () => {
  const [healthPackages, setHealthPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const { userData } = useContext(AppContext);
  // console.log(userData);
  // Separate function to fetch health packages

  const token = "";
  // console.log("token", token);
  const fetchHealthPackages = async () => {
    try {
      const response = await axios.get(
        "https://doctor-for-u-backend.onrender.com/api/health/healthPackages"
      );
      console.log("response", response);
      if (response.data.success) {
        setHealthPackages(response.data.packages);
        setLoading(false);
      } else {
        setError(response.data.message || "Failed to fetch health packages");
        setLoading(false);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch health packages"
      );
      setLoading(false);
      console.error(
        "Health packages fetch error:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchHealthPackages();
  }, []);

  // useEffect(() => {
  //   // Fetch health packages regardless of login status
  //   fetchHealthPackages();

  //   // Check if user is logged in
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     axios
  //       .post(
  //         "http://localhost:4000/api/user/get-profile",
  //         {},
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       )
  //       .then((response) => {
  //         if (response.data.success) {
  //           setUserId(response.data.userData._id);
  //         } else {
  //           console.warn("Profile fetch failed:", response.data.message);
  //           localStorage.removeItem("token");
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(
  //           "Profile fetch error:",
  //           err.response?.data || err.message
  //         );
  //         localStorage.removeItem("token");
  //       });
  //   }
  // }, []);
  // fetchHealthPackages();

  const handlePurchase = async (packageId) => {
    if (!userData) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    try {
      const response = await axios.post(
        "https://doctor-for-u-backend.onrender.com/api/health/buyHealthPackage",
        { packageId },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      if (response.data.success) {
        const stripe = await stripePromise;
        window.location.href = response.data.paymentUrl;
      } else {
        alert(response.data.message || "Failed to initiate payment");
      }
    } catch (error) {
      console.log("error", error);
      alert(error.response?.data?.message || "Failed to initiate payment");
      console.error("Purchase error:", error.response?.data || error.message);
    }
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error)
    return <div className="text-center py-16 text-red-500">{error}</div>;
  if (healthPackages.length === 0)
    return (
      <div className="text-center py-16">No health packages available.</div>
    );

  console.log(healthPackages, "healthPackages");
  return (
    <AnimatedSection className="py-16 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-text-light dark:text-text-dark mb-12">
          Health Check Packages
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {healthPackages.map((pkg, index) => (
            <motion.div
              key={pkg._id}
              className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-secondary-light/50 dark:border-secondary-dark/50"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Stethoscope
                className="text-accent-light dark:text-accent-dark mb-4"
                size={32}
              />
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                {pkg.name}
              </h3>
              <div className="text-3xl font-bold text-accent-light dark:text-accent-dark mb-4">
                ${pkg.price}
              </div>
              <ul className="space-y-2">
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center text-secondary-light dark:text-secondary-dark"
                  >
                    <CheckCircle
                      className="text-accent-light dark:text-accent-dark mr-2"
                      size={16}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="w-full mt-6 bg-primary-light dark:bg-accent-dark text-text-light dark:text-text-dark py-2 rounded hover:bg-primary-light/90 dark:hover:bg-accent-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePurchase(pkg._id)}
                disabled={!token}
              >
                {token ? "Purchase Package" : "Coming Soon"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
