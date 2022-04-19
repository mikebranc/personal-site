import React, {useState} from 'react';
import ProjectData from './ProjectData';
import github from '../images/github.png'
import './Projects.css';
import SectionBlock from '../SectionBlock';

export default function Projects(){
    const [showProjects, setShowProjects] = useState(false)
    const projectInfo = ProjectData.map(project =>{
        return(  
            <a className="projectLinkBlock" href={project.projectLink}>
                <div className="projectWrapper" >
                    <div className="projectHead">
                        <h3 className="projectName">{project.projectName}</h3>
                        <a href={project.githubLink}>
                            <img className="projectGithubLink" src={github} alt="github Icon" />
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
            <div onClick={()=>setShowProjects(prevState => !prevState)} className="sectionBlockWrapper">
                <SectionBlock sectionName="PROJECTS"/>
            </div>
            <div className="projectSectionWrapper">
            {showProjects && projectInfo}
            </div>
        </div>
        
    )
}
