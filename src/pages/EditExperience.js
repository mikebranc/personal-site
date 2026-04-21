import { useState, useEffect } from "react";
import DataList from "../Components/DataList";
import { getFirestoreCollection, deleteFirestoreDocument } from "../dbHelpers";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import "../editSection.css";

export default function EditExperience() {
  const [expData, setExpData] = useState();
  const [, setLoading] = useState(false);

  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) navigate("/");
  }, [user, loadingAuth, navigate]);

  useEffect(() => {
    setLoading(true);
    getFirestoreCollection("experience", setExpData, setLoading);
  }, []);

  const handleDelete = (event, docId, type) => {
    event.preventDefault();
    setLoading(true);
    deleteFirestoreDocument(docId, setExpData, setLoading, type);
  };

  const sortedExpData = expData?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <div className="pageWrapper">
      <h1 className="nameHeading">Michael Branconier</h1>
      <div className="sectionWrapper">
        <DataList type="experience" data={sortedExpData} deleteFunction={handleDelete} />
      </div>
    </div>
  );
}
