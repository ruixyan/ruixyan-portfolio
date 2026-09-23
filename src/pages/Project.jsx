import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import Media from "../components/Media";
import NotFound from "./NotFound";
import useTitle from "../hooks/useTitle";

export default function Project() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  useTitle(project?.title);
  if (!project) return <NotFound />;

  const next = projects[(index + 1) % projects.length];
  const { title, year, tags, role, tools, summary, body, images, ratio } = project;

  return (
    <article className="project">
      <header className="project-header">
        <h1 className="project-title">{title}</h1>
        <p className="project-summary">{summary}</p>
      </header>

      <div className="project-info">
        <dl className="project-facts">
          <div><dt>Year</dt><dd>{year}</dd></div>
          {role && <div><dt>Role</dt><dd>{role}</dd></div>}
          {tools && <div><dt>Tools</dt><dd>{tools}</dd></div>}
          <div><dt>Type</dt><dd>{tags.join(", ")}</dd></div>
        </dl>
        <div className="project-body">
          {body.map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </div>

      <div className="project-images">
        {images.map((src, i) => (
          <Media key={i} src={src} alt={`${title}, image ${i + 1}`} ratio={ratio} eager={i === 0} />
        ))}
      </div>

      {projects.length > 1 && (
        <nav className="project-next" aria-label="Next project">
          <span>Next project</span>
          <Link to={`/work/${next.slug}`}>{next.title}</Link>
        </nav>
      )}
    </article>
  );
}
