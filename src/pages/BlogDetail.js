import React, {useState} from "react"
import {useParams} from "react-router-dom"
import Navbar from "../Components/Navbar"
import ReactMarkdown from "react-markdown"
import '../blogDetail.css'
import Footer from "../Components/Footer/Footer"




export default function BlogDetail(){
    const {blogId} = useParams()
    const blogData = 
    {title: "My Fake Blog Post",
    date:"4-20-22",
    body:`
One reason programmers dislike meetings so much is that they're on a different type of schedule from other people. Meetings cost them more.

There are two types of schedule, which I'll call the manager's schedule and the maker's schedule. The manager's schedule is for bosses. It's embodied in the traditional appointment book, with each day cut into one hour intervals. You can block off several hours for a single task if you need to, but by default you change what you're doing every hour.

## Subheading
When you use time that way, it's merely a practical problem to meet with someone. Find an open slot in your schedule, book them, and you're done.

Most powerful people are on the manager's schedule. It's the schedule of command. But there's another way of using time that's common among people who make things, like programmers and writers. They generally prefer to use time in units of half a day at least. You can't write or program well in units of an hour. That's barely enough time to get started.

When you're operating on the maker's schedule, meetings are a disaster. A single meeting can blow a whole afternoon, by breaking it into two pieces each too small to do anything hard in. Plus you have to remember to go to the meeting. That's no problem for someone on the manager's schedule. There's always something coming on the next hour; the only question is what. But when someone on the maker's schedule has a meeting, they have to think about it.

For someone on the maker's schedule, having a meeting is like throwing an exception. It doesn't merely cause you to switch from one task to another; it changes the mode in which you work. `,
    }
    const [blog, setBlog] = useState(blogData)

    return(
        <div>
            <Navbar />
            <div className="blogPostWrapperOuter"> 
                <div className="blogPostWrapperInner">
                    <h1 className="blogDetailHeading">{blog.title}</h1>
                    <span className="blogDetailDate">{blog.date}</span>
                    <p className="blogDetailBody">
                        <ReactMarkdown children={blog.body}/>
                    </p>
                    <div className="divider"></div>
                    <a href="https://medium.com/@michaelbranconier" >
                        <button className="mediumButton">Read on Medium</button>
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    )
}
