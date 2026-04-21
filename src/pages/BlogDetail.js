import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { collection, query, getDocs, where } from "firebase/firestore";
import { firestore } from "../firebase/config";
import "./Home.css";
import "../blogDetail.css";

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.58C20.56 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11-.001-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export default function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const postRef = query(
          collection(firestore, "blog"),
          where("slug", "==", blogId)
        );
        const postDocs = await getDocs(postRef);
        postDocs.forEach((doc) => setBlog(doc.data()));
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };
    getBlog();
  }, [blogId]);

  return (
    <div className="mn-root">
      <div className="mn-wrap">
        <nav className="mn-nav">
          <Link to="/" className="mn-brand">
            <span className="mn-brand-dot" />
            MB
          </Link>
          <div className="links">
            <Link to="/blog" className="">Blog</Link>
            <a
              href="https://summitandshark.com/?utm_source=personal-site&utm_medium=navigation&utm_campaign=consulting-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consulting
            </a>
          </div>
        </nav>

        {loading && <p className="mn-p">Loading...</p>}
        {!loading && !blog && <p className="mn-p">Post not found.</p>}
        {blog && (
          <article className="blog-article">
            <Link to="/blog" className="blog-back">
              ← All posts
            </Link>
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-date">{blog.date}</div>
            <div className="blog-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {blog.body}
              </ReactMarkdown>
            </div>
          </article>
        )}

        <footer className="mn-footer">
          <div className="mn-footer-left">
            Reach out: <strong>michaelbranconier@gmail.com</strong>
          </div>
          <div className="mn-socials">
            <a href="https://github.com/mikebranc/" target="_blank" rel="noopener noreferrer">
              <GithubIcon />
            </a>
            <a href="https://www.linkedin.com/in/mbranconier/" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon />
            </a>
            <a href="https://twitter.com/mike_branc" target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </a>
            <a href="mailto:michaelbranconier@gmail.com">
              <MailIcon />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
