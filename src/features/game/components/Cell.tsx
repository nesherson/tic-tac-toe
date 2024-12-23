import Circle from "@/components/circle/Circle";
import X from "@/components/x/X";

export function Cell({ data }: { data: string; }) {
  switch (data) {
    case "X":
      return (
        <div className="x-wrapper">
          <X stroke="#FFFFFF" width="100%" height="100%" />
        </div>
      );
    case "O":
      return (
        <div className="circle-wrapper">
          <Circle stroke="#FFFFFF" width="100%" height="100%" />
        </div>
      );
    default:
      return <div style={{width: 0, height: 0, padding: 0, margin: 0}}></div>;
  }
}
