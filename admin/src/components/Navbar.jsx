import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
// import useThemeStore from "@/context/useThems";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/context/useThems";

const Navbar = () => {
  const { atoken, setatoken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  // Access theme from the store
  // const { setTheme, initializeTheme, theme } = useThemeStore();

  const { setTheme, initializeTheme, theme } = useThemeStore();

  const logout = () => {
    navigate("/");
    atoken && setatoken("");
    dToken && setDToken("");
    atoken && localStorage.removeItem("atoken");
    dToken && localStorage.removeItem("dToken");
  };

  const navigate = useNavigate();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <div
      className={`flex justify-between items-center px-4 sm:px-10 py-3 border-b ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center text-sm">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        <p
          className={`border py-0.5 rounded-full ${
            theme === "dark" ? "text-white" : "text-gray-600"
          }`}
        >
          {atoken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={() => logout()}
        className={`${
          theme === "dark" ? "bg-white text-black" : "bg-primary text-black"
        } text-sm px-10 py-2 rounded-full`}
      >
        LogOut
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
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
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
