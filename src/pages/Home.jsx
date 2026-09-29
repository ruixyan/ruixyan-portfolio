import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import Showreel from "../components/Showreel";
import useTitle from "../hooks/useTitle";
import { useHeaderTitle } from "../context/HeaderTitle";

export default function Home() {
  useTitle();
  const { setTitle } = useHeaderTitle();
  const [inWork, setInWork] = useState(false);
  const workRef = useRef(null);

  // "Selected work" once the list reaches the top half of the screen,
  // and it stays that way while scrolling further down.
  useEffect(() => {
    const el = workRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInWork(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { rootMargin: "0px 0px -50% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setTitle(inWork ? "Selected work" : "Showreel");
  }, [inWork, setTitle]);

  // Clear the header title when leaving the home page
  useEffect(() => () => setTitle(""), [setTitle]);

  return (
    <>
      <Showreel />

      <section aria-label="Work" ref={workRef}>
        <ul className="work-list">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} eager={i < 2} />
          ))}
        </ul>
      </section>
    </>
  );
}