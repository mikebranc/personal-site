import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import BlogAll from "./pages/BlogAll";
import BlogDetail from "./pages/BlogDetail";
import Login from './pages/Login';
import Edit from './pages/Edit';
import EditBlog from './pages/EditBlog';
import EditProject from './pages/EditProject';
import EditExperience from './pages/EditExperience';
import EditBlogDetail from './pages/EditBlogDetail';

//https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/blog' element={<BlogAll/>} />
          <Route path="/blog/:blogId" element={<BlogDetail/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path ="/edit" element ={<Edit />} />
          <Route path ="/edit/blog" element ={<EditBlog />} />
          <Route path ="/edit/project" element ={<EditProject />} />
          <Route path ="/edit/experience" element ={<EditExperience />} />
          <Route path = "/edit/blog/:blogId" element ={<EditBlogDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
