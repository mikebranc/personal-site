import React, {useState, useEffect} from "react"
import SectionBlock from "../SectionBlock"
import ExperienceData from "./ExperienceData"
import './Experience.css'
import { getFirestoreCollection } from "../../dbHelpers"

export default function Experience(){
    const [showExpereince, setShowExperience] = useState(false)
    const [expData, setExpData] = useState()
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        //imported function to call DB
        getFirestoreCollection("experience", setExpData, setLoading)
      }, [])
 
    const experiences = expData?.map(exp => {
        return (
            <div key = {exp.id} className="expBlockWrapper" >
                <h3 className="expPosition">{exp.position}</h3>
                <h4 className="expCompany">{exp.company}</h4>
                <h4 className="expDetail">{exp.location} | {exp.startDate} - {exp.endDate}</h4>
                <ul className="expDescription">
                    {exp.description.map( (bullet, index) => <li key={index} className="expDescriptionBullet"> {bullet}</li> )}
                </ul>
            </div>
        )
   })
    return(
        <div>
            <div onClick={()=>setShowExperience(prevState => !prevState)} className="sectionBlockWrapper">
                <SectionBlock sectionName="EXPERIENCE"/>
            </div>
            {
            showExpereince && experiences
            }
        </div>
    )

}