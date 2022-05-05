import React from 'react'
import BlogList from '../Components/BlogList'


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

    return(
        <div>
            <h1 style ={nameHeading}>Michael Branconier</h1>
            <div style={blogWrapper}>
                    <BlogList edit={true}/>
            </div>
        </div>

    )

}