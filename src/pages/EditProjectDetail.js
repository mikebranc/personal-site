import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { firestore, auth } from "../firebase/config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { getFirestoreDocument } from "../dbHelpers";
import { useAuthState } from "react-firebase-hooks/auth";
import { FormControlLabel, Switch } from "@mui/material";
import "../editDetail.css";

export default function EditProjectDetail() {
  const { projectId } = useParams();
  const [submitted, setSubmitted] = useState();
  const [currProjId, setCurrProjId] = useState(projectId);
  const [, setLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    link: "",
    githubLink: "",
    skills: [],
    hidden: false,
    updatedAt: new Date(),
  });

  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) navigate("/");
  }, [user, loadingAuth, navigate]);

  useEffect(() => {
    setLoading(true);
    if (currProjId !== "new") getFirestoreDocument(currProjId, setProjectData, setLoading, "project");
  }, [currProjId]);

  const handleChange = ({ target: { name, value } }) => {
    setProjectData((prev) => ({
      ...prev,
      [name]: name === "skills" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (currProjId === "new") {
        const projRef = await addDoc(collection(firestore, "project"), projectData);
        setCurrProjId(projRef.id);
      } else {
        await setDoc(doc(firestore, "project", currProjId), projectData);
      }
      setSubmitted(new Date().toString());
    } catch (error) {
      throw error.message;
    }
  };

  return (
    <div className="editOuter">
      <h1 className="nameHeading">Michael Branconier</h1>
      <Link to="/edit/project/" className="backLink">
        Back to Projects
      </Link>
      <div className="editWrapper">
        <form onSubmit={handleSubmit} className="formWrapper">
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={projectData.name}
            className="formInputFull"
          />
          <label>Project Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={projectData.description}
            className="formInputFull"
            placeholder="Keep brief"
          />
          <label>Project Link</label>
          <input
            type="text"
            name="link"
            onChange={handleChange}
            value={projectData.link}
            className="formInputFull"
          />
          <label>Github Link</label>
          <input
            type="text"
            name="githubLink"
            onChange={handleChange}
            value={projectData.githubLink}
            className="formInputFull"
          />
          <label>Tags</label>
          <input
            type="text"
            name="skills"
            onChange={handleChange}
            value={projectData.skills}
            className="formInputFull"
          />
          <FormControlLabel
            control={
              <Switch
                checked={projectData.hidden || false}
                onChange={(e) => setProjectData((prev) => ({ ...prev, hidden: e.target.checked }))}
                name="hidden"
              />
            }
            label="Hidden"
          />
          {submitted && <span>Updated {submitted}</span>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
