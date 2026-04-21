import github from "../images/github.png";
import Linkedin from "../images/Linkedin.png";
import Mail from "../images/Mail.png";
import Twitter from "../images/Twitter.png";
import "./Footer.css";

const LINKS = [
  { href: "https://github.com/mikebranc/", src: github, alt: "GitHub icon" },
  { href: "https://www.linkedin.com/in/mbranconier/", src: Linkedin, alt: "LinkedIn icon" },
  { href: "mailto:michaelbranconier@gmail.com", src: Mail, alt: "Mail icon" },
  { href: "https://twitter.com/mike_branc?", src: Twitter, alt: "Twitter icon" },
];

export default function Footer() {
  return (
    <div className="footerWrapper">
      <div className="footerLinkWrapper">
        {LINKS.map(({ href, src, alt }) => (
          <a key={href} className="footerLink" href={href} target="_blank" rel="noreferrer noopener">
            <img className="footerImg" src={src} alt={alt} />
          </a>
        ))}
      </div>
    </div>
  );
}
