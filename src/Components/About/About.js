import React, {useState} from 'react'
import SectionBlock from '../SectionBlock'
import './About.css'
import headshot from '../images/headshot.jpg'

const WYLDCARDS_URL = 'https://www.wyldcards.shop/';
const COMP_CRUNCH_URL = 'https://chrome.google.com/webstore/detail/comp-crunch-analyze-zillo/pfmjlnebociiohfhlpckomcmnajdonjp/'
const CRE_DATA_EXTRACTOR_URL= 'https://credataextractor.com/'

export default function About(){
    const [showAbout, setShowAbout] = useState(false)

    return(
        <div>
            <div onClick={()=>setShowAbout(prevState => !prevState)} className="sectionBlockWrapper">
                <SectionBlock sectionName="ABOUT" open={showAbout}/>
            </div>
            {showAbout &&
                <div className="aboutContentWrapper">
                <div className="aboutPhotoCol">
                    <img alt="profilePhoto" className="profilePhoto" src={headshot}/>
                </div>
                <div className="aboutTextCol">
                    <h3 className="welcomeMessage">Hi! I'm Michael Branconier, A Full Stack Engineer</h3>
                    <p className="aboutText">
                        I bring expereince in tech, real estate and startups. I used to work for a real estate brokerage doing just about everything,
                        but sales. Now, I'm working as a full stack software engineer and absolutely love it. When I'm not working my day job, I love to spend time
                        building new apps. I recently have built an AI powered application that helps real esatate investors save time underwriting with&nbsp; 
                        <a href={CRE_DATA_EXTRACTOR_URL} target='_blank' rel='noreferrer noopener' className='aboutLink'>
                           CRE Data Extractor
                        </a>
                        &nbsp;and a&nbsp;
                        <a href={COMP_CRUNCH_URL} target='_blank' rel='noreferrer noopener' className='aboutLink'>
                         chrome extension to analyze zillow data   
                        </a>
                        .
                        <br />
                        <br />
                        &nbsp;Outside of work, I enjoy hiking, camping, spending time with my family, reading and working out.
                        </p>
                        Thanks for checking out my website! If you keep going, you’ll learn more about my passion, expereince, and skills. 
                        I'll also try to stay up to date with all the projects I've been working on.
                        <br />
                        <br />
                </div>
            </div>
            }
        </div>
    )
}