import React from 'react';
import ProjectData from './ProjectData';
import githubIcon from './github.png';
import './Projects.css';
import SectionBlock from '../SectionBlock';

export default function Projects(){
    const projectInfo = ProjectData.map(project =>{
        return(  
            <a className="projectLinkBlock" href={project.projectLink}>
                <div className="projectWrapper" >
                    <div className="projectHead">
                        <h3 className="projectName">{project.projectName}</h3>
                        <a href={project.githubLink}>
                            <img className="projectGithubLink" src={githubIcon} />
                        </a> 
                    </div>
                    <p className="projectDescription">{project.description}</p>
                    <div className="projectSkillWrapper">
                        {project.skills.map(skill => <span className="projectSkill">{skill}</span>)}
                    </div>
                </div>
            </a>
            
            
        )
    })
    return(
        <div>
            <SectionBlock sectionName="Projects" />
            <div className="projectSectionWrapper">
            {projectInfo}
            </div>
        </div>
        
    )
}
