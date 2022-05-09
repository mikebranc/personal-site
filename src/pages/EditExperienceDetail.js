import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import {Link} from "react-router-dom";
import { ListItemAvatar } from '@mui/material';
import '../editDetail.css'


export default function EditExperienceDetail(){
    const [experienceData, setExperienceData] = useState({
        position: "",
        companyName: "",
        location: "",
        startDate: "",
        endDate: "",
        jobDescription:""
    })
    
    const handleChange = (event) =>{
        const {value, name} = event.target
        setExperienceData( prevExpData => {
            return{
                ...prevExpData,
                [name]: value
            }
        })
    }
    const handleSubmit =(event) =>{
        event.preventDefault()
        console.log(experienceData)
    }

    return(
        <div className="editOuter">
            <h1 className='nameHeading'>Michael Branconier</h1>
            <Link to={`/edit/experience/`} style={{color:'white'}}>Back to Experience</Link>
            <div className ="editWrapper">
                <form onSubmit={handleSubmit} className ="formWrapper">
                    <label>Job Position</label>
                    <input
                        type = "text"
                        name = "position"
                        onChange = {handleChange}
                        value = {experienceData.position}
                        className = "formInputFull"
                    />
                    <label>Company Name</label>
                    <input
                        type = "text"
                        name = "companyName"
                        onChange = {handleChange}
                        value = {experienceData.companyName}
                        className = "formInputFull"
                    />
                    <label>Location</label>
                    <input
                        type = "text"
                        name = "location"
                        onChange = {handleChange}
                        value = {experienceData.location}
                        className = "formInputFull"
                    />
                    <div className = "formHalfWrapper">
                        <div className = "formBlockWrapper">
                            <label>Start Date</label>
                            <input
                                type = "text"
                                name = "startDate"
                                onChange = {handleChange}
                                value = {experienceData.startDate}
                                className = "formInputHalf"
                            />
                        </div>
                        <div className = "formBlockWrapper">
                            <label>End Date</label>
                                <input
                                    type = "text"
                                    name = "endDate"
                                    onChange = {handleChange}
                                    value = {experienceData.endDate}
                                    className = "formInputHalf"
                                />
                        </div>
                    </div>
                        
                    <label>Job Description</label>
                    <textarea 
                            name="jobDescription"
                            value={experienceData.jobDescription}
                            onChange={handleChange}
                            className="formBody"
                    />
                    <button>Submit</button>
                </form>
            </div>
        </div>

    )
}