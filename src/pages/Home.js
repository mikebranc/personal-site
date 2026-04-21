import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import headshot from "../Components/images/headshot.jpg";
import { getFirestoreCollection } from "../dbHelpers";
import "./Home.css";

const GALILEO_URL = "https://galileo.ai";
const SUMMIT_AND_SHARK_URL = "https://summitandshark.com/";
const COMP_CRUNCH_URL =
  "https://chrome.google.com/webstore/detail/comp-crunch-analyze-zillo/pfmjlnebociiohfhlpckomcmnajdonjp/";
const THE_STORY_OF_US_URL = "https://thestoryofus.love/";

function ChevronIcon({ className }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

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

function Section({ num, title, open, onToggle, children }) {
  return (
    <section className="mn-section">
      <button
        className="mn-sec-btn"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="mn-sec-num">{num}</span>
        <span className="mn-sec-title">{title}</span>
        <ChevronIcon className={"mn-sec-chev" + (open ? " open" : "")} />
      </button>
      <div className={"mn-sec-body " + (open ? "open" : "closed")}>
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const [open, setOpen] = useState({ about: true, experience: false, projects: false, education: false });
  const [expData, setExpData] = useState();
  const [projData, setProjData] = useState();

  useEffect(() => {
    getFirestoreCollection("experience", setExpData, () => {});
    getFirestoreCollection("project", setProjData, () => {});
  }, []);

  const toggle = (k) => setOpen((s) => ({ ...s, [k]: !s[k] }));

  const sortedExp = expData?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  const sortedProj = projData
    ?.filter((p) => !p.hidden)
    ?.sort((a, b) => a.order - b.order);

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

        <header className="mn-hero">
          <div className="mn-hero-row">
            <img src={headshot} alt="Michael Branconier" className="mn-portrait" />
            <div className="mn-hero-meta">
              <div>Michael Branconier · Madison, WI · Forward Deployed Engineer</div>
            </div>
          </div>
          <h1 className="mn-headline">
            Forward Deployed Engineer building{" "}
            <span className="accent">production-ready AI systems.</span>
          </h1>
          <p className="mn-sub">
            Forward Deployed Engineer at{" "}
            <a href={GALILEO_URL} target="_blank" rel="noopener noreferrer">
              Galileo
            </a>
            , working with Fortune 100 teams on LLM evaluation, guardrails,
            and reliability. Previously scaled a real estate brokerage to $100M+
            in transaction volume.
          </p>
        </header>

        <Section num="01" title="About" open={open.about} onToggle={() => toggle("about")}>
          <p className="mn-lede">
            I'm a Forward Deployed Engineer building production-ready AI systems.
          </p>
          <p className="mn-p">
            I'm currently a Forward Deployed Engineer at{" "}
            <a href={GALILEO_URL} target="_blank" rel="noopener noreferrer" className="mn-link">
              Galileo
            </a>
            , where I work directly with Fortune 100 customers to design,
            evaluate, and deploy LLM applications in production. My work spans
            LLM guardrails, evaluation pipelines, monitoring, and cost control,
            with a focus on reliability and real world impact.
          </p>
          <p className="mn-p">
            Before moving into tech full time, I worked in real estate
            operations, where I helped scale a boutique brokerage to over $100M
            in transaction volume. That experience sparked a long term interest
            in real estate and shaped how I think about building software for
            operational teams.
          </p>
          <p className="mn-p">
            Outside of work, I focus on real estate technology, which is why I
            started{" "}
            <a href={SUMMIT_AND_SHARK_URL} target="_blank" rel="noopener noreferrer" className="mn-link">
              Summit &amp; Shark, LLC
            </a>
            . Through Summit &amp; Shark, I've built a production AI leasing
            chatbot for real estate clients and a{" "}
            <a href={COMP_CRUNCH_URL} target="_blank" rel="noopener noreferrer" className="mn-link">
              Chrome extension for analyzing Zillow data
            </a>
            &nbsp;that's now used by hundreds of users.
          </p>
          <p className="mn-p">
            While I spend most of my time building reliable, end-to-end systems,
            I'm also a GenAI nerd and enjoy experimenting with creative ideas
            such as this{" "}
            <a href={THE_STORY_OF_US_URL} target="_blank" rel="noopener noreferrer" className="mn-link">
              AI-powered poem generator for couples
            </a>
            .
          </p>
          <p className="mn-p">
            Outside of tech, I enjoy hiking, camping, spending time with my
            family, reading, and training.
          </p>
          <p className="mn-p">
            If you're building AI for real world workflows, especially in real
            estate, I'd love to connect!
          </p>
        </Section>

        <Section num="02" title="Experience" open={open.experience} onToggle={() => toggle("experience")}>
          <div className="mn-timeline">
            {sortedExp?.map((job) => (
              <div key={job.id} className="mn-job">
                <div className="mn-job-date">
                  {moment(job.startDate).format("MMM YYYY").toUpperCase()}
                  <br />
                  {job.endDate
                    ? moment(job.endDate).format("MMM YYYY").toUpperCase()
                    : "PRESENT"}
                </div>
                <div>
                  <div className="mn-job-pos">{job.position}</div>
                  <div className="mn-job-co">
                    {job.company}
                    <span className="loc">
                      {job.location}
                      {job.seasonal ? " · seasonal" : ""}
                    </span>
                  </div>
                  <ul className="mn-job-desc">
                    {job.description.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section num="03" title="Projects" open={open.projects} onToggle={() => toggle("projects")}>
          <div className="mn-proj-list">
            {sortedProj?.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mn-proj"
              >
                <div>
                  <div className="mn-proj-name">{project.name}</div>
                  <div className="mn-proj-desc">{project.description}</div>
                  <div className="mn-proj-skills">
                    {project.skills.map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className="mn-proj-right">
                  {project.year && (
                    <div className="mn-proj-year">{project.year}</div>
                  )}
                  <div className="mn-proj-arrow">
                    <ArrowIcon />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Section>

        <Section num="04" title="Education" open={open.education} onToggle={() => toggle("education")}>
          <h3 className="mn-edu-school">Loyola Marymount University</h3>
          <div className="mn-edu-meta">Los Angeles, CA · May 2021</div>
          <div className="mn-edu-degree">B.B.A. in Applied Information Management Systems</div>
          <div className="mn-edu-degree minor">Minor in Computer Science</div>
          <div className="mn-edu-honor">Magna Cum Laude · GPA 3.89</div>
          <div className="mn-edu-awards-title">Awards</div>
          <ul className="mn-edu-awards">
            <li>LMU Arrupe Scholar</li>
            <li>Heron CBA Scholar</li>
            <li>John B. &amp; Nelly Llanos Kilroy Endowed Scholar</li>
            <li>LMU Hackathon: Mozilla State of the Internet Award</li>
          </ul>
        </Section>

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
