import React from "react";
import Navbar from "../Components/Navbar";
import About from "../Components/About/About";
import Education from "../Components/Education/Education";
import Experience from "../Components/Experience/Expereince";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="homeWrapper">
        <About />
        <Education />
        <Experience />
      </div>
    </div>

  );
}
