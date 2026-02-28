import React, {useState, useEffect} from "react"
import Navbar from "../Components/Navbar";
import '../blogAll.css'
import Footer from "../Components/Footer/Footer";
import DataList from "../Components/DataList";
import { getFirestoreCollection } from "../dbHelpers";


export default function BlogAll(){
    const [blogData, setBlogData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getFirestoreCollection("blog", setBlogData, setLoading)
    }, [])

    const publishedPosts = blogData
        ? blogData.filter(post => post.publishWebsite)
        : []

    return(
        <div>
            <Navbar />
            <div className="postsWrapperOuter">
                <div className="postsWrapperInner">
                    {loading && <p>Loading...</p>}
                    {!loading && publishedPosts.length === 0 && <p>No posts yet.</p>}
                    {!loading && publishedPosts.length > 0 && <DataList data={publishedPosts} type="publicBlog"/>}
                </div> 
            </div>
            <Footer />
        </div>
    )
}
