// Add a project by adding an object. Order here = order on the home page.
//
// size:   "large" (8 of 12 cols), "medium" (6), "small" (4).
//         Pair them so each row adds to 12: large + small, medium + medium, small × 3.
// ratio:  aspect ratio of the images, e.g. "4 / 3", "1 / 1", "3 / 4".
// cover / images: paths inside /public, e.g. "/work/type-specimen/cover.jpg".
//         Leave them null and a placeholder block is shown instead.

export const projects = [
  {
    slug: "type-specimen",
    title: "Type specimen",
    year: 2026,
    tags: ["Typography", "Print"],
    size: "large",
    ratio: "4 / 3",
    cover: null,
    role: "Design, typesetting",
    tools: "InDesign, Glyphs",
    summary: "A one-line description that appears under the title on the project page.",
    body: [
      "Describe the brief, what you tried, and what you decided. Two or three short paragraphs is plenty.",
    ],
    images: [null, null, null],
  },
  {
    slug: "festival-identity",
    title: "Festival identity",
    year: 2025,
    tags: ["Branding", "Motion"],
    size: "small",
    ratio: "3 / 4",
    cover: null,
    role: "Identity, motion",
    tools: "Illustrator, After Effects",
    summary: "One-line description.",
    body: ["Project text."],
    images: [null, null],
  },
  {
    slug: "archive-website",
    title: "Archive website",
    year: 2025,
    tags: ["Web", "Development"],
    size: "medium",
    ratio: "1 / 1",
    cover: null,
    role: "Design, front-end",
    tools: "Figma, Next.js",
    summary: "One-line description.",
    body: ["Project text."],
    images: [null, null],
  },
  {
    slug: "zine",
    title: "Zine series",
    year: 2024,
    tags: ["Editorial"],
    size: "medium",
    ratio: "1 / 1",
    cover: null,
    role: "Editing, design",
    tools: "Risograph",
    summary: "One-line description.",
    body: ["Project text."],
    images: [null],
  },
];
