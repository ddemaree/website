export default function ClipPaths() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
        <path
          fill="red"
          stroke="none"
          d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"
        />
      </clipPath>
      <clipPath id="squircleBoxClip" clipPathUnits="objectBoundingBox">
        <circle cx="5" cy="5" r="5" fill="red" />
      </clipPath>
    </svg>
  );
}
