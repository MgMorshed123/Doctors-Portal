import { useState } from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";
import React from "react";
import { AnimatedSection } from "./Animated";
import { Awards } from "./Awards";
import { Chatbot } from "./ChatBot";
import { Counter } from "./Counter";
import { FAQ } from "./Faq";
import { Forum } from "./Forum";
import { GoogleMaps } from "./GoogleMaps";
import { HealthPackages } from "./HealthPackages";
import { HealthTips } from "./HealthTips";
import { InsuranceOptions } from "./Insurance";
import { Statistics } from "./Statistics";
import { Testimonials } from "./Testimonials";
import { TrustBadges } from "./TrustBadges";
import { TrustedBy } from "./TrustedBy";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="py-16 text-center space-y-6 animate-fade-in"
    >
      <h1 className="text-3xl font-bold">Find By Speciality</h1>
      <p className="text-sm max-w-md mx-auto">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex justify-center gap-6 overflow-x-auto pb-4">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform duration-300"
            to={`/doctors/${item.speciality}`}
          >
            <img
              className="w-24 h-24 rounded-full shadow-md"
              src={item.image}
              alt={item.speciality}
            />
            <p className="mt-2 text-sm font-medium">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
export const HomeSections = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div>
      <HealthPackages></HealthPackages>
      <HealthTips></HealthTips>
      <Awards></Awards>
      <AnimatedSection></AnimatedSection>
      <Chatbot />
      <Testimonials></Testimonials>
      <InsuranceOptions></InsuranceOptions>
      <GoogleMaps></GoogleMaps>
      <TrustedBy></TrustedBy>
      <TrustBadges></TrustBadges>
      <Statistics></Statistics>
      <Forum></Forum>
      <FAQ></FAQ>
      <Counter></Counter>
    </div>
  );
};
