import "./circle.css";

interface Props {
  stroke?: string;
  height?: string;
  width?: string;
}

export default function Circle({ stroke, height, width }: Props) {
  const _stroke = stroke ?? "#000000";
  const _height = height ?? "100px";
  const _width = width ?? "100px";

  return (
    <svg className="circle-svg" height={_height} width={_width}>
      <circle
      width={_width}
      height={_height}
        className="circle"
        cx="100"
        cy="85"
        r="57"
        stroke={_stroke}
        strokeWidth="9"
        fillOpacity="0"
      />
    </svg>
  );
}
