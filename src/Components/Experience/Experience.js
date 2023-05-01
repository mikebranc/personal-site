import React, {useState, useEffect} from "react"
import SectionBlock from "../SectionBlock"
import ExperienceData from "./ExperienceData"
import './Experience.css'
import { getFirestoreCollection } from "../../dbHelpers"
import moment from "moment"

export default function Experience(){
    const [showExpereince, setShowExperience] = useState(false)
    const [expData, setExpData] = useState()
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        //imported function to call DB
        getFirestoreCollection("experience", setExpData, setLoading)
      }, [])

      const sortedExpData = expData?.sort((a,b) => {
        return new Date(b.startDate) - new Date(a.startDate)
    })
 
    const experiences = sortedExpData?.map(exp => {
        const formattedStartDate = moment(exp.startDate).format('MMM YYYY')
        const formattedEndDate = exp.endDate && moment(exp.endDate).format('MMM YYYY')
        return (
            <div key = {exp.id} className="expBlockWrapper" >
                <h3 className="expPosition">{exp.position}</h3>
                <h4 className="expCompany">{exp.company}</h4>
                <h4 className="expDetail">{exp.location} | {formattedStartDate} - {exp.endDate ? formattedEndDate : 'Present'} {exp.seasonal && '(seasonal)'}</h4>
                <ul className="expDescription">
                    {exp.description.map( (bullet, index) => <li key={index} className="expDescriptionBullet"> {bullet}</li> )}
                </ul>
            </div>
        )
   })
    return(
        <div>
            <div onClick={()=>setShowExperience(prevState => !prevState)} className="sectionBlockWrapper">
                <SectionBlock sectionName="EXPERIENCE" open={showExpereince}/>
            </div>
            {
            showExpereince && experiences
            }
        </div>
    )

}