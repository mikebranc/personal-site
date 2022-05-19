import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../editDetail.css'
import {Link} from "react-router-dom";
import { addDoc, setDoc, collection,doc, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { getFirestoreDocument } from '../dbHelpers';

export default function(){
    const {blogId}  = useParams()
    const[loading, setLoading] = useState()
    const[currBlogId, setCurrBlogId] = useState(blogId)
    const [submitted, setSubmitted] = useState()

    const [blogData, setBlogData] = useState({
        title: '',
        body:'',
        slug:'',
        date:'',
        publishMedium:false,
        publishWebsite:false
    })
    const handleChange = (event)=>{
        const {name,value, type, checked} = event.target
        setBlogData(prevData=>{
            return {
                ...prevData, 
                [name] : type==="checkbox" ? checked : value
            }
        })
    }

    useEffect(() =>{
        setLoading(true)
        if(currBlogId !== "new") getFirestoreDocument(currBlogId, setBlogData, setLoading, "blog")
        //try using getFirestoreDocument function
        // const getBlog = async () => {
        //     try{
        //         const postRef = query(collection(firestore, "blog"), where("slug", "==", blogId))
        //         const postDocs = await getDocs(postRef)
        //         //Shows several results, but we should only have one entry for each slug. 
        //         //We will write rules to enforce this
        //         postDocs.forEach(post => setBlogData(post.data()))
        //         setLoading(false)
        //     }
        //     catch(error){
        //         throw error.message
        //     }
        // }
        // getBlog()
    },[])
 

    const handleSubmit = (event) =>{
        event.preventDefault()
        const updateBlog = async() =>{
            //will also need to upload blog post body as markdown
            if(currBlogId === "new"){
                //add try and catch
                let currDate = new Date()
                let day = currDate.getDate()
                let year = currDate.getFullYear()
                let month = currDate.getMonth()+1
                const formattedDate = [month,day,year].join("-")

                blogData.date = formattedDate
                const blogRef = await addDoc(collection(firestore, "blog"),blogData)

                console.log("Document written with ID: ", blogRef.id);
                setCurrBlogId(blogRef.id)
            }
            else{
                try{
                    const blogRef = await setDoc(doc(firestore, "blog",currBlogId),blogData)
                    console.log("Document Updated");
                }catch(error){
                    throw error.message
                }
            }   
            setSubmitted(new Date().toString())
        }
        updateBlog()
    }

    return(
        <div className="editOuter">
            <h1 className='nameHeading'>Michael Branconier</h1>
            <Link to={`/edit/blog/`} style={{color:'white'}}>Back to Blog</Link>
            <div className ="editWrapper">
                <form onSubmit ={handleSubmit} className ="formWrapper">
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
                    <label>Post Body</label>
                    <span>All text is formatted with <a className ="markDownLink" href="https://www.markdownguide.org/basic-syntax/">markdown</a>
                    </span>
                    <textarea 
                        name="body"
                        value={blogData.body}
                        onChange={handleChange}
                        className="formBody"
                    />
                    <span style={{fontWeight: "bold", marginBottom: '15px'}}>Where would you like to publish? </span>
                    <div className = "checkboxWrapper">
                        <input
                            type = "checkbox"
                            name="publishMedium"
                            value={blogData.publishMedium}
                            onChange={handleChange}
                        />
                        <label className="checkboxLabel" htmlfor="publishMedium">Medium</label>
                    </div>
                    <div className = "checkboxWrapper">
                        <input
                            type = "checkbox"
                            name="publishWebsite"
                            value={blogData.publishWebsite}
                            onChange={handleChange}
                        />
                        <label className="checkboxLabel" htmlfor="publishWebsite">Website</label>
                    </div>

                    {submitted && <span>Post Updated {submitted}</span>}
                    <button>Publish</button>
                </form>
            </div>

        </div>
        
    )
}
