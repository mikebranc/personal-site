import React from "react";
import {Link} from "react-router-dom"
import "../styles.css"

export default function Navbar() {
    return (
    <div>
        <nav className="navStyle">
            <Link to="/" id ="nameLink" className="navLink">Michael Branconier</Link>
            <div className="navLinkWrapper">
                <Link to="/" className="navLink">Home</Link>
                <Link to="/blog" className ="navLink">Blog</Link>
            </div>
        </nav>
    </div>
    );
}
