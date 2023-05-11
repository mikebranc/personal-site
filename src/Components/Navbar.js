import React from "react";
import {Link} from "react-router-dom"
import "../styles.css"

export default function Navbar() {
    return (
        <nav className="navStyle">
            <Link to="/" id ="nameLink" className="navLink">Michael Branconier</Link>
            <div className="navLinkWrapper">
                <a href="https://medium.com/@michaelbranconier" className="navLink" target='_blank' rel="noopener noreferrer">
                    Blog
                </a>
            </div>
        </nav>
    );
}
