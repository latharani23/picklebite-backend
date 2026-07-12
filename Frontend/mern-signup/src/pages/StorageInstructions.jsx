import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StorageSection from "../sections/StorageSection";

const StorageInstructions = () => {
  return (
    <>
      <Navbar />

      <div style={{ minHeight: "80vh" }}>
        <StorageSection />
      </div>

      <Footer />
    </>
  );
};

export default StorageInstructions;
