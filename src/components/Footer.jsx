import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="footer-email" href={`mailto:${site.email}`}>{site.email}</a>
      <ul className="footer-links">
        {site.links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
