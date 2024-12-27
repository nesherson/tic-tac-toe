import Circle from "components/circle/Circle";
import X from "components/x/X";

export function Sign({ sign }: { sign: string|null; }) {
  switch (sign) {
    case "X":
      return (
        <X />
      );
    case "O":
      return (
        <Circle />
      );
    default:
      return <div></div>;
  }
}
