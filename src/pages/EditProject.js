import React, {useEffect, useState} from 'react'
import DataList from '../Components/DataList'
import ProjectData from '../Components/Projects/ProjectData'
import { Link } from 'react-router-dom'
import "../editSection.css"
import {getData} from "../dbHelpers"



export default function EditProject(){
    const [projData, setProjData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        //Uses db helper function
        getData("project", setProjData, setLoading)
      }, [])

    return (
        <div className = "pageWrapper">
            <h1 className = "nameHeading">Michael Branconier</h1>
            <div className="sectionWrapper">
                <DataList type={"project"} data ={projData}/>
            </div>
        </div>
    )
}