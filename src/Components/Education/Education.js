import { useState } from "react";
import SectionBlock from "../SectionBlock";
import "./Education.css";

export default function Education() {
  const [showEducation, setShowEducation] = useState(false);

  return (
    <div>
      <div
        onClick={() => setShowEducation((prev) => !prev)}
        className="sectionBlockWrapper"
      >
        <SectionBlock sectionName="EDUCATION" open={showEducation} />
      </div>
      {showEducation && (
        <div className="educationWrapper">
          <div className="schoolWrapper">
            <h3 className="schoolHeading">Loyola Marymount University</h3>
            <h4 className="schoolDetail">Los Angeles, CA | May 2021</h4>
          </div>
          <div className="degreeWrapper">
            <h4 className="degreeName">
              B.B.A in Applied Information Management Systems
              <br />
              Minor in Computer Science
            </h4>
            <h4 className="degreeDetails">Magna Cum Laude | GPA: 3.89</h4>
          </div>
          <div className="achievementWrapper">
            <h5 className="achievementHeading">Achievements and Awards</h5>
            <ul className="achievementDetail">
              <li>LMU Arrupe Scholar</li>
              <li>Heron CBA Scholar</li>
              <li>John B. And Nelly Llanos Kilroy Endowed Scholar</li>
              <li>LMU Hackathon Mozilla State of the Internet Award</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
