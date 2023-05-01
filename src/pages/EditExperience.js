import React, {useState, useEffect} from 'react'
import DataList from '../Components/DataList'
import "../editSection.css"
import { getFirestoreCollection,deleteFirestoreDocument } from '../dbHelpers'
import {useNavigate} from "react-router-dom"
import {auth } from '../firebase/config'
import { useAuthState } from "react-firebase-hooks/auth";

export default function EditExperience(){
    const [expData, setExpData] = useState()
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        //imported function to call DB
        getFirestoreCollection("experience", setExpData, setLoading)
      }, [])
    
    const handleDelete = (event, docId,type) =>{
        event.preventDefault()
        setLoading(true)
        deleteFirestoreDocument(docId, setExpData, setLoading, type)
    }

    const [user, loadingAuth, error ] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (loadingAuth) return ;
        if (!user) return navigate("/");
      }, [user, loadingAuth]);
    
    const sortedExpData = expData?.sort((a,b) => {
        return new Date(b.startDate) - new Date(a.startDate)
    })
      
    return(
        <div className = "pageWrapper">
            <h1 className = "nameHeading">Michael Branconier</h1>
            <div className="sectionWrapper">
                <DataList type={"experience"} data ={sortedExpData} deleteFunction = {handleDelete}/>
            </div>
        </div>
    )
}