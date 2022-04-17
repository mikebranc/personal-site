import React from "react"
import Navbar from "../Components/Navbar";
import {Outlet} from "react-router-dom"


export default function BlogAll(){
    return(
        <div>
            <Navbar />
            <h1>Dis da blog</h1>
        </div>
    )
}