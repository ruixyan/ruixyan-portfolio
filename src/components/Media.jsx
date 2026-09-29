// Shows an image, a looping video (.mp4/.webm/.mov), or a placeholder when src is empty.
//
// ratio: "4 / 3" etc. crops to that shape (good for grids)
//        "auto" shows the whole thing at its natural shape
// fit:   "cover" fills the box and crops, "contain" fits inside it with no cropping
const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src || "");

export default function Media({ src, alt = "", ratio = "4 / 3", fit = "cover", eager = false }) {
  const natural = ratio === "auto" && src;
  const boxStyle = natural ? undefined : { aspectRatio: ratio === "auto" ? "4 / 3" : ratio };
  const mediaStyle = natural ? undefined : { objectFit: fit };

  let content;
  if (!src) {
    content = <span className="media-placeholder" aria-hidden="true" />;
  } else if (isVideo(src)) {
    content = (
      <video
        src={src}
        style={mediaStyle}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt || undefined}
      />
    );
  } else {
    content = (
      <img
        src={src}
        alt={alt}
        style={mediaStyle}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <div className={`media${natural ? " media--natural" : ""}`} style={boxStyle}>
      {content}
    </div>
  );
}