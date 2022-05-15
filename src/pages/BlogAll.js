import React, {useState, useEffect} from "react"
import Navbar from "../Components/Navbar";
import '../blogAll.css'
import Footer from "../Components/Footer/Footer";
import DataList from "../Components/DataList";
import dummyBlogData from "../dummyBlogData";
import { getData } from "../dbHelpers";


export default function BlogAll(){
    const [blogData, setBlogData] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        setLoading(true)
        getData("blog", setBlogData, setLoading)
    }, [])

    return(
        <div>
            <Navbar />
            <div className="postsWrapperOuter">
                <div className="postsWrapperInner">
                    {blogData && <DataList data ={blogData} type="publicBlog"/>}
                </div> 
            </div>
            <Footer />
        </div>
    )
}