import React, { useContext, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "@/context/useThems";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun, LogOut } from "lucide-react";
import Swal from "sweetalert2";

const Navbar = () => {
  const { atoken, setatoken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const { setTheme, initializeTheme, theme } = useThemeStore();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the system.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0D9488",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          if (atoken) {
            setatoken("");
            localStorage.removeItem("atoken");
          }
          if (dToken) {
            setDToken("");
            localStorage.removeItem("dToken");
          }
          navigate("/");
          Swal.fire({
            title: "Logged Out",
            text: "You have been logged out successfully.",
            icon: "success",
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to log out. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="relative bg-background-light dark:bg-background-dark border-b border-secondary-light/50 dark:border-secondary-dark/50">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-light/10 dark:from-primary-dark/10 to-transparent pointer-events-none"></div>

      <motion.div
        className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-3 max-w-7xl mx-auto relative z-10 glow-effect"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-label="Navigation bar"
      >
        {/* Logo and Role */}
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.img
            className="w-10 sm:w-12 cursor-pointer"
            src={assets.LOGO}
            alt="HM Medical Logo"
            whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate("/")}
          />
          <p
            className="text-sm font-medium text-text-light dark:text-text-dark border border-primary-light dark:border-primary-dark rounded-full px-2 py-0.5 bg-primary-light/10 dark:bg-primary-dark/10"
            aria-label={`Current user role: ${atoken ? "Admin" : "Doctor"}`}
          >
            {atoken ? "Admin" : dToken ? "Doctor" : "Guest"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium px-4 sm:px-6 py-2 rounded-full bg-primary-light dark:bg-accent-dark text-text-light dark:text-text-dark hover:bg-primary-light/90 dark:hover:bg-accent-dark/90 transition-all"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            aria-label="Log out"
          >
            <LogOut size={16} />
            Log Out
          </motion.button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-secondary-light/50 dark:border-secondary-dark/50 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10"
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background-light dark:bg-background-dark border-secondary-light/50 dark:border-secondary-dark/50 text-text-light dark:text-text-dark"
            >
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="hover:bg-primary-light/10 dark:hover:bg-primary-dark/10"
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="hover:bg-primary-light/10 dark:hover:bg-primary-dark/10"
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="hover:bg-primary-light/10 dark:hover:bg-primary-dark/10"
              >
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
