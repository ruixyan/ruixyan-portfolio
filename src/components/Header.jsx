import { Link, NavLink } from "react-router-dom";
import { site } from "../data/site";

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-name">{site.name}</Link>
      <nav aria-label="Main">
        <ul className="nav-list">
          <li><NavLink to="/" end>Work</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><a href={`mailto:${site.email}`}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
