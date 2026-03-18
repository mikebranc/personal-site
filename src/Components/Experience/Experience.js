import { useState, useEffect } from "react";
import SectionBlock from "../SectionBlock";
import { getFirestoreCollection } from "../../dbHelpers";
import "./Experience.css";

const formatMonth = (dateStr) =>
  new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(dateStr)
  );

export default function Experience() {
  const [showExperience, setShowExperience] = useState(false);
  const [expData, setExpData] = useState();
  const [, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFirestoreCollection("experience", setExpData, setLoading);
  }, []);

  const sortedExpData = expData?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const experiences = sortedExpData?.map((exp) => (
    <div key={exp.id} className="expBlockWrapper">
      <h3 className="expPosition">{exp.position}</h3>
      <h4 className="expCompany">{exp.company}</h4>
      <h4 className="expDetail">
        {exp.location} | {formatMonth(exp.startDate)} -{" "}
        {exp.endDate ? formatMonth(exp.endDate) : "Present"}{" "}
        {exp.seasonal && "(seasonal)"}
      </h4>
      <ul className="expDescription">
        {exp.description.map((bullet, index) => (
          <li key={index} className="expDescriptionBullet">
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  ));

  return (
    <div>
      <div
        onClick={() => setShowExperience((prev) => !prev)}
        className="sectionBlockWrapper"
      >
        <SectionBlock sectionName="EXPERIENCE" open={showExperience} />
      </div>
      {showExperience && experiences}
    </div>
  );
}
