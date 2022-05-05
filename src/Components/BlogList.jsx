import React from "react"
import dummyBlogData from "../dummyBlogData";
import {Link} from "react-router-dom";
import '../blogAll.css';
import trashCan from './images/trashCan.png';
import editPencil from './images/editPencil.png'

export default function BlogList(props){
    let {edit} = props
    const blogs = dummyBlogData.map(blog =>{
        if(edit){
            return(           
                <Link to={`/edit/blog/${blog.slug}`} className="postEdit">
                    <div className="postDiv">
                        <div>
                            <h1>{blog.title}</h1>
                            <h3>{blog.date}</h3>
                        </div>
                        <div className="delEditWrapper">
                            <img className = "delEditIcon" src={editPencil} alt="edit button"/>
                            <Link to={`/delete/blog/${blog.slug}`}> 
                            {/* Using this as placeholder for delete functionality */}
                                <img className = "delEditIcon" src={trashCan} alt="delete button"/>
                            </Link>
                        </div>
                    </div>
                </Link>
            )
        }
        return(           
            <Link to={`/blog/${blog.slug}`} className="post">
                <div className="postDiv">
                    <div>
                        <h1>{blog.title}</h1>
                        <h3>{blog.date}</h3>
                    </div>
                </div>
            </Link>
        )

    })
    return(
        <>
        {blogs}
        </>
    )
    
}