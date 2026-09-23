import { site } from "../data/site";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import useTitle from "../hooks/useTitle";

export default function Home() {
  useTitle();
  return (
    <>
      <section className="hero">
        <h1 className="hero-statement">{site.intro}</h1>
        <p className="hero-role">{site.role}</p>
      </section>

      <section aria-labelledby="work-heading">
        <h2 id="work-heading" className="section-heading">Selected work</h2>
        <ul className="work-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} eager={i < 2} />
          ))}
        </ul>
      </section>
    </>
  );
}
