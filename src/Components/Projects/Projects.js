import React, {useState, useEffect} from 'react';
import ProjectData from './ProjectData';
import github from '../images/github.png'
import './Projects.css';
import SectionBlock from '../SectionBlock';
import { firestore } from '../../firebase/config';
import { collection, getDocs } from "firebase/firestore"
import { getData } from "../../dbHelpers"

export default function Projects(){
    const [showProjects, setShowProjects] = useState(false)
    const [projData, setProjData] = useState()
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {
        setLoading(true)
        //Uses db helper function
        getData("project", setProjData, setLoading)
      }, [])

    const projectInfo = projData?.map((project) =>{
        return(  
            <a className="projectLinkBlock" href={project.projectLink} key ={project.id}>
                <div className="projectWrapper" >
                    <div className="projectHead">
                        <h3 className="projectName">{project.projectName}</h3>
                        <a href={project.githubLink}>
                            <img className="projectGithubLink" src={github} alt="github Icon" />
                        </a> 
                    </div>
                    <p className="projectDescription">{project.description}</p>
                    <div className="projectSkillWrapper">
                        {project.skills.map((skill, index) => <span key ={index} className="projectSkill">{skill}</span>)}
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
