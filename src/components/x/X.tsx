import "./x.css";

interface Props {
  stroke?: string;
  height?: string;
  width?: string;
}

export default function X({ stroke, height, width }: Props) {
  const _stroke = stroke ?? "#000000";
  const _height = height ?? "50px";
  const _width = width ?? "50px";

  return (
    <svg
      className="x-svg"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width={_width}
      height={_height}
      viewBox="0 0 50 50"
      enableBackground="new 0 0 50 50"
      xmlSpace="preserve"
    >
      <g id="Layer_3">
        <line
          id="path2"
          fill="none"
          stroke={_stroke}
          strokeWidth="3"
          strokeMiterlimit="10"
          x1="8.5"
          y1="41.5"
          x2="41.5"
          y2="8.5"
        />
        <line
          id="path3"
          fill="none"
          stroke={_stroke}
          strokeWidth="3"
          strokeMiterlimit="10"
          x1="41.5"
          y1="41.5"
          x2="8.5"
          y2="8.5"
        />
      </g>
    </svg>
  );
}
