export default function SectionBlock({ sectionName, open }) {
  return (
    <div className={`sectionBlock ${open ? "sectionBlock--open" : "sectionBlock--closed"}`}>
      <span> </span>
      <h1 className="sectionBlockHeading">{sectionName}</h1>
      <h1 className="sectionBlockHeading">{open ? "-" : "+"}</h1>
    </div>
  );
}
