import React, { useContext, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const { setatoken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setatoken(data.token);
          navigate("/admin-dashboard");
          Swal.fire({
            title: "Login Successful",
            text: "Welcome to the Admin Dashboard!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: data.message || "Invalid Credentials!",
            icon: "error",
          });
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/doctor/doctor-login`,
          {
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          navigate("/doctor-dashboard");
          Swal.fire({
            title: "Login Successful",
            text: "Welcome to the Doctor Dashboard!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: data.message || "Invalid Credentials!",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background-light dark:bg-background-dark relative overflow-hidden animate-fade-in">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-light/10 dark:from-primary-dark/10 to-transparent pointer-events-none"></div>

      <motion.form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 w-full max-w-md p-8 bg-background-light dark:bg-background-dark border border-secondary-light/50 dark:border-secondary-dark/50 rounded-xl shadow-lg glow-effect relative z-10"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-label={`${state} login form`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={assets.LOGO} className="w-32" alt="HM Medical Logo" />
        </div>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-center text-text-light dark:text-text-dark">
          <span className="text-primary-light dark:text-primary-dark">
            {state}
          </span>{" "}
          Login
        </h2>

        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border ${
              errors.email
                ? "border-red-500"
                : "border-secondary-light/50 dark:border-secondary-dark/50"
            } rounded w-full p-3 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all`}
            placeholder="Your Email"
            required
            aria-required="true"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="w-full relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border ${
              errors.password
                ? "border-red-500"
                : "border-secondary-light/50 dark:border-secondary-dark/50"
            } rounded w-full p-3 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all`}
            placeholder="Your Password"
            required
            aria-required="true"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-7 text-secondary-light dark:text-secondary-dark"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <motion.button
          type="submit"
          className={`w-full py-3 rounded-md font-medium transition-all duration-300 ${
            loading
              ? "bg-primary-light/50 dark:bg-accent-dark/50 cursor-not-allowed"
              : "bg-primary-light dark:bg-accent-dark text-text-light dark:text-text-dark hover:bg-primary-light/90 dark:hover:bg-accent-dark/90"
          }`}
          disabled={loading}
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        <p className="text-center text-sm text-text-light dark:text-text-dark">
          {state === "Admin" ? "Doctor Login" : "Admin Login"}{" "}
          <span
            className="text-primary-light dark:text-primary-dark cursor-pointer hover:text-accent-light dark:hover:text-accent-dark underline"
            onClick={() => setState(state === "Admin" ? "Doctor" : "Admin")}
          >
            Click Here
          </span>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
