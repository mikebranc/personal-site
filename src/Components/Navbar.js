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
                <a href="https://summitandshark.com/?utm_source=personal-site&utm_medium=navigation&utm_campaign=consulting-link" className="navLink" target='_blank' rel="noopener noreferrer">
                    Consulting
                </a>
            </div>
        </nav>
    );
}
