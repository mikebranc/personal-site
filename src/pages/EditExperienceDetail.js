import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Link} from "react-router-dom";
import '../editDetail.css'
import { firestore } from '../firebase/config';
import { collection,addDoc, setDoc,doc, getDoc } from 'firebase/firestore';


export default function EditExperienceDetail(){
    const {experienceId} = useParams()
    //used to prevent new entries being created after initial doc is saved
    const [currExperienceId, setCurrExperienceId] = useState(experienceId)
    const[loading, setLoading] = useState()
    const [experienceData, setExperienceData] = useState({
        position: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description:""
    })
    const [submitted, setSubmitted] = useState()
    const handleChange = (event) =>{
        const {value, name} = event.target
        setExperienceData( prevExpData => {
            return{
                ...prevExpData,
                [name]: value
            }
        })
    }
    
    useEffect(() => {
        setLoading(true)
        const getExperience = async () =>{
            try{
                const expRef = doc(firestore, "experience",experienceId)
                const expDoc = await getDoc(expRef)
                setExperienceData({
                    ...expDoc.data(),
                    description: expDoc.data().description.join(";")
                })
                setLoading(false)
            }
            catch(error){
                throw error.message
            }
        }
        if(experienceId !== "new") getExperience()
    }, [experienceId])

    const handleSubmit =(event) =>{
        event.preventDefault()
        const updateExp = async() =>{
            if(currExperienceId === "new"){
                //add try and catch
                const currentDescription = experienceData.description !== "" ?  experienceData.description.split(";") : ""
                const expRef = await addDoc(
                    collection(firestore, "experience"),
                    {
                        ...experienceData,
                        description: currentDescription
                    }
                )
                console.log("Document written with ID: ", expRef.id);
                setCurrExperienceId(expRef.id)
            }
            else{
                try{
                    const currentDescription = experienceData.description !== "" ?  experienceData.description.split(";") : ""
                    const expRef = await setDoc(
                        doc(firestore, "experience",currExperienceId),
                        {
                            ...experienceData,
                            description: currentDescription
                        }
                    )
                    console.log("Document Updated");
                }catch(error){
                    throw error.message
                }
            }   
            setSubmitted(new Date().toString())
        }
        updateExp()
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
                        name = "company"
                        onChange = {handleChange}
                        value = {experienceData.company}
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
                        
                    <label>Job Description (Bullets Separated by semicolon)</label>
                    <textarea 
                            name="description"
                            value={experienceData.description}
                            onChange={handleChange}
                            className="formBody"
                    />
                    {submitted && <span>Submitted {submitted}</span>}
                    <button>Submit</button>
                    
                </form>
            </div>
        </div>

    )
}