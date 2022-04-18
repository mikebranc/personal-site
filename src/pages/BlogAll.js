import React from "react"
import Navbar from "../Components/Navbar";
import {Outlet} from "react-router-dom"


export default function BlogAll(){
    return(
        <div>
            <Navbar />
            <h1>This is the blog</h1>
        </div>
    )
}