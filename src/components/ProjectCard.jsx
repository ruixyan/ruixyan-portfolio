import { Link } from "react-router-dom";
import Media from "./Media";

export default function ProjectCard({ project, eager }) {
  const { slug, title, year, tags, cover, ratio, size = "medium" } = project;
  return (
    <li className={`card card--${size}`}>
      <Link to={`/work/${slug}`} className="card-link">
        <Media src={cover} alt="" ratio={ratio} eager={eager} />
        <div className="card-meta">
          <h3 className="card-title">{title}</h3>
          <span className="card-year">{year}</span>
        </div>
        <p className="card-tags">{tags.join(", ")}</p>
      </Link>
    </li>
  );
}
