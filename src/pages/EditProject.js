import React, {useEffect, useState} from 'react'
import DataList from '../Components/DataList'
import "../editSection.css"
import {getFirestoreCollection, deleteFirestoreDocument} from "../dbHelpers"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';





export default function EditProject(){
    const [projData, setProjData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        //Uses db helper function
        getFirestoreCollection("project", setProjData, setLoading)
      }, [])

    const handleDelete = (event, docId,type) =>{
        event.preventDefault()
        setLoading(true)
        deleteFirestoreDocument(docId, setProjData, setLoading, type)
    }

    const [user, loadingAuth, error ] = useAuthState(auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (loadingAuth) return ;
        if (!user) return navigate("/");
      }, [user, loadingAuth]);

    
    return (
        <div className = "pageWrapper">
            <h1 className = "nameHeading">Michael Branconier</h1>
            <div className="sectionWrapper">
                <DataList type={"project"} data ={projData} deleteFunction={handleDelete}/>
            </div>
        </div>
    )
}