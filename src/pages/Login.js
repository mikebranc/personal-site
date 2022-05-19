import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth,logInWithEmailAndPassword } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

import "../login.css"
export default function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(()=>{
        if(user) navigate("/edit")
    }, [user, loading])

    const handleChange = (event) =>{
        const {name, value} = event.target
        if(name==='username'){
            setUsername(value)
        } 
        else {
            setPassword(value)
        }
    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        //submit password and username
    }

    return(
        <div className="loginWrapper">
            <form className="loginForm" onSubmit={handleSubmit}>
            <h1 className="michaelBranconier">Michael Branconier</h1>
                <input 
                    type="text" 
                    name="username"
                    placeholder="Username"
                    className="loginInput"
                    value ={username}
                    onChange={handleChange}
                 />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="loginInput"
                    value={password}
                    onChange={handleChange}
                 /> 
                 <button onClick={() => logInWithEmailAndPassword(username,password)} className="submitButton">Go</button>

            </form>
        </div>
    )
}
