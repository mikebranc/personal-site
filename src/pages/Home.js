import React from "react";
import Navbar from "../Components/Navbar";
import About from "../Components/About";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="homeWrapper">
        <About />
      </div>
    </div>

  );
}
