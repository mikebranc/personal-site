import React from "react";
import Navbar from "../Components/Navbar";
import About from "../Components/About";
import Education from "../Components/Education";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="homeWrapper">
        <About />
        <Education />
      </div>
    </div>

  );
}
