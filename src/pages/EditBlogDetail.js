import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

export default function(){
    const {blogId}  = useParams()

    const [blogData, setBlogData] = useState({
        postName: '',
        postBody:'',
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
        <div>
            <form onSubmit ={handleSubmit}>
                <label>Post Name</label>
                <input 
                    type="text"
                    name="postName"
                    value={blogData.postName}
                    onChange={handleChange}
                />
                <label>Post Body</label>
                <textarea 
                    name="postBody"
                    value={blogData.postBody}
                    onChange={handleChange}
                
                />
                <input
                    type = "checkbox"
                    name="publishMedium"
                    value={blogData.publishMedium}
                    onChange={handleChange}
                />
                <label htmlfor="publishMedium">Medium</label>
                <input
                    type = "checkbox"
                    name="publishWebsite"
                    value={blogData.publishWebsite}
                    onChange={handleChange}
                />
                <label htmlfor="publishWebsite">Website</label>

                <button>Publish</button>
            </form>
        </div>
    )
}