import { useState } from "react";
import SectionBlock from "../SectionBlock";
import "./About.css";
import headshot from "../images/headshot.jpg";

const THE_STORY_OF_US_URL = "https://thestoryofus.love/";
const COMP_CRUNCH_URL =
  "https://chrome.google.com/webstore/detail/comp-crunch-analyze-zillo/pfmjlnebociiohfhlpckomcmnajdonjp/";
const GALILEO_URL = "https://galileo.ai";
const SUMMIT_AND_SHARK_URL = "https://summitandshark.com/";

export default function About() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div>
      <div
        onClick={() => setShowAbout((prev) => !prev)}
        className="sectionBlockWrapper"
      >
        <SectionBlock sectionName="ABOUT" open={showAbout} />
      </div>
      {showAbout && (
        <div className="aboutContentWrapper">
          <div className="aboutPhotoCol">
            <img alt="profilePhoto" className="profilePhoto" src={headshot} />
          </div>
          <div className="aboutTextCol">
            <h3 className="welcomeMessage">
              Hi, I'm Michael Branconier, a full-stack engineer building
              production ready AI systems.
            </h3>
            <p className="aboutText">
              I'm currently a Forward Deployed Engineer at&nbsp;
              <a
                href={GALILEO_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="aboutLink"
              >
                Galileo
              </a>
              , where I work directly with Fortune 100 customers to design,
              evaluate, and deploy LLM applications in production. My work spans
              LLM guardrails, evaluation pipelines, monitoring, and cost
              control, with a focus on reliability and real world impact.
              <br />
              <br />
              Before moving into tech full time, I worked in real estate
              operations, where I helped scale a boutique brokerage to over
              $100M in transaction volume. That experience sparked a long term
              interest in real estate and shaped how I think about building
              software for operational teams.
              <br />
              <br />
              Outside of work, I focus on real estate technology, which is why I
              started&nbsp;
              <a
                href={SUMMIT_AND_SHARK_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="aboutLink"
              >
                Summit & Shark, LLC
              </a>
              . Through Summit & Shark, I've built a production AI leasing
              chatbot for real estate clients and a&nbsp;
              <a
                href={COMP_CRUNCH_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="aboutLink"
              >
                Chrome extension for analyzing Zillow data
              </a>
              &nbsp;that's now used by hundreds of users.
              <br />
              <br />
              While I spend most of my time building reliable, end-to-end
              systems, I'm also a GenAI nerd and enjoy experimenting with
              creative ideas such as this&nbsp;
              <a
                href={THE_STORY_OF_US_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="aboutLink"
              >
                AI-powered poem generator for couples
              </a>
              .
              <br />
              <br />
              Outside of tech, I enjoy hiking, camping, spending time with my
              family, reading, and training.
              <br />
              <br />
              If you're building AI for real world workflows, especially in real
              estate, I'd love to connect!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
