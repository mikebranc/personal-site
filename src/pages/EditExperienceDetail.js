import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Link, useNavigate} from "react-router-dom";
import '../editDetail.css'
import { firestore, auth } from '../firebase/config';
import { collection,addDoc, setDoc,doc, getDoc } from 'firebase/firestore';
import { getFirestoreDocument } from '../dbHelpers';
import { useAuthState } from "react-firebase-hooks/auth";



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
        description:"",
        seasonal: false,
    })
    const [submitted, setSubmitted] = useState()
    const handleChange = (event) =>{
        const {value, name, type, checked} = event.target
        if(type === 'checkbox') {
            setExperienceData( prevExpData => {
                return{
                    ...prevExpData,
                    [name]: checked
                }
            })
        } else {
            setExperienceData( prevExpData => {
                return{
                    ...prevExpData,
                    [name]: value
                }
            })
        }
    }
    
    useEffect(() => {
        setLoading(true)
        if(experienceId !== "new") getFirestoreDocument(currExperienceId,setExperienceData, setLoading, "experience")
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
    }

    const [user, loadingAuth, error ] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (loadingAuth) return ;
        if (!user) return navigate("/");
      }, [user, loadingAuth]);

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
                    <div className = "formHalfWrapper">
                        <div className = "formBlockWrapper">
                            <label>Company Name</label>
                            <input
                                type = "text"
                                name = "company"
                                onChange = {handleChange}
                                value = {experienceData.company}
                                className = "formInputHalf"
                            />
                        </div>
                        <div className = "formBlockWrapper">
                        <label>Location</label>
                            <input
                                type = "text"
                                name = "location"
                                onChange = {handleChange}
                                value = {experienceData.location}
                                className = "formInputHalf"
                            />
                        </div>
                    </div>
                    <div className = "formHalfWrapper">
                        <div className = "formBlockWrapper">
                            <label>Start Date</label>
                            <input
                                type = "date"
                                name = "startDate"
                                onChange = {handleChange}
                                value = {experienceData.startDate}
                                className = "formInputHalf"
                            />
                        </div>
                        <div className = "formBlockWrapper">
                            <label>End Date</label>
                                <input
                                    type = "date"
                                    name = "endDate"
                                    onChange = {handleChange}
                                    value = {experienceData.endDate}
                                    className = "formInputHalf"
                                />
                        </div>
                    </div>
                    <label>Seasonal</label>
                    <input
                        type = "checkbox"
                        name = "seasonal"
                        onChange = {handleChange}
                        value = {experienceData.seasonal}
                        className = "formInputHalf"
                    />
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