import React, {useState, useEffect} from 'react'
import DataList from '../Components/DataList'
import "../editSection.css"
import { getFirestoreCollection,deleteFirestoreDocument } from '../dbHelpers'

export default function EditExperience(){
    const [expData, setExpData] = useState()
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        //imported function to call DB
        getFirestoreCollection("experience", setExpData, setLoading)
      }, [])
    
    const handleDelete = (event, docId,type) =>{
        event.preventDefault()
        setLoading(true)
        deleteFirestoreDocument(docId, setExpData, setLoading, type)
    }
return(
    <div className = "pageWrapper">
        <h1 className = "nameHeading">Michael Branconier</h1>
        <div className="sectionWrapper">
            <DataList type={"experience"} data ={expData} deleteFunction = {handleDelete}/>
        </div>
    </div>
)
}