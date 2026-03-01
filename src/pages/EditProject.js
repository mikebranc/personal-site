import React, {useEffect, useState} from 'react'
import DataList from '../Components/DataList'
import "../editSection.css"
import {getFirestoreCollection, deleteFirestoreDocument} from "../dbHelpers"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

export default function EditProject(){
    const [projData, setProjData] = useState()
    const [, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getFirestoreCollection("project", setProjData, setLoading)
      }, [])

    const handleDelete = (event, docId,type) =>{
        event.preventDefault()
        setLoading(true)
        deleteFirestoreDocument(docId, setProjData, setLoading, type)
    }

    const [user, loadingAuth] = useAuthState(auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (loadingAuth) return ;
        if (!user) return navigate("/");
      }, [user, loadingAuth, navigate]);

    const sortedProjData = projData?.sort((a,b) => a.order - b.order)

    return (
        <div className = "pageWrapper">
            <h1 className = "nameHeading">Michael Branconier</h1>
            <div className="sectionWrapper">
                <DataList type={"project"} data ={sortedProjData} deleteFunction={handleDelete}/>
            </div>
        </div>
    )
}