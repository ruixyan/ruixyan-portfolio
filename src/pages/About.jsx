import { site } from "../data/site";
import Media from "../components/Media";
import useTitle from "../hooks/useTitle";

export default function About() {
  useTitle("About");
  const [lead, ...rest] = site.about;

  return (
    <div className="about">
      <header className="about-intro">
        <h1 className="about-greeting">{site.greeting}</h1>
        {lead && <p className="about-lead">{lead}</p>}
      </header>

      <div className="about-portrait">
        <Media src={site.portrait} alt={`Portrait of ${site.name}`} ratio="4 / 5" />
      </div>

      <div className="about-body">
        {rest.map((para, i) => <p key={i}>{para}</p>)}
      </div>

      <section className="about-cv" aria-labelledby="cv-heading">
        <div className="about-cv-label">
          <h2 id="cv-heading" className="about-cv-heading">Experience and education</h2>
          {site.resume && (
            <a className="about-resume" href={site.resume} download>
              Download résumé (PDF)
            </a>
          )}
        </div>
        <ul className="cv-list">
          {site.experience.map((item) => (
            <li key={item.title}>
              <span>{item.title}</span>
              <span className="cv-years">{item.years}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}