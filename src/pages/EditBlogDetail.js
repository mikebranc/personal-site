import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import '../editDetail.css'
import {Link} from "react-router-dom";

export default function(){
    const {blogId}  = useParams()

    const [blogData, setBlogData] = useState({
        postName: '',
        postBody:'',
        slug:'',
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
    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(blogData)
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
                        name="postName"
                        value={blogData.postName}
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
                        name="postBody"
                        value={blogData.postBody}
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


                    <button>Publish</button>
                </form>
            </div>

        </div>
        
    )
}
