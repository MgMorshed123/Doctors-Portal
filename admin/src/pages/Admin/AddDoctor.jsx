import React, { useContext, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AdminContext } from "../../context/AdminContext";
import Swal from "sweetalert2";
import axios from "axios";
import { assets } from "../../assets/assets_admin/assets";
import { Eye, EyeOff, Trash2 } from "lucide-react";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const shouldReduceMotion = useReducedMotion();

  const { backendUrl, atoken } = useContext(AdminContext);

  const validateForm = () => {
    const newErrors = {};
    if (!docImg) newErrors.docImg = "Doctor image is required";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!fees) newErrors.fees = "Fees are required";
    else if (isNaN(fees) || Number(fees) <= 0)
      newErrors.fees = "Fees must be a positive number";
    if (!degree.trim()) newErrors.degree = "Degree is required";
    if (!address1.trim()) newErrors.address1 = "Address line 1 is required";
    if (!about.trim()) newErrors.about = "About section is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      Swal.fire({
        title: "Error",
        text: "Image size must be less than 5MB",
        icon: "error",
      });
      return;
    }
    setDocImg(file);
  };

  const handleResetForm = () => {
    setDocImg(null);
    setName("");
    setEmail("");
    setPassword("");
    setExperience("1 Year");
    setFees("");
    setAbout("");
    setSpeciality("General physician");
    setDegree("");
    setAddress1("");
    setAddress2("");
    setErrors({});
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            atoken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        Swal.fire({
          title: "Doctor Added",
          text: `Dr. ${name} has been successfully added!`,
          icon: "success",
        });
        handleResetForm();
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "Failed to add doctor",
          icon: "error",
        });
      }
    } catch (error) {
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
    <div className="min-h-[80vh] flex items-center justify-center bg-background-light dark:bg-background-dark relative overflow-hidden animate-fade-in px-4">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-light/10 dark:from-primary-dark/10 to-transparent pointer-events-none"></div>

      <motion.form
        onSubmit={onSubmitHandler}
        className="w-full max-w-4xl p-8 bg-background-light dark:bg-background-dark border border-secondary-light/50 dark:border-secondary-dark/50 rounded-xl shadow-lg glow-effect relative z-10"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-label="Add Doctor form"
      >
        {/* Header with Logo */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src={assets?.LOGO} className="w-16" alt="HM Medical Logo" />
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark">
              Add Doctor
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetForm}
            className="text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark"
            aria-label="Reset form"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-20 h-20 object-cover rounded-full border border-secondary-light/50 dark:border-secondary-dark/50"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor Profile"
            />
            {errors.docImg && (
              <p className="text-red-500 text-xs mt-1">{errors.docImg}</p>
            )}
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="doc-img"
            accept="image/*"
            hidden
          />
          <p className="text-sm text-secondary-light dark:text-secondary-dark">
            Upload Doctor Picture <br />
            (Max 5MB)
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-text-light dark:text-text-dark"
              >
                Doctor Name
              </label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={`border ${
                  errors.name
                    ? "border-red-500"
                    : "border-secondary-light/50 dark:border-secondary-dark/50"
                } rounded px-3 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark`}
                type="text"
                placeholder="Name"
                required
                aria-required="true"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-text-light dark:text-text-dark"
              >
                Doctor Email
              </label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={`border ${
                  errors.email
                    ? "border-red-500"
                    : "border-secondary-light/50 dark:border-secondary-dark/50"
                } rounded px-3 py-2 bg(fragment:1px; bgcolor:transparent; padding:0px; margin:0px; display:inline; } .bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark`}
                type="email"
                placeholder="Email"
                required
                aria-required="true"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="password"
                className="text-sm font-medium text-text-light dark:text-text-dark"
              >
                Doctor Password
              </label>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                className={`border ${
                  errors.password
                    ? "border-red-500"
                    : "border-secondary-light/50 dark:border-secondary-dark/50"
                } rounded px-3 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark`}
                placeholder="Password"
                required
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-secondary-light dark:text-secondary-dark"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="experience"
                className="text-sm font-medium text-text-light dark:text-text-dark"
              >
                Experience
              </label>
              <select
                id="experience"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border border-secondary-light/50 dark:border-secondary-dark/50 rounded px-3 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
              >
                {[
                  "1 Year",
                  "2 Year",
                  "3 Year",
                  "4 Year",
                  "5 Year",
                  "6 Year",
                  "7 Year",
                  "8 Year",
                  "9 Year",
                  "10 Year",
                ].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="fees"
                className="text-sm font-medium text-text-light dark:text-text-dark"
              >
                Fees
              </label>
              <input
                id="fees"
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className={`border ${
                  errors.fees
                    ? "border-red-500"
                    : "border-secondary-light/50 dark:border-secondary-dark/50"
                } rounded px-3 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark`}
                type="number"
                placeholder="Fees"
                required
                aria-required="true"
              />
              {errors.fees && (
                <p className="text-red-500 text-xs mt-1">{errors.fees}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="speciality"
                className="text-sm font-medium text-text-light dark:text-text-dark"
              >
                Speciality
              </label>
              <select
                id="speciality"
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border border-secondary-light/50 dark:border-secondary-dark/50 rounded px-3 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
              >
                {[
                  "General physician",
                  "Gynecologist",
                  "Dermatologist",
                  "Pediatricians",
                  "Neurologist",
                  "Gastroenterologist",
                ].map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="degree"
                className="text-sm font-medium text-text-light dark:text-text-dark"
              >
                Education
              </label>
              <input
                id="degree"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className={`border ${
                  errors.degree
                    ? "border-red-500"
                    : "border-secondary-light/50 dark:border-secondary-dark/50"
                } rounded px-3 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark`}
                type="text"
                placeholder="Degree"
                required
                aria-required="true"
              />
              {errors.degree && (
                <p className="text-red-500 text-xs mt-1">{errors.degree}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="address1"
                className="text-sm font-medium text-text-light dark:text-text-dark"
              >
                Address Line 1
              </label>
              <input
                id="address1"
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className={`border ${
                  errors.address1
                    ? "border-red-500"
                    : "border-secondary-light/50 dark:border-secondary-dark/50"
                } rounded px-3 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark`}
                type="text"
                placeholder="Address Line 1"
                required
                aria-required="true"
              />
              {errors.address1 && (
                <p className="text-red-500 text-xs mt-1">{errors.address1}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="address2"
                className="text-sm font-medium text-text-light dark:text-text-dark"
              >
                Address Line 2
              </label>
              <input
                id="address2"
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border border-secondary-light/50 dark:border-secondary-dark/50 rounded px-3 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                type="text"
                placeholder="Address Line 2"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label
            htmlFor="about"
            className="text-sm font-medium text-text-light dark:text-text-dark"
          >
            About Doctor
          </label>
          <textarea
            id="about"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className={`border ${
              errors.about
                ? "border-red-500"
                : "border-secondary-light/50 dark:border-secondary-dark/50"
            } rounded px-4 py-2 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark`}
            placeholder="Write about the doctor"
            rows={5}
            required
            aria-required="true"
          />
          {errors.about && (
            <p className="text-red-500 text-xs mt-1">{errors.about}</p>
          )}
        </div>

        {/* Doctor Profile Preview */}
        <div className="mt-6 p-4 bg-primary-light/10 dark:bg-primary-dark/10 rounded-lg">
          <h3 className="text-lg font-medium text-text-light dark:text-text-dark mb-2">
            Doctor Profile Preview
          </h3>
          <div className="flex items-center gap-4">
            <img
              className="w-16 h-16 object-cover rounded-full border border-secondary-light/50 dark:border-secondary-dark/50"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor Profile"
            />
            <div>
              <p className="font-semibold text-text-light dark:text-text-dark">
                {name || "Dr. John Doe"}
              </p>
              <p className="text-sm text-secondary-light dark:text-secondary-dark">
                {speciality || "General physician"} | {degree || "MBBS"}
              </p>
              <p className="text-sm text-secondary-light dark:text-secondary-dark">
                Experience: {experience || "1 Year"} | Fees: ${fees || "0"}
              </p>
              <p className="text-sm text-secondary-light dark:text-secondary-dark mt-1">
                {about || "No description provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <motion.button
            type="submit"
            className={`flex-1 py-3 rounded-md font-medium transition-all duration-300 ${
              loading
                ? "bg-primary-light/50 dark:bg-accent-dark/50 cursor-not-allowed"
                : "bg-primary-light dark:bg-accent-dark text-text-light dark:text-text-dark hover:bg-primary-light/90 dark:hover:bg-accent-dark/90"
            }`}
            disabled={loading}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          >
            {loading ? "Adding Doctor..." : "Add Doctor"}
          </motion.button>
          <motion.button
            type="button"
            onClick={handleResetForm}
            className="flex-1 py-3 rounded-md font-medium bg-secondary-light/50 dark:bg-secondary-dark/50 text-text-light dark:text-text-dark hover:bg-secondary-light/70 dark:hover:bg-secondary-dark/70 transition-all duration-300"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          >
            Reset Form
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddDoctor;
