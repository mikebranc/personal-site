import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import "../edit.css";

export default function Edit() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div className="pageWrapper">
      <h1 className="heading">Michael Branconier</h1>
      <div className="editPageWrapper">
        <h3>What would you like to edit?</h3>
        <div className="linkWrapper">
          <Link to="/edit/blog">
            <button className="editButton">Blog</button>
          </Link>
          <Link to="/edit/experience">
            <button className="editButton">Experience</button>
          </Link>
          <Link to="/edit/project">
            <button className="editButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
