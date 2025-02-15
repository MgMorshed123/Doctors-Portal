import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-2xl pt-10">
        <p>
          Contact <span>Us </span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10  mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
          srcset=""
        />
        <div className="flex flex-col justify-center item-start gap-6">
          <p className="font-semibold text-lg  ">OUR OFFICE</p>
          <p className="">
            00000 Willms Station
            <br />
          </p>

          <p className="">
            Email: greatstackdev@gmail.com <br /> USA Tel: (000) 000-0000
          </p>
          <p className="">Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
