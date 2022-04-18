import React from "react"
import SectionBlock from "../SectionBlock"
import ExperienceData from "./ExperienceData"
import './Experience.css'

export default function Experience(){

    const experiences = ExperienceData.map(exp => {
        return (
            <div className="expBlockWrapper">
                <h3 className="expPosition">{exp.position}</h3>
                <h4 className="expCompany">{exp.company}</h4>
                <h4 className="expDetail">{exp.location} | {exp.startDate} - {exp.endDate}</h4>
                <ul className="expDescription">
                    {exp.description.map( bullet => <li className="expDescriptionBullet"> {bullet}</li> )}
                </ul>
            </div>
        )
    })

    return(
        <div className="expWrapper">
            <SectionBlock sectionName="Experience"/>
            {experiences}
        </div>
    )
}