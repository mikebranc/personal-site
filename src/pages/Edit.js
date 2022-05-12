import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import { firestore } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore';



export default function Edit(){

    console.log(process.env.FIREBASE_API_KEY)
    const heading = {
        fontFamily: 'Kaushan Script, cursive',
        textAlign: 'center'
    }
    const pageWrapper = {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
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

    const [loading, setLoading] = useState(false)
    const[expData, setExpData] = useState()

    //console.log(expData)

    // useEffect(() => {
    //     setLoading(true)
    //     const getExp = async () => {
    //       try {
    //         const expCol = collection(firestore, 'experience')
    //         const querySnapshot = await getDocs(expCol);
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.data)
    //         //   setExpData({...doc.data()})
    //         });
    //         setLoading(false)
    //       } catch (error) {
    //         throw error.message
    //       }
    //     }
    //     getExp()
    //   }, [])

    return(
        <div style={pageWrapper}>
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