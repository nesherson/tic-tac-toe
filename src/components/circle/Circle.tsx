import "./circle.css";

export default function Circle() {
  return (
    <svg className="circle-svg"
      width="100%"
      height="100%"
      viewBox="0 0 50 50"
      x="0px"
      y="0px"
      xmlSpace="preserve">
      <path
        d="M25 9.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="8"
      />
    </svg>
  );
}
