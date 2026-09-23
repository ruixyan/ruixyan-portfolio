// Shows an image, or a neutral placeholder block when src is empty.
export default function Media({ src, alt = "", ratio = "4 / 3", eager = false }) {
  return (
    <div className="media" style={{ aspectRatio: ratio }}>
      {src ? (
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
      ) : (
        <span className="media-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}
