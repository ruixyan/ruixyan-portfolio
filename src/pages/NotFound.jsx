import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

export default function NotFound() {
  useTitle("Page not found");
  return (
    <div className="not-found">
      <h1 className="page-title">This page doesn't exist.</h1>
      <p><Link to="/">Go back to the work</Link></p>
    </div>
  );
}
