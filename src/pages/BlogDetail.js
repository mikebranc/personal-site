import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Footer from "../Components/Footer/Footer";
import { collection, query, getDocs, where } from "firebase/firestore";
import { firestore } from "../firebase/config";
import "../blogDetail.css";

export default function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const postRef = query(collection(firestore, "blog"), where("slug", "==", blogId));
        const postDocs = await getDocs(postRef);
        postDocs.forEach((doc) => setBlog(doc.data()));
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, [blogId]);

  return (
    <div>
      <Navbar />
      {loading && (
        <div className="blogPostWrapperOuter">
          <p>Loading...</p>
        </div>
      )}
      {!loading && !blog && (
        <div className="blogPostWrapperOuter">
          <p>Post not found.</p>
        </div>
      )}
      {blog && (
        <div className="blogPostWrapperOuter">
          <div className="blogPostWrapperInner">
            <h1 className="blogDetailHeading">{blog.title}</h1>
            <span className="blogDetailDate">{blog.date}</span>
            <div className="blogDetailBody">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.body}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
