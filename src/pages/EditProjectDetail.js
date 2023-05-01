import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {Link,useNavigate} from "react-router-dom";
import '../editDetail.css'
import { firestore,auth } from '../firebase/config';
import { collection,addDoc, setDoc,doc, getDoc } from 'firebase/firestore';
import { getFirestoreDocument } from '../dbHelpers';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function EditProjectDetail(){
    const {projectId} = useParams()
    const [submitted, setSubmitted] = useState()
    const [currProjId, setCurrProjId] = useState(projectId)
    const [loading, setLoading] = useState()
    const [projectData, setProjectData] = useState({
        name: "",
        description:"",
        link: "",
        githubLink:"",
        skills:[],
        order: "",
    })

    useEffect(()=>{
        setLoading(true)
        if(currProjId !== "new") getFirestoreDocument(currProjId,setProjectData, setLoading,"project")
    }, [])

    const handleChange = (event) =>{
        const {value, name} = event.target
        setProjectData(prevProjData => {
            return {
                ...prevProjData,
                [name]: name === "skills" ? value.split(",") : value
            }
        })
    }

    const [user, loadingAuth, error ] = useAuthState(auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (loadingAuth) return ;
        if (!user) return navigate("/");
      }, [user, loadingAuth]);

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
                    await setDoc(doc(firestore, "project",currProjId),projectData)
                    console.log(projectData)
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
                    <textarea
                        name = "description"
                        onChange = {handleChange}
                        value = {projectData.description}
                        className = "formInputFull"
                        placeholder='Keep brief'
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
                    <label>Order</label>
                    <input
                        type = "text"
                        name = "order"
                        onChange = {handleChange}
                        value = {projectData.order}
                        className = "formInputFull"
                    /> 
                    {submitted && <span>Updated {submitted}</span>}
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}