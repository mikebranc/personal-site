import React from "react"
import {Link} from "react-router-dom";
import '../blogAll.css';
import trashCan from './images/trashCan.png';
import editPencil from './images/editPencil.png'

export default function DataList(props){
    //type tells us if this is a blog, expereince, post, publicBlog 
    //all types are interenal edit displays except for publicBlog
    //edit is used only 
    let { data, type} = props

    const output = data.map(entry =>{
        //Blog post also feeds to main blog page
        let title = ""
        let subtitle = null
        let slug = ""

        if(type==="blog" || type==="publicBlog"){
            title = entry.title
            subtitle = entry.date
            slug = entry.slug
        }
        else if(type==="project"){
            title = entry.projectName
            slug = entry.id

        }
        else if(type==="experience"){
            title = entry.position
            subtitle = entry.company
            slug = entry.id
        }
        //the only instance in which we don't want to edit, feeds to public blog page

        if(type==="publicBlog"){
            return(           
                <Link to={`/blog/${slug}`} className="post" key = {slug}>
                    <div className="postDiv">
                        <div>
                            <h1 className="title">{title}</h1>
                            <h3>{subtitle && subtitle}</h3>
                        </div>
                    </div>
                </Link>
            )
        }
        //all other instances are edit instances and redirect to their respective edit page
        return(           
            <Link to={`/edit/${type}/${slug}`} className="postEdit" key = {slug}>
                <div className="postDiv">
                    <div>
                        <h1 className="title">{title}</h1>
                        <h3>{subtitle}</h3>
                    </div>
                    <div className="delEditWrapper">
                        <img className = "delEditIcon" src={editPencil} alt="edit button"/>
                        <Link to={`/delete/${type}/${slug}`}> 
                        {/* Using this as placeholder for delete functionality */}
                            <img className = "delEditIcon" src={trashCan} alt="delete button"/>
                        </Link>
                    </div>
                </div>
            </Link>
        )
    })
    return(
        <>
        <div className = "editSectionHeader">
            <Link to ="/edit" style={{color:'white', marginBottom:'20px'}}>Back to Edit</Link>
            <Link to = {`/edit/${type}/new`} style={{color:'white', marginBottom:'20px'}}>
                <div className ="newButton" >New {type}</div>
            </Link>
        </div>
        {output}
        </>
    )
    
}