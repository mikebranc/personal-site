import React from "react"
import {Outlet, useParams} from "react-router-dom"
import Navbar from "../Components/Navbar"

export default function BlogDetail(){
    const {blogId} = useParams()

    return(
        <div>
            <Navbar />
            <h1>This is the blog post for blog {blogId}</h1>
        </div>
    )
}