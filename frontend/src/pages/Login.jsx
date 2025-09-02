import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";
import axios from "axios";
import { assets } from "../assets/assets_frontend/assets";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (state === "Sign Up" && !name.trim())
      newErrors.name = "Name is required";
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
    setIsLoading(true);
    try {
      let data;
      if (state === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          password,
          email,
        });
        data = response.data;
        if (data.success) {
          setToken(data.token); // AppContext will handle localStorage
          Swal.fire({ title: "Account Created Successfully", icon: "success" });
        } else {
          Swal.fire({ title: data.message, icon: "error" });
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        data = response.data;
        if (data.success) {
          setToken(data.token); // AppContext handles localStorage
          Swal.fire({ title: "Login Successful", icon: "success" });
          localStorage.setItem("token", data.token);
        } else {
          Swal.fire({ title: data.message, icon: "error" });
        }
      }
    } catch (error) {
      Swal.fire({ title: error.message || "An error occurred", icon: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/"); // Redirect if already logged in
  }, [token, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background-light dark:bg-background-dark relative overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-light/10 dark:from-primary-dark/10 to-transparent pointer-events-none"></div>

      <div className="flex flex-col gap-6 p-8 w-full max-w-md border border-secondary-light/50 dark:border-secondary-dark/50 rounded-xl shadow-lg bg-background-light dark:bg-background-dark glow-effect relative z-10">
        <div className="flex justify-center mb-4">
          <img src={assets.LOGO} className="w-32" alt="HM Medical Logo" />
        </div>

        <p className="text-2xl font-bold text-center text-text-light dark:text-text-dark">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="text-center text-sm text-secondary-light dark:text-secondary-dark">
          Please {state === "Sign Up" ? "sign up" : "login"} to book an
          appointment
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="space-y-4"
          aria-label={`${state} form`}
        >
          {state === "Sign Up" && (
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`border ${
                  errors.name
                    ? "border-red-500"
                    : "border-secondary-light/50 dark:border-secondary-dark/50"
                } rounded w-full p-3 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all`}
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}

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
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-secondary-light dark:text-secondary-dark"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-md font-medium transition-all duration-300 ${
              isLoading
                ? "bg-primary-light/50 dark:bg-accent-dark/50 cursor-not-allowed"
                : "bg-primary-light dark:bg-accent-dark text-text-light dark:text-text-dark hover:bg-primary-light/90 dark:hover:bg-accent-dark/90"
            }`}
          >
            {isLoading
              ? "Processing..."
              : state === "Sign Up"
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-text-light dark:text-text-dark">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Create an account?"}{" "}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="text-primary-light dark:text-primary-dark underline cursor-pointer hover:text-accent-light dark:hover:text-accent-dark"
          >
            {state === "Sign Up" ? "Login here" : "Sign up here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
