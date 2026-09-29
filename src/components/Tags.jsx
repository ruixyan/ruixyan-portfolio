export default function Tags({ tags, className = "" }) {
    return (
      <ul className={`tags ${className}`}>
        {tags.map((tag) => (
          <li key={tag} className="tag">{tag}</li>
        ))}
      </ul>
    );
  }