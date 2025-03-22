import React from "react";
import HeroSection from "./_components/HeroSection";
import Features from "@/components/features-1";
import Pricing from "./_components/Pricing";
import Faq from "./_components/Faq";
import FooterSection from "./_components/Footer";

function page() {
  return (
    <>
      <HeroSection />
      <Features />
      <Pricing />
      <Faq />
      <FooterSection />
    </>
  );
}

export default page;
