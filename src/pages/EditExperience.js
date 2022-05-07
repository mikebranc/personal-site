import React from 'react'
import DataList from '../Components/DataList'
import ExperienceData from '../Components/Experience/ExperienceData'
import { Link } from 'react-router-dom'
import "../editSection.css"

export default function EditExperience(){
return(
    <div className = "pageWrapper">
        <h1 className = "nameHeading">Michael Branconier</h1>
        <Link to ="/edit" style={{color:'white', marginBottom:'20px'}}>Back to Edit</Link>
        <div className="sectionWrapper">
                <DataList type={"experience"} data ={ExperienceData}/>
        </div>
    </div>
)
}