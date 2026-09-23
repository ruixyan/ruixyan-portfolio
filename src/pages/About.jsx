import { site } from "../data/site";
import Media from "../components/Media";
import useTitle from "../hooks/useTitle";

export default function About() {
  useTitle("About");
  return (
    <div className="about">
      <div className="about-text">
        <h1 className="page-title">About</h1>
        {site.about.map((para, i) => <p key={i}>{para}</p>)}

        <h2 className="section-heading">Experience and education</h2>
        <ul className="cv-list">
          {site.experience.map((item) => (
            <li key={item.title}>
              <span>{item.title}</span>
              <span className="cv-years">{item.years}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="about-image">
        <Media src={site.portrait} alt={`Portrait of ${site.name}`} ratio="3 / 4" />
      </div>
    </div>
  );
}
