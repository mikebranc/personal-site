import React from "react"
import Navbar from "../Components/Navbar";
import '../blogAll.css'
import Footer from "../Components/Footer/Footer";
import BlogList from "../Components/BlogList";

export default function BlogAll(){
    return(
        <div>
            <Navbar />
            <div className="postsWrapperOuter">
                <div className="postsWrapperInner">
                    <BlogList/>
                </div> 
            </div>
            <Footer />
        </div>
    )
}