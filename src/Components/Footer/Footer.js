import React from "react";
import github from "../images/github.png"
import Linkedin from "../images/Linkedin.png"
import Mail from "../images/Mail.png"
import Twitter from "../images/Twitter.png"
import './Footer.css'

export default function Footer(){

    return(
        <div className="footerWrapper">
            <div className="footerLinkWrapper">
                <a className="footerLink" href="https://github.com/mikebranc/" target='_blank' rel='noreferrer noopener'>
                    <img className="footerImg" src={github} alt="github icon"/>
                </a>
                <a className="footerLink" href="https://www.linkedin.com/in/mbranconier/" target='_blank' rel='noreferrer noopener'>
                    <img className="footerImg" src={Linkedin} alt="Linkedin Icon"/>
                </a>
                <a className="footerLink" href="mailto:michaelbranconier@gmail.com" target='_blank' rel='noreferrer noopener'>
                    <img className="footerImg" src={Mail} alt="Mail Icon"/>
                </a>
                <a className="footerLink" href="https://twitter.com/mike_branc?" target='_blank' rel='noreferrer noopener'>
                    <img className="footerImg" src={Twitter} alt="Twitter Icon"/>
                </a>
            </div>
        </div>
    )
}