import React, {useState} from "react";
import SkillsData from "./SkillsData";
import SectionBlock from "../SectionBlock";
import './Skills.css'

export default function Skills(){
    const Languages =[ "Javascript", "Python", "SQL", "HTML/CSS", "Java"]
    const Frameworks =["React", "git/Github", "Google Firebase"]
    const Technologies=["Salesforce", "Pardot", "Excel", "Tableau", "VS Code", "Webflow", "Google Analytics"]
    const [showSkills, setShowSkills] = useState(false)

    const skillsInfo = SkillsData.map(skillGroup => {
        return(
            <div className="skillGroupBox">
                <h1>{skillGroup.type}</h1>
                {skillGroup.details.map(skill => <span className="skill">{skill}</span>)}
            </div>
        )
    })
    return (
        <div>
            <div onClick={()=>setShowSkills(prevState => !prevState)} className="sectionBlockWrapper">
                <SectionBlock sectionName="SKILLS"/>
            </div>
            <div className="skillsWrapper">
                {showSkills && skillsInfo}
            </div>
        </div>
    )
}