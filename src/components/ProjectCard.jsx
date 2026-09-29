import { Link } from "react-router-dom";
import Media from "./Media";
import Tags from "./Tags";

export default function ProjectCard({ project, eager }) {
  const { slug, title, tags, cover, summary } = project;
  return (
    <li className="work-row">
      <div className="work-row-grid">
        {/* Fixed 16:9 so every row lines up. Change it here to change all rows. */}
        <Media src={cover} alt="" ratio="16 / 9" eager={eager} />
        <div className="work-row-text">
          <h3 className="work-row-title">
            <Link to={`/work/${slug}`}>{title}</Link>
          </h3>
          <Tags tags={tags} className="work-row-tags" />
          {summary && <p className="work-row-summary">{summary}</p>}
        </div>
      </div>
    </li>
  );
}