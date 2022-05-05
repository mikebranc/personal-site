import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import '../editBlogDetail.css'

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
            <h1 className='nameHeading'>Michael Branconier</h1>
            <div className ="editBlogWrapper">
                <form onSubmit ={handleSubmit} className ="formWrapper">
                    <label>Post Name</label>
                    <input 
                        type="text"
                        name="postName"
                        value={blogData.postName}
                        onChange={handleChange}
                        className="postName"
                    />
                    <label>Post Body</label>
                    <span>All text is formatted with <a className ="markDownLink" href="https://www.markdownguide.org/basic-syntax/">markdown</a>
                    </span>
                    <textarea 
                        name="postBody"
                        value={blogData.postBody}
                        onChange={handleChange}
                        className="postBody"
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