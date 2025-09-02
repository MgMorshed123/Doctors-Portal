import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctor from "../components/TopDoctor";
import Banner from "../components/Banner";
import HomeSections from "../pages/Homesection";

const Home = () => {
  return (
    <div className="space-y-12">
      <Header />
      <SpecialityMenu />
      <TopDoctor />
      <Banner />
      <HomeSections></HomeSections>
    </div>
  );
};

export default Home;
