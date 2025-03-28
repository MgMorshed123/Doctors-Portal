import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/context/useThems";
const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const { setTheme, initializeTheme, theme } = useThemeStore();
  console.log(theme);

  const logOut = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div
      className={`flex justify-between items-center text-sm py-4 border-b   border-gray-400 ml-4 mr-4 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <NavLink to="/">
        <img
          to="/"
          className="w-40 h-16 cursor-pointer  bg-black"
          src={assets.LOGO}
          alt=""
          srcset=""
        />
      </NavLink>
      <ul className="hidden  md:flex items-start gap-5 font-medium ">
        <NavLink to="/">
          <li className="py-2">Home</li>
          <hr className="border-none h-0.5 bg-primary w-3/5  m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-2">All Doctors </li>
          <hr className="border-none h-0.5 bg-primary w-3/5  m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-2">About</li>
          <hr className="border-none h-0.5 bg-primary w-3/5  m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-2">Contact</li>
          <hr className="border-none h-0.5 bg-primary w-3/5  m-auto hidden" />
        </NavLink>

        <a
          href="https://doctors-portal-admin.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <li className="py-2">Admin</li>
          <hr className="border-none h-0.5 bg-primary w-3/5  m-auto hidden" />
        </a>
      </ul>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-10 h-10 rounded-full"
              src={userData?.image}
              alt=""
              srcset=""
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt=""
              srcset=""
            />

            <div className="absolute top-0 right-0 pt-16 text-base font-medium  text-gray-600 hidden group-hover:block">
              <div
                className={`min-w-48 rounded flex flex-col gap-4 p-4 ${
                  theme === "dark"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logOut} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => navigate("/login")}
              className=" bg-blue-800 text-white px-8 py-3 rounded-full font-light hidden md:block"
            >
              Create Account
            </button>
          </div>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden mr-7"
          src={assets.menu_icon}
          alt=""
          srcset=""
        />
        {/*mobile menu */}
        <div
          className={`fixed inset-0 z-20 transition-transform duration-300 transform ${
            showMenu ? "translate-x-0" : "translate-x-full"
          } md:hidden ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          } min-w-48 rounded flex flex-col gap-4 p-4`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.LOGO} alt="Logo" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col items-center gap-2 mt-3 text-lg font-medium">
            {[
              { name: "Home", path: "/" },
              { name: "All Doctors", path: "/doctors" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setShowMenu(false)}
                className="px-4 py-2 rounded inline-block hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {item.name}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
