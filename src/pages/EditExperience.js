import React, {useState, useEffect} from 'react'
import DataList from '../Components/DataList'
import ExperienceData from '../Components/Experience/ExperienceData'
import { Link } from 'react-router-dom'
import "../editSection.css"
import { firestore } from '../firebase/config'
import { getData } from '../dbHelpers'

export default function EditExperience(){
    const [expData, setExpData] = useState()
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        //imported function to call DB
        getData("experience", setExpData, setLoading)
      }, [])
return(
    <div className = "pageWrapper">
        <h1 className = "nameHeading">Michael Branconier</h1>
        <div className="sectionWrapper">
            <DataList type={"experience"} data ={expData}/>
        </div>
    </div>
)
}