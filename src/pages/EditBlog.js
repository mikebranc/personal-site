import React, {useState, useEffect} from 'react'
import DataList from '../Components/DataList'
import {Link} from "react-router-dom";
import dummyBlogData from "../dummyBlogData";
import { getFirestoreCollection } from '../dbHelpers';
import { deleteFirestoreDocument } from '../dbHelpers';



export default function EditBlog(){
    const [loading, setLoading] = useState()
    const [blogData, setBlogData] = useState()

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