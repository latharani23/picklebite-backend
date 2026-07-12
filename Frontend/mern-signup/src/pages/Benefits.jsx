import React from "react";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import BenefitsSection from "../sections/BenefitsSection";

const Benefits = () => {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* SEO */}
      <Helmet>
        <title>Benefits of Picklebite | Homemade Pickles</title>

        <meta
          name="description"
          content="Discover the benefits of Picklebite homemade pickles – authentic taste, premium ingredients, and traditional recipes."
        />
      </Helmet>

      {/* PAGE CONTENT */}
      <div
        style={{
          minHeight: "80vh",
          background: "linear-gradient(135deg, #FAF7FF, #E6D6FF)",
        }}
      >
        <BenefitsSection />
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Benefits;
