import React, {useState, useEffect} from 'react'
import DataList from '../Components/DataList'
import {useNavigate} from "react-router-dom";
import {auth } from '../firebase/config'
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestoreCollection } from '../dbHelpers';
import { deleteFirestoreDocument } from '../dbHelpers';



export default function EditBlog(){
    const [loading, setLoading] = useState()
    const [blogData, setBlogData] = useState()

    const [user, loadingAuth, error ] = useAuthState(auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (loadingAuth) return;
        if (!user) return navigate("/");
      }, [user, loadingAuth]);

    useEffect(()=>{
        setLoading(true)
        getFirestoreCollection("blog",setBlogData,setLoading)
    })

    const handleDelete = (event, docId,type) =>{
        event.preventDefault()
        setLoading(true)
        deleteFirestoreDocument(docId, setBlogData, setLoading, type)
    }


    return(
        <div className = "pageWrapper">
            <h1 className = "nameHeading">Michael Branconier</h1>
            <div className="sectionWrapper">
                <DataList type={"blog"} data ={blogData} deleteFunction={handleDelete}/>
            </div>
        </div>

    )

}