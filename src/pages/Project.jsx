import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import Media from "../components/Media";
import NotFound from "./NotFound";
import useTitle from "../hooks/useTitle";

// Turns a normal YouTube/Vimeo link into an embeddable one
function toEmbedUrl(url) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return url;
}

// One piece of a case study. Add a new layout by adding a new `case`.
function Block({ block, title, ratio }) {
  switch (block.type) {
    case "heading":
      return <h2 className="block-heading">{block.content}</h2>;

    case "text":
      return <p className="block-text">{block.content}</p>;

    case "image":
      return (
        <figure className={`block-image${block.wide === false ? " block-image--inset" : ""}`}>
          <Media src={block.src} alt={block.alt || title} ratio={block.ratio || ratio} />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case "pair":
      return (
        <figure className="block-pair">
          <div className="block-pair-images">
            {block.images.map((src, i) => (
              <Media key={i} src={src} alt={block.alt || title} ratio={block.ratio || ratio} />
            ))}
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case "grid":
      return (
        <figure className="block-grid">
          <div className="block-grid-images" style={{ "--grid-cols": block.columns || 2 }}>
            {block.images.map((src, i) => (
              <Media key={i} src={src} alt={block.alt || title} ratio={block.ratio || ratio} />
            ))}
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case "side":
      // Image and text next to each other; set flip: true for text on the left
      return (
        <div className={`block-side${block.flip ? " block-side--flip" : ""}`}>
          <Media src={block.src} alt={block.alt || title} ratio={block.ratio || ratio} />
          <p className="block-side-text">{block.content}</p>
        </div>
      );

    case "embed":
      // YouTube or Vimeo; paste the normal link
      return (
        <figure className="block-embed">
          <div className="block-embed-frame" style={{ aspectRatio: block.ratio || "16 / 9" }}>
            <iframe
              src={toEmbedUrl(block.src)}
              title={block.title || title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case "video":
      // Your own .mp4, with sound and play controls
      return (
        <figure className="block-video">
          <video src={block.src} poster={block.poster} controls playsInline preload="metadata" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    default:
      return null;
  }
}

export default function Project() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  useTitle(project?.title);
  if (!project) return <NotFound />;

  const next = projects[(index + 1) % projects.length];
  const { title, year, tags, role, tools, link, summary, body, images, ratio, blocks } = project;

  return (
    <article className="project">
      <header className="project-header">
        <h1 className="project-title">{title}</h1>
        {summary && <p className="project-summary">{summary}</p>}
      </header>

      <div className="project-info">
        <dl className="project-facts">
          <div><dt>Year</dt><dd>{year}</dd></div>
          {role && <div><dt>Role</dt><dd>{role}</dd></div>}
          {tools && <div><dt>Tools</dt><dd>{tools}</dd></div>}
          <div><dt>Type</dt><dd>{tags.join(", ")}</dd></div>
          {link && (
            <div>
              <dt>Live site</dt>
              <dd><a href={link} target="_blank" rel="noreferrer">Visit site</a></dd>
            </div>
          )}
        </dl>
        {body && (
          <div className="project-body">
            {body.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        )}
      </div>

      {blocks ? (
        <div className="project-blocks">
          {blocks.map((block, i) => (
            <Block key={i} block={block} title={title} ratio={ratio} />
          ))}
        </div>
      ) : (
        images && (
          <div className="project-images">
            {images.map((src, i) => (
              <Media key={i} src={src} alt={`${title}, image ${i + 1}`} ratio={ratio} eager={i === 0} />
            ))}
          </div>
        )
      )}

      {projects.length > 1 && (
        <nav className="project-next" aria-label="Next project">
          <span>Next project</span>
          <Link to={`/work/${next.slug}`}>{next.title}</Link>
        </nav>
      )}
    </article>
  );
}