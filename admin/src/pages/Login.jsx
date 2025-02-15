import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");

  const { setatoken, backendUrl } = useContext(AdminContext);

  const { dToken, setDToken } = useContext(DoctorContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          "http://localhost:4000/api/admin/login",
          {
            email,
            password,
          }
        );

        console.log(data);
        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setatoken(data.token);
          navigate("/admin-dashboard");

          Swal.fire({
            title: "Login Successful",
            icon: "success",
          });
        }
      } else {
        // Backend returned a failure response
        const { data } = await axios.post(
          "http://localhost:4000/api/doctor/doctor-login",
          {
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          // navigate("/admin-dashboard");

          Swal.fire({
            title: "Login Successful",
            icon: "success",
          });
        }
      }
    } catch (error) {
      // Handle exceptions (e.g., network errors, server issues)
      console.error(error);

      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm  shadow-lg ">
        <p className="text-2xl font-semibold m-auto ">
          <span className="text-blue-600">{state}</span> Login{" "}
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
            value={email}
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
            value={password}
          />
        </div>

        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p className="cursor-pointer">
            Doctor Login{" "}
            <span className="text-blue-700" onClick={() => setState("Doctor")}>
              Click Here{" "}
            </span>
          </p>
        ) : (
          <p className="cursor-pointer">
            Admin Login{" "}
            <span className="text-blue-700" onClick={() => setState("Admin")}>
              Click Here{" "}
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
