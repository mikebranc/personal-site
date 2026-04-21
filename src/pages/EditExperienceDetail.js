import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { firestore, auth } from "../firebase/config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { getFirestoreDocument } from "../dbHelpers";
import { useAuthState } from "react-firebase-hooks/auth";
import "../editDetail.css";

export default function EditExperienceDetail() {
  const { experienceId } = useParams();
  const [currExperienceId, setCurrExperienceId] = useState(experienceId);
  const [, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState();
  const [experienceData, setExperienceData] = useState({
    position: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    seasonal: false,
  });

  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) navigate("/");
  }, [user, loadingAuth, navigate]);

  useEffect(() => {
    if (experienceId !== "new") {
      setLoading(true);
      getFirestoreDocument(currExperienceId, setExperienceData, setLoading, "experience");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experienceId]);

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setExperienceData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const description =
      experienceData.description !== "" ? experienceData.description.split(";") : [];
    try {
      if (currExperienceId === "new") {
        const expRef = await addDoc(collection(firestore, "experience"), {
          ...experienceData,
          description,
        });
        setCurrExperienceId(expRef.id);
      } else {
        await setDoc(doc(firestore, "experience", currExperienceId), {
          ...experienceData,
          description,
        });
      }
      setSubmitted(new Date().toString());
    } catch (error) {
      throw error.message;
    }
  };

  return (
    <div className="editOuter">
      <h1 className="nameHeading">Michael Branconier</h1>
      <Link to="/edit/experience/" className="backLink">
        Back to Experience
      </Link>
      <div className="editWrapper">
        <form onSubmit={handleSubmit} className="formWrapper">
          <label>Job Position</label>
          <input
            type="text"
            name="position"
            onChange={handleChange}
            value={experienceData.position}
            className="formInputFull"
          />
          <div className="formHalfWrapper">
            <div className="formBlockWrapper">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                onChange={handleChange}
                value={experienceData.company}
                className="formInputHalf"
              />
            </div>
            <div className="formBlockWrapper">
              <label>Location</label>
              <input
                type="text"
                name="location"
                onChange={handleChange}
                value={experienceData.location}
                className="formInputHalf"
              />
            </div>
          </div>
          <div className="formHalfWrapper">
            <div className="formBlockWrapper">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                value={experienceData.startDate}
                className="formInputHalf"
              />
            </div>
            <div className="formBlockWrapper">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                value={experienceData.endDate}
                className="formInputHalf"
              />
            </div>
          </div>
          <label>Seasonal</label>
          <input
            type="checkbox"
            name="seasonal"
            onChange={handleChange}
            checked={experienceData.seasonal}
            className="formInputHalf"
          />
          <label>Job Description (bullets separated by semicolon)</label>
          <textarea
            name="description"
            value={experienceData.description}
            onChange={handleChange}
            className="formBody"
          />
          {submitted && <span>Submitted {submitted}</span>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
