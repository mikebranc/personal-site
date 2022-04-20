import React from "react";

export default function SectionBlock(props){
    return(
        <div className="sectionBlock">
            <h1 className="sectionBlockHeading">{props.sectionName}</h1>
        </div>
    )
}