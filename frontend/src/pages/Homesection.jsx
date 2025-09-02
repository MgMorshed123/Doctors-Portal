import React, { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
// import { homeData } from "../data/homeData";
import { HealthPackages } from "@/components/HealthPackages";
import { HealthTips } from "@/components/HealthTips";
import { Awards } from "@/components/Awards";
import { Testimonials } from "@/components/Testimonials";
import { InsuranceOptions } from "@/components/Insurance";
import { GoogleMaps } from "@/components/GoogleMaps";
import { TrustedBy } from "@/components/TrustedBy";
import { TrustBadges } from "@/components/TrustBadges";
import { Statistics } from "@/components/Statistics";
import { Forum } from "@/components/Forum";
import { FAQ } from "@/components/Faq";
// import { Counter } from "@/components/Counter";
import { AnimatedSection } from "@/components/Animated";
import { Chatbot } from "@/components/ChatBot";
import { UpcomingEvents } from "@/components/UpcomingEvents";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const HomeSections = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div>
      <>
        <HealthPackages />
        <InsuranceOptions />
        <HealthTips />
        <Awards />
        <TrustBadges />
        <TrustedBy />
        <Statistics />
        <Testimonials />
        <AnimatedSection />
        <UpcomingEvents />
        <Forum />
        <FAQ />
        <GoogleMaps />
        <Chatbot />
      </>
    </div>
  );
};

export default HomeSections;
