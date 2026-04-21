import { useState, useEffect } from "react";
import github from "../images/github.png";
import SectionBlock from "../SectionBlock";
import { getFirestoreCollection } from "../../dbHelpers";
import "./Projects.css";

export default function Projects() {
  const [showProjects, setShowProjects] = useState(false);
  const [projData, setProjData] = useState();
  const [, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFirestoreCollection("project", setProjData, setLoading);
  }, []);

  const sortedProjData = projData
    ?.filter((project) => !project.hidden)
    ?.sort((a, b) => a.order - b.order);

  const projectInfo = sortedProjData?.map((project) => (
    <a
      className="projectLinkBlock"
      href={project.link}
      key={project.id}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="projectWrapper">
        <div className="projectHead">
          <h3 className="projectName">{project.name}</h3>
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
              <img className="projectGithubLink" src={github} alt="github Icon" />
            </a>
          )}
        </div>
        <p className="projectDescription">{project.description}</p>
        <div className="projectSkillWrapper">
          {project.skills.map((skill, index) => (
            <span key={index} className="projectSkill">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </a>
  ));

  return (
    <div>
      <div
        onClick={() => setShowProjects((prev) => !prev)}
        className="sectionBlockWrapper"
      >
        <SectionBlock sectionName="PROJECTS" open={showProjects} />
      </div>
      {showProjects && <div className="projectSectionGrid">{projectInfo}</div>}
    </div>
  );
}
