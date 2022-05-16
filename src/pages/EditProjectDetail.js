import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import {Link} from "react-router-dom";
import '../editDetail.css'
import { firestore } from '../firebase/config';
import { collection,addDoc, setDoc,doc, getDoc } from 'firebase/firestore';

export default function EditProjectDetail(){
    const {projectId} = useParams()
    const [submitted, setSubmitted] = useState()
    const [currProjId, setCurrProjId] = useState(projectId)
    const [projectData, setProjectData] = useState({
        name: "",
        description:"",
        link: "",
        githubLink:"",
        skills:[]
    })
    console.log(currProjId)

    const handleChange = (event) =>{
        const {value, name} = event.target
        setProjectData(prevProjData => {
            return {
                ...prevProjData,
                [name]: name === "skills" ? value.split(",") : value
            }
        })
    }

    const handleSubmit =(event) =>{
        event.preventDefault()
        const updateProj = async() =>{
            if(currProjId === "new"){
                try{
                    const projRef = await addDoc(collection(firestore, "project"),projectData)
                    console.log("Document written with ID: ", projRef.id);
                    setCurrProjId(projRef.id)
                }catch(error){
                    throw error.message
                }
            }
            else{
                try{
                    await setDoc(doc(firestore, "experience",currProjId),projectData)
                    console.log("Document Updated");
                }catch(error){
                    throw error.message
                }
            }   
            setSubmitted(new Date().toString())
        }
        updateProj()
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
                        name = "skills"
                        onChange = {handleChange}
                        value = {projectData.skills}
                        className = "formInputFull"
                    /> 
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}