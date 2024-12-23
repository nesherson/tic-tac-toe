import { MutableRefObject, useRef, useState } from "react";

import { Stats } from "@/features/game/components/Stats";
import { Cell } from "@/features/game/components/Cell";
import { Statistics } from "@/features/game/types/statistics";
import { Player } from "@/features/game/types/player";
import Line from "@/components/line/Line";

type GameOverResult = {
  winner: string | null,
  winLocation: string | null,
  isTie: boolean,
  isOver: boolean
}

function checkIsGameOver(grid: string[][], player: Player): GameOverResult {
  const gameOverResult: GameOverResult = {
    winner: null,
    winLocation: null,
    isTie: false,
    isOver: false
  };

  if (grid[0][0] === player.item && grid[0][1] === player.item && grid[0][2] === player.item) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "first-row";
  }
  else if (grid[1][0] === player.item && grid[1][1] === player.item && grid[1][2] === player.item) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "second-row";
  }
  else if (grid[2][0] === player.item && grid[2][1] === player.item && grid[2][2] === player.item) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "third-row";
  }
  else if (grid[0][0] === player.item && grid[1][0] === player.item && grid[2][0] === player.item) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "first-col";
  }
  else if (grid[0][1] === player.item && grid[1][1] === player.item && grid[2][1] === player.item) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "second-col";
  }
  else if (grid[0][2] === player.item && grid[1][2] === player.item && grid[2][2] === player.item) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "third-col";
  }
  else if (grid[0][0] === player.item && grid[1][1] === player.item && grid[2][2] === player.item) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "left-to-right-diagonal";
  }
  else if (grid[0][2] === player.item && grid[1][1] === player.item && grid[2][0] === player.item) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "right-to-left-diagonal";
  }
  else {
    gameOverResult.isTie = isTie(grid);
  }

  if (gameOverResult.isOver && !gameOverResult.isTie)
    gameOverResult.winner = player?.type;

  return gameOverResult;
}

function isTie(grid: string[][]) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "")
        return false;
    }
  }

  return true;
}

function updateGameStatistics(player: Player | null,
  gameStatisticsDispatch: React.Dispatch<React.SetStateAction<Statistics>>) {
  if (player === null) {
    gameStatisticsDispatch(prevStats => {
      return {
        ...prevStats,
        ties: prevStats.ties++
      };
    });

    return;
  }

  if (player.type === "human") {
    gameStatisticsDispatch(prevStats => {
      return {
        ...prevStats,
        playerWins: prevStats.playerWins++
      };
    });
  }
  else {
    gameStatisticsDispatch(prevStats => {
      return {
        ...prevStats,
        computerWins: prevStats.computerWins++
      };
    })
  }
}

function createGrid(rows: number, columns: number) {
  return Array.from({ length: rows }, (value1, index1) => {
    return Array.from({ length: columns }, (value2, index2) => {
      return "";
    });
  });
}

export default function Game() {
  const gameContainerRef = useRef(null);
  const humanPlayer = {
    type: "human",
    item: "X"
  }
  const computerPlayer = {
    type: "computer",
    item: "O"
  }

  const [grid, setGrid] = useState(createGrid(3, 3));
  const [drawLine, setDrawLine] = useState(false);
  const [player, setPlayer] = useState<Player>(humanPlayer);
  const [gameStatistics, setGameStatistics] = useState<Statistics>({
    playerWins: 0,
    computerWins: 0,
    ties: 0
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [winLocation, setWinLocation] = useState<string|null>(null);

  const handleOnClick = (row: number, column: number) => {

    if (isGameOver) {
      setGrid(createGrid(3, 3));
      setPlayer((prevPlayer) => (prevPlayer.type === "human" ? computerPlayer : humanPlayer));
      setIsGameOver(false);
      setWinLocation(null);
      return;
    }

    const tempGrid = grid;

    if (tempGrid[row][column] !== "") return;

    tempGrid[row][column] = player.item;
    setGrid(grid);

    const gameOverResult = checkIsGameOver(grid, player);

    if (gameOverResult.isOver) {
      updateGameStatistics(player, setGameStatistics);
      setIsGameOver(true);
      setWinLocation(gameOverResult.winLocation);
      return;
    }
    else if (gameOverResult.isTie) {
      updateGameStatistics(null, setGameStatistics);
      setIsGameOver(true);
      return;
    }

    setPlayer((prevPlayer) => (prevPlayer.type === "human" ? computerPlayer : humanPlayer));
    setDrawLine(prev => !prev);
  };

  return (
    <>

      {grid && (
        <div className="game-container" ref={gameContainerRef}>
          {isGameOver &&
            <Line
              location={winLocation}
              containerElementWidth={gameContainerRef.current.clientWidth}
              containerElementHeight={gameContainerRef.current.clientHeight} />
          }
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
      )}
      <Stats gameStatistics={gameStatistics} />
    </>
  );
}
