import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const { token, setToken, currencySymbol, backendUrl } =
    useContext(AppContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let data;
      if (state === "Sign Up") {
        // Wait for the response to be fully returned
        const response = await axios.post(
          "http://localhost:4000/api/user/register",
          {
            name,
            password,
            email,
          }
        );
        data = response.data;

        console.log(data);

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          Swal.fire({
            title: data.message,
            icon: "error",
          });
        }
      } else {
        // Wait for the response to be fully returned
        const response = await axios.post(
          "http://localhost:4000/api/user/login",
          {
            email,
            password,
          }
        );
        data = response.data;

        console.log(data);

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);

          Swal.fire({
            title: "Login Successfully",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: data.message,
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg ">
        <p className="text-2xl font-semibold ">
          {state === "Sign Up" ? "Create Account " : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Sign Up" : "Login"} to book Appointment{" "}
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name </p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}

        <div className="w-full">
          <p>Email </p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="w-full">
          <p>Password </p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button className="bg-blue-800 text-white w-full py-2 rounded-md text-base ">
          {state === "Sign Up" ? "Create Account " : "Login"}{" "}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already Have an Account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer "
            >
              Login Here{" "}
            </span>
          </p>
        ) : (
          <p>
            Create An Account ? Click Here{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer "
            >
              Sign Up Here{" "}
            </span>{" "}
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
