import React from 'react'
import {Link} from "react-router-dom"


export default function edit(){

    const heading = {
        fontFamily: 'Kaushan Script, cursive',
        textAlign: 'center'
    }
    const pageWrapper = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
    const editWrapper = {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        height:'80vh'

    }
    const linkWrapper = {
        display:'flex',
        justifyContent: 'space-between'
    }
    const editButton = {
        padding:'10px',
        borderRadius:'none',
        fontFamily: 'Raleway, sans-seriff',
        margin: '0px 5px 0px 5px',
        width:'150px',
        fontSize:'20px',
        borderRadius:'10px',
        border:'none',
        fontWeight:'medium'
    }

    return(
        <div className={pageWrapper}>
            <h1 style={heading}>Michael Branconier</h1>
            <div style={editWrapper}>
                <h3 style={{fontSize:'25px'}}>What would you like to edit?</h3>
                <div style = {linkWrapper}>
                    <Link to="/edit/blog">
                        <button style={editButton}>Blog</button>
                    </Link>
                    <Link to="/edit/experience">
                        <button style={editButton}>Experience</button>
                    </Link>
                    <Link to="/edit/project">
                        <button style={editButton}>Projects</button>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}