// Slow-drifting gold "water" gradient blobs, plus a deep-vignette layer.
// Deliberately zero JavaScript state — everything here is CSS keyframe
// animation on `transform` only, so it costs the GPU compositor almost
// nothing and never touches React's render loop. Global prefers-reduced-
// motion rules in index.css freeze it for users who need that.
export default function AmbientMesh() {
  return (
    <div className="ambient-mesh" aria-hidden="true">
      <span className="ambient-blob ambient-blob-a" />
      <span className="ambient-blob ambient-blob-b" />
      <span className="ambient-blob ambient-blob-c" />
      <span className="ambient-vignette" />
    </div>
  )
}
