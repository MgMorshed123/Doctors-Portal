import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  my-10 mt-40 text-sm">
        {/* left */}
        <div className="">
          <img src={assets.logo} className="mb-5 w-40" alt="" srcset="" />
          <p className="w-full md:w-2/3  leading-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim in
            facilis officiis tenetur magni consequatur.
          </p>
        </div>
        {/*  center*/}
        <div className="">
          <p className="text-xl font-medium mb-5  "> Company </p>
          <ul className="  flex flex-col gap-2">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacty Policy </li>
          </ul>
        </div>

        {/* rightt*/}
        <div>
          <p className="text-xl font-medium mb-5  ">Get In Touch </p>
          <ul className="  flex flex-col gap-2">
            <li>+321323123</li>
            <li>mdarfinji452gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Text */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024</p>
      </div>
    </div>
  );
};

export default Footer;
