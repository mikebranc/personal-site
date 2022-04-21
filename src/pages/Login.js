import React, {useState} from "react"

export default function Login(){
    const loginInput = {
        borderRadius:'10px',
        border: '3px solid #FAFAFA',
        padding:'10px',
        backgroundColor:'#1e1e1e',
        margin:'0px 0px 20px 0px',
        width:'300px',
        color: 'white',
        fontFamily: 'Raleway, sans-seriff'
    }
    const submitButton = {
        padding:'10px',
        fontSize:'15px',
        fontFamily:'Raleway, sans-seriff',
        fontWeight:'bold'
    }
    const loginForm ={
        display: 'flex',
        flexDirection:'column',
        alignItems:'center'
    }
    const loginWrapper = {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100vh'
    }
    const michaelBranconier = {
        fontFamily: 'Kaushan Script, cursive'
    }

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()


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
        <div style={loginWrapper}>
            <form style={loginForm} onSubmit={handleSubmit}>
            <h1 style={michaelBranconier}>Michael Branconier</h1>
                <input 
                    type="text" 
                    name="username"
                    placeholder="Username"
                    style={loginInput}
                    value ={username}
                    onChange={handleChange}
                 />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="loginInput"
                    style={loginInput}
                    value={password}
                    onChange={handleChange}
                 /> 
                 <button style={submitButton}>Go</button>

            </form>
        </div>
    )
}
