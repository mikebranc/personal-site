import React from "react"
import Navbar from "../Components/Navbar";
import '../blogAll.css'
import Footer from "../Components/Footer/Footer";
import DataList from "../Components/DataList";
import dummyBlogData from "../dummyBlogData";


export default function BlogAll(){
    return(
        <div>
            <Navbar />
            <div className="postsWrapperOuter">
                <div className="postsWrapperInner">
                    <DataList data ={dummyBlogData} type="publicBlog"/>
                </div> 
            </div>
            <Footer />
        </div>
    )
}