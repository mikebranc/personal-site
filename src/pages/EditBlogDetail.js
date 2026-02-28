import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../editDetail.css'
import {Link, useNavigate} from "react-router-dom";
import { addDoc, setDoc, collection, doc } from 'firebase/firestore';
import { firestore, auth } from '../firebase/config';
import { getFirestoreDocument } from '../dbHelpers';
import { useAuthState } from "react-firebase-hooks/auth";

function formatDate(date) {
    const d = new Date(date)
    return [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("-")
}

export default function EditBlogDetail(){
    const {blogId}  = useParams()
    const [loading, setLoading] = useState()
    const [currBlogId, setCurrBlogId] = useState(blogId)
    const [submitted, setSubmitted] = useState()

    const isNew = currBlogId === "new"

    const [blogData, setBlogData] = useState({
        title: '',
        body:'',
        slug:'',
        date: formatDate(new Date()),
        publishMedium:false,
        publishWebsite:false,
        order: 0
    })

    const handleChange = (event)=>{
        const {name, value, type, checked} = event.target
        setBlogData(prevData=>{
            return {
                ...prevData,
                [name] : type==="checkbox" ? checked : value
            }
        })
    }

    const [user, loadingAuth] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (loadingAuth) return;
        if (!user) return navigate("/");
    }, [user, loadingAuth, navigate]);

    useEffect(() =>{
        if(!isNew){
            setLoading(true)
            getFirestoreDocument(currBlogId, setBlogData, setLoading, "blog")
        }
    },[currBlogId, isNew])

    const handleSubmit = (event) =>{
        event.preventDefault()
        const updateBlog = async() =>{
            if(isNew){
                const newData = {
                    ...blogData,
                    date: blogData.date || formatDate(new Date())
                }
                try{
                    const blogRef = await addDoc(collection(firestore, "blog"), newData)
                    setCurrBlogId(blogRef.id)
                    setSubmitted(new Date().toString())
                }catch(error){
                    console.error(error.message)
                }
            }
            else{
                try{
                    await setDoc(doc(firestore, "blog", currBlogId), blogData)
                    setSubmitted(new Date().toString())
                }catch(error){
                    console.error(error.message)
                }
            }
        }
        updateBlog()
    }

    return(
        <div className="editOuter">
            <h1 className='nameHeading'>Michael Branconier</h1>
            <Link to="/edit/blog/" style={{color:'white'}}>Back to Blog</Link>
            <div className ="editWrapper">
                <form onSubmit={handleSubmit} className ="formWrapper">
                    <label>Post Name</label>
                    <input
                        type="text"
                        name="title"
                        value={blogData.title}
                        onChange={handleChange}
                        className="formInputFull"
                    />
                    <label>Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={blogData.slug}
                        onChange={handleChange}
                        className="formInputFull"
                    />
                    <label>Date</label>
                    <input
                        type="text"
                        name="date"
                        value={blogData.date}
                        onChange={handleChange}
                        className="formInputFull"
                        placeholder="M-D-YYYY"
                    />
                    <label>Post Body</label>
                    <span>All text is formatted with <a className="markDownLink" href="https://www.markdownguide.org/basic-syntax/">markdown</a>
                    </span>
                    <textarea
                        name="body"
                        value={blogData.body}
                        onChange={handleChange}
                        className="formBody"
                    />
                    <div className="checkboxWrapper">
                        <input
                            type="checkbox"
                            name="publishWebsite"
                            checked={!!blogData.publishWebsite}
                            onChange={handleChange}
                        />
                        <label className="checkboxLabel" htmlFor="publishWebsite">Publish to Website</label>
                    </div>

                    {submitted && <span>Post Updated {submitted}</span>}
                    <button>{isNew ? "Create Post" : "Update Post"}</button>
                </form>
            </div>
        </div>
    )
}
