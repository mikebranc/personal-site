import React from 'react'
import DataList from '../Components/DataList'
import {Link} from "react-router-dom";
import dummyBlogData from "../dummyBlogData";



export default function EditBlog(){

    return(
        <div className = "pageWrapper">
            <h1 className = "nameHeading">Michael Branconier</h1>
            <div className="sectionWrapper">
                <DataList type={"blog"} data ={dummyBlogData}/>
            </div>
        </div>

    )

}