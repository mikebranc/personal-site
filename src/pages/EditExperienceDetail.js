import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import '../editExperienceDetail.css'
import {Link} from "react-router-dom";
import { ListItemAvatar } from '@mui/material';

export default function EditExperienceDetail(){
    const [experienceData, setExperienceData] = useState({
        position: "",
        companyName: "",
        location: "",
        startDate: "",
        endDate: "",
        jobDescription:""
    })
    console.log(experienceData)
    const handleChange = (event) =>{
        const {value, name} = event.target
        setExperienceData( prevExpData => {
            return{
                ...prevExpData,
                [name]: value
            }
        })
 }


    return(
        <div>
            <form>
                <label>Job Position</label>
                <input
                    type = "text"
                    name = "position"
                    onChange = {handleChange}
                    value = {experienceData.position}
                />
                <label>Company Name</label>
                <input
                    type = "text"
                    name = "companyName"
                    onChange = {handleChange}
                    value = {experienceData.companyName}
                />
                <label>Location</label>
                <input
                    type = "text"
                    name = "location"
                    onChange = {handleChange}
                    value = {experienceData.location}
                />
                <label>Start Date</label>
                <input
                    type = "text"
                    name = "startDate"
                    onChange = {handleChange}
                    value = {experienceData.startDate}
                />
                <label>End Date</label>
                <input
                    type = "text"
                    name = "endDate"
                    onChange = {handleChange}
                    value = {experienceData.endDate}
                />
                <label>Job Description</label>
                 <textarea 
                        name="jobDescription"
                        value={experienceData.jobDescription}
                        onChange={handleChange}
                    />
            </form>
        </div>

    )
}