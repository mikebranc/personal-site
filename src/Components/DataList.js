import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import '../blogAll.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { firestore } from '../firebase/config'; // Import firestore
import { doc, updateDoc } from 'firebase/firestore'; // Import Firestore functions

export default function DataList(props){
    let { data, type, deleteFunction } = props
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        if (data) {
            setSortedData([...data].sort((a, b) => a.order - b.order));
        }
    }, [data]);

    const handleReorder = async (index, direction) => {
        const newData = [...sortedData];
        const item = newData[index];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex >= 0 && newIndex < newData.length) {
            newData.splice(index, 1);
            newData.splice(newIndex, 0, item);

            // Update order in Firestore
            for (let i = 0; i < newData.length; i++) {
                const docRef = doc(firestore, type, newData[i].id);
                await updateDoc(docRef, { order: i });
            }

            setSortedData(newData);
        }
    };

    const output = sortedData.map((entry, index) => {
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
            title = entry.name
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
                <Link to={`/blog/${slug}`} className="post" key={slug}>
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
            <div className="postEdit" key={entry.id}>
                <div className="postDiv">
                    <div className="postContent">
                        <h1 className="title">{title}</h1>
                        <h3>{subtitle}</h3>
                    </div>
                    <div className="actionButtons">
                        <Link to={`/edit/${type}/${entry.id}`}>
                            <EditIcon className="actionIcon" />
                        </Link>
                        <DeleteIcon className="actionIcon" onClick={(e) => deleteFunction(e, entry.id, type)} />
                        <ArrowUpwardIcon className="actionIcon" onClick={() => handleReorder(index, 'up')} />
                        <ArrowDownwardIcon className="actionIcon" onClick={() => handleReorder(index, 'down')} />
                    </div>
                </div>
            </div>
        )
    })

    return(
        <div className="dataListWrapper">
            {type !== "publicBlog" && 
            <div className="editSectionHeader">
                <Link to="/edit" style={{color:'white', marginBottom:'20px'}}>Back to Edit</Link>
                <Link to={`/edit/${type}/new`} style={{color:'white', marginBottom:'20px'}}>
                    <div className="newButton">New {type}</div>
                </Link>
            </div>}
            {output}
        </div>
    )
    
}