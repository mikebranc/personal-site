import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home"
import BlogAll from "./pages/BlogAll"
import BlogDetail from "./pages/BlogDetail"



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/blog' element={<BlogAll/>}>
            <Route path=":blogId" element={<BlogDetail/>}  />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
