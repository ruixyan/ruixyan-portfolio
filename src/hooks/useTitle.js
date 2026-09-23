import { useEffect } from "react";
import { site } from "../data/site";

export default function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : site.name;
  }, [title]);
}
