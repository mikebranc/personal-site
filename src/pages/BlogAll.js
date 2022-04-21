import React from "react"
import Navbar from "../Components/Navbar";
import {Outlet} from "react-router-dom";
import dummyBlogData from "../dummyBlogData";
import {Link} from "react-router-dom";
import '../blogAll.css'
import Footer from "../Components/Footer/Footer";


export default function BlogAll(){
    const blogs = dummyBlogData.map(blog =>{
        return(
            <Link to={`/blog/${blog.slug}`} className="post">
                <div className="postDiv">
                    <h1>{blog.title}</h1>
                    <h3>{blog.date}</h3>
                </div>
            </Link>
        )
    })
    return(
        <div>
            <Navbar />
            <div className="postsWrapperOuter">
                <div className="postsWrapperInner">
                    {blogs}
                </div> 
            </div>
            <Footer />
        </div>
    )
}