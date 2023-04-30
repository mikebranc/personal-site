import React from "react";

export default function SectionBlock(props){
    return(
        <div className="sectionBlock" style={props.open ? {backgroundColor: 'transparent', border: '2px solid #FAFAFA'} : {backgroundColor: '#FAFAFA'}}>
            <span> </span>
            <h1 className="sectionBlockHeading" style={props.open ? {color: '#FAFAFA'} : {}}>
                {props.sectionName}
                </h1>
            <h1 className="sectionBlockHeading" style={props.open ? {color: '#FAFAFA'} : {}}>
                {props.open ? '-' : '+'}
                </h1>
        </div>
    )
}