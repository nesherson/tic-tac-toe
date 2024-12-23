import { useState } from "react";
import X from "../../components/x/X";
import Circle from "../../components/circle/Circle";

const initialState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function TestOx() {
  return (
    <div className="circle-wrapper">
      <Circle stroke="#FFFFFF" width="100%" height="100%" />
    </div>
  );
}

function TestEx() {
  return (
    <div className="x-wrapper">
      <X stroke="#FFFFFF" width="100%" height="100%" />
    </div>
  );
}

function Cell({ data }: { data: string }) {
  switch (data) {
    case "X":
      return <TestEx />;
    case "O":
      return <TestOx />;
    default:
      return <div></div>;
  }
}

export default function Game() {
  const [grid, setGrid] = useState(initialState);
  const [player, setPlayer] = useState(0);

  const handleOnClick = (row: number, column: number) => {
    const tempGrid = grid;

    if (tempGrid[row][column] === "X" || tempGrid[row][column] === "O") return;

    tempGrid[row][column] = player === 0 ? "X" : "O";
    setGrid(grid);
    setPlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0));
  };

  return (
    grid && (
      <div className="game-container">
        <div className="col-one" onClick={() => handleOnClick(0, 0)}>
          <Cell data={grid[0][0]} />
        </div>
        <div className="col-two" onClick={() => handleOnClick(0, 1)}>
          <Cell data={grid[0][1]} />
        </div>
        <div className="col-three" onClick={() => handleOnClick(0, 2)}>
          <Cell data={grid[0][2]} />
        </div>
        <div className="col-four" onClick={() => handleOnClick(1, 0)}>
          <Cell data={grid[1][0]} />
        </div>
        <div className="col-five" onClick={() => handleOnClick(1, 1)}>
          <Cell data={grid[1][1]} />
        </div>
        <div className="col-six" onClick={() => handleOnClick(1, 2)}>
          <Cell data={grid[1][2]} />
        </div>
        <div className="col-seven" onClick={() => handleOnClick(2, 0)}>
          <Cell data={grid[2][0]} />
        </div>
        <div className="col-eight" onClick={() => handleOnClick(2, 1)}>
          <Cell data={grid[2][1]} />
        </div>
        <div className="col-nine" onClick={() => handleOnClick(2, 2)}>
          <Cell data={grid[2][2]} />
        </div>
      </div>
    )
  );
}
