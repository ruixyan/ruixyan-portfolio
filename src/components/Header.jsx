import { Link, NavLink } from "react-router-dom";
import { site } from "../data/site";
import { useHeaderTitle } from "../context/HeaderTitle";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { title } = useHeaderTitle();
  return (
    <header className="site-header">
      <Link to="/" className="site-name">{site.name}</Link>

      {/* Decorative: the same text is already on the page, so screen readers skip it */}
      <p className="header-title" aria-hidden="true">
        {title && <span key={title} className="header-title-text">{title}</span>}
      </p>

      <nav aria-label="Main">
        <ul className="nav-list">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><a href={`mailto:${site.email}`}>Contact</a></li>
          <li><ThemeToggle /></li>
        </ul>
      </nav>
    </header>
  );
}