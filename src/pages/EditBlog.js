import React from 'react'
import DataList from '../Components/DataList'
import {Link} from "react-router-dom";
import dummyBlogData from "../dummyBlogData";



export default function EditBlog(){
    const blogWrapper ={
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
    }
    const nameHeading ={
        fontFamily: 'Kaushan Script, cursive',
        textAlign: 'center',
        paddingTop:'20px',
        marginBottom:'80px'
    }
    const pageWrapper ={
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center'

    }

    return(
        <div style = {pageWrapper}>
            <h1 style ={nameHeading}>Michael Branconier</h1>
            <Link to ="/edit" style={{color:'white', marginBottom:'20px'}}>Back to Edit</Link>
            <div style={blogWrapper}>
                    <DataList type={"blog"} data ={dummyBlogData}/>
            </div>
        </div>

    )

}