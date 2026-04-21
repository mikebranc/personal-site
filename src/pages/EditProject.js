import { useEffect, useState } from "react";
import DataList from "../Components/DataList";
import { getFirestoreCollection, deleteFirestoreDocument } from "../dbHelpers";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import "../editSection.css";

export default function EditProject() {
  const [projData, setProjData] = useState();
  const [, setLoading] = useState(false);

  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) navigate("/");
  }, [user, loadingAuth, navigate]);

  useEffect(() => {
    setLoading(true);
    getFirestoreCollection("project", setProjData, setLoading);
  }, []);

  const handleDelete = (event, docId, type) => {
    event.preventDefault();
    setLoading(true);
    deleteFirestoreDocument(docId, setProjData, setLoading, type);
  };

  const sortedProjData = projData?.sort((a, b) => a.order - b.order);

  return (
    <div className="pageWrapper">
      <h1 className="nameHeading">Michael Branconier</h1>
      <div className="sectionWrapper">
        <DataList type="project" data={sortedProjData} deleteFunction={handleDelete} />
      </div>
    </div>
  );
}
