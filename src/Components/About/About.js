import React, {useState} from 'react'
import SectionBlock from '../SectionBlock'
import './About.css'

export default function About(){
    const [showAbout, setShowAbout] = useState(false)

    return(
        <div>
            <div onClick={()=>setShowAbout(prevState => !prevState)} className="sectionBlockWrapper">
                <SectionBlock sectionName="ABOUT"/>
            </div>
            {showAbout &&
                <div className="aboutContentWrapper">
                <div className="aboutPhotoCol">
                    <img alt="profilePhoto" className="profilePhoto" src="https://www.essence.com/wp-content/uploads/2020/08/Yachty-tout.jpg"/>
                </div>
                <div className="aboutTextCol">
                    <h3 className="welcomeMessage">Hi! I'm Michael Branconier</h3>
                    <p className="aboutText">Thanks for checking out my website! Here, you’ll learn more about my passion, expereince, and skills. 
                        If you’re lucky, you might even learn a little about yourself.
                        <br />
                        <br />
                        I’ve bring expereince in tech, real estate and startups. I recently helped take a real estate brokerage
                        from $0 to $100mm in transaction volume in 18 months. I currently am looking for a role as a fullstack
                        software engineer! 
                        <br />
                        <br />
                        I’ve worked as a business analyst, director of operations and more. I love automation, building things, and 
                        learning. I  welcome new opportunites and look forward to creating a brighter future through the use of 
                        technology! I know that’s what everyone says. But I’m serious!</p>
                </div>
            </div>
            }
        </div>
    )
}