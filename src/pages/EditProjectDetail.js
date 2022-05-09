import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import {Link} from "react-router-dom";
import '../editDetail.css'

export default function EditProjectDetail(){
    const [projectData, setProjectData] = useState({
        name: "",
        description:"",
        link: "",
        githubLink:"",
        tags:[]
    })

    const handleChange = (event) =>{
        const {value, name} = event.target
        setProjectData(prevProjData => {
            return {
                ...prevProjData,
                [name]: name === "tags" ? value.split(",") : value
            }
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(typeof(projectData.tags))
        console.log(projectData)
    }
    return (
        <div className="editOuter">
            <h1 className='nameHeading'>Michael Branconier</h1>
            <Link to={`/edit/project/`} style={{color:'white'}}>Back to Projects</Link>
            <div className ="editWrapper">
                <form onSubmit={handleSubmit} className ="formWrapper">
                    <label>Project Name</label>
                    <input
                        type = "text"
                        name = "name"
                        onChange = {handleChange}
                        value = {projectData.name}
                        className = "formInputFull"
                    />
                    <label>Project Description</label>
                    <input
                        type = "text"
                        name = "description"
                        onChange = {handleChange}
                        value = {projectData.description}
                        className = "formInputFull"
                    />
                    <label>Project Link</label>
                    <input
                        type = "text"
                        name = "link"
                        onChange = {handleChange}
                        value = {projectData.link}
                        className = "formInputFull"
                    />              
                    <label>Github Link</label>
                    <input
                        type = "text"
                        name = "githubLink"
                        onChange = {handleChange}
                        value = {projectData.githubLink}
                        className = "formInputFull"
                    /> 
                    <label>Tags</label>
                    <input
                        type = "text"
                        name = "tags"
                        onChange = {handleChange}
                        value = {projectData.tags}
                        className = "formInputFull"
                    /> 
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}