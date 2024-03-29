import React from "react";
import Navbar from "../Components/Navbar";
import About from "../Components/About/About";
import Education from "../Components/Education/Education";
import Experience from "../Components/Experience/Experience";
import Skills from "../Components/Skills/Skills";
import Projects from "../Components/Projects/Projects";
import Footer from "../Components/Footer/Footer";

export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <div className="homeWrapper">
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Footer />
      </div>
    </div>

  );
}
