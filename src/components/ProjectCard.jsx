import { Link } from "react-router-dom";
import Media from "./Media";
import Tags from "./Tags";

export default function ProjectCard({ project, eager }) {
  const { slug, title, tags, cover, summary } = project;
  const href = `/work/${slug}`;

  return (
    <li className="work-row">
      <div className="work-row-grid">
        {/* Image links to the case study too. tabIndex/aria-hidden stop keyboard
            and screen reader users hitting the same link twice; the title is the main link. */}
        <Link to={href} className="work-row-image" tabIndex={-1} aria-hidden="true">
          <Media src={cover} alt="" ratio="16 / 9" eager={eager} />
        </Link>
        <div className="work-row-text">
          <h3 className="work-row-title">
            <Link to={href}>{title}</Link>
          </h3>
          <Tags tags={tags} className="work-row-tags" />
          {summary && <p className="work-row-summary">{summary}</p>}
        </div>
      </div>
    </li>
  );
}