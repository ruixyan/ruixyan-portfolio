import { Link } from "react-router-dom";
import Media from "./Media";

export default function ProjectCard({ project, eager }) {
  const { slug, title, tags, cover, summary } = project;
  return (
    <li className="work-row">
      <Link to={`/work/${slug}`} className="work-row-link">
        {/* Fixed 16:9 so every row lines up. Change it here to change all rows. */}
        <Media src={cover} alt="" ratio="16 / 9" eager={eager} />
        <div className="work-row-text">
          <h3 className="work-row-title">{title}</h3>
          <p className="work-row-tags">{tags.join(", ")}</p>
          {summary && <p className="work-row-summary">{summary}</p>}
        </div>
      </Link>
    </li>
  );
}