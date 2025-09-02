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
import { useThemeStore } from "../context/useThems";
// import logo from "../assets/assets_frontend/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const { setTheme, theme } = useThemeStore();

  console.log("userdata", userData);
  const logOut = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <nav className="flex justify-between items-center py-4 px-4 md:px-8 lg:px-16 border-b border-secondary-light/50 dark:border-secondary-dark/50 sticky top-0 bg-background-light dark:bg-background-dark z-50 transition-colors duration-300">
      <NavLink to="/">
        <img
          className="w-10 h-10 cursor-pointer"
          src={assets.LOGO}
          alt="Logo"
        />
      </NavLink>
      <ul className="hidden md:flex items-center gap-6 font-medium">
        <NavLink
          to="/"
          className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
        >
          Home
        </NavLink>
        <NavLink
          to="/doctors"
          className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
        >
          All Doctors
        </NavLink>
        <NavLink
          to="/about"
          className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
        >
          Contact
        </NavLink>
        <NavLink
          to="https://doctors-portal-admin.onrender.com"
          target="_blank"
          className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
        >
          Admin
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sun className="h-5 w-5 text-text-light dark:text-text-dark rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 text-text-light dark:text-text-dark rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-background-light dark:bg-background-dark border border-primary-light/20 dark:border-primary-dark/20 text-text-light dark:text-text-dark"
          >
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
            >
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {token && userData ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  className="w-8 rounded-full shadow"
                  src={userData.image}
                  alt="Profile"
                />
                <img
                  className="w-3"
                  src={assets.dropdown_icon}
                  alt="Dropdown"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="mt-2 bg-background-light dark:bg-background-dark border border-primary-light/20 dark:border-primary-dark/20 text-text-light dark:text-text-dark"
            >
              <DropdownMenuItem
                onClick={() => navigate("/my-profile")}
                className="hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
              >
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/my-appointments")}
                className="hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
              >
                My Appointments
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={logOut}
                className="hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="!bg-primary-light dark:!bg-accent-dark !text-text-light dark:!text-text-dark px-6 py-2 rounded-full hover:!bg-primary-light/90 dark:hover:!bg-accent-dark/90 transition-colors duration-300 hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>
      {showMenu && (
        <div className="fixed inset-0 bg-background-light dark:bg-background-dark z-50 md:hidden animate-slide-up">
          <div className="flex justify-between px-6 py-4">
            <img className="w-36" src={assets.LOGO} alt="Logo" />
            <img
              onClick={() => setShowMenu(false)}
              className="w-6"
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          <ul className="flex flex-col items-center gap-4 mt-8 text-lg font-medium text-text-light dark:text-text-dark">
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/"
              className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/doctors"
              className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              All Doctors
            </NavLink>

            <NavLink
              to="https://doctors-portal-admin.onrender.com"
              target="_blank"
              className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              Admin
            </NavLink>

            <NavLink
              onClick={() => setShowMenu(false)}
              to="/about"
              className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/contact"
              className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              Contact
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
