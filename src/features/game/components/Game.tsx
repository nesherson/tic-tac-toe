import { useEffect, useState } from "react";
import { useMeasure } from "@react-hookz/web";

import { Stats } from "./Stats";
import { Sign } from "./Sign";
import Line from "components/line/Line";
import {
  GameMode,
  GameOverResult,
  GameStatistics,
  Player,
  PlayerType,
} from "features/game/types/types";

function checkIsGameOver(grid: (string | null)[][], player: Player) {
  const gameOverResult: GameOverResult = {
    winLocation: null,
    isTie: false,
    isOver: false,
  };

  if (
    grid[0][0] === player.sign &&
    grid[0][1] === player.sign &&
    grid[0][2] === player.sign
  ) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "first-row";
  } else if (
    grid[1][0] === player.sign &&
    grid[1][1] === player.sign &&
    grid[1][2] === player.sign
  ) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "second-row";
  } else if (
    grid[2][0] === player.sign &&
    grid[2][1] === player.sign &&
    grid[2][2] === player.sign
  ) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "third-row";
  } else if (
    grid[0][0] === player.sign &&
    grid[1][0] === player.sign &&
    grid[2][0] === player.sign
  ) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "first-col";
  } else if (
    grid[0][1] === player.sign &&
    grid[1][1] === player.sign &&
    grid[2][1] === player.sign
  ) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "second-col";
  } else if (
    grid[0][2] === player.sign &&
    grid[1][2] === player.sign &&
    grid[2][2] === player.sign
  ) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "third-col";
  } else if (
    grid[0][0] === player.sign &&
    grid[1][1] === player.sign &&
    grid[2][2] === player.sign
  ) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "left-to-right-diagonal";
  } else if (
    grid[0][2] === player.sign &&
    grid[1][1] === player.sign &&
    grid[2][0] === player.sign
  ) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "right-to-left-diagonal";
  } else {
    gameOverResult.isTie = isTie(grid);
  }

  return gameOverResult;
}

function isTie(grid: (string | null)[][]) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === null) return false;
    }
  }

  return true;
}

function createGrid(rows: number, columns: number): (string | null)[][] {
  return Array.from({ length: rows }, () => {
    return Array.from({ length: columns }, () => {
      return null;
    });
  });
}

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomPlayer(playerOne: Player, playerTwo: Player) {
  return Math.floor(Math.random()) > 0.5 ? playerOne : playerTwo;
}

const PLAYER_ONE_INITIAL_STATE: Player = {
  type: PlayerType.HumanPlayer,
  sign: Math.random() > 0.5 ? "X" : "O",
};

const PLAYER_TWO_INITIAL_STATE: Player = {
  type: PlayerType.ComputerPlayer,
  sign: PLAYER_ONE_INITIAL_STATE.sign === "X" ? "O" : "X",
};

const GAME_STATISTICS_INITIAL_STATE: GameStatistics = {
  playerOneWins: 0,
  playerTwoWins: 0,
  ties: 0,
};

export default function Game() {  
  const [grid, setGrid] = useState(createGrid(3, 3));
  const [playerOne, setPlayerOne] = useState<Player>(PLAYER_ONE_INITIAL_STATE);
  const [playerTwo, setPlayerTwo] = useState<Player>(PLAYER_TWO_INITIAL_STATE);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(
    getRandomPlayer(playerOne, playerTwo)
  );
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.PlayerVsComputer);
  const [gameStatistics, setGameStatistics] = useState<GameStatistics>(
    GAME_STATISTICS_INITIAL_STATE
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [winLocation, setWinLocation] = useState<string | null>(null);

  // const gameContainerRef = useRef<HTMLDivElement>(null);
  let isComputerPlaying = currentPlayer.type === PlayerType.ComputerPlayer;
  const [gameContainerMeasures, gameContainerRef] = useMeasure<HTMLDivElement>();

  const handleCellOnClick = (row: number, column: number) => {
    playMove(row, column);
  };

  const resetPlayers = () => {
    const pOne: Player = {
      type: PlayerType.HumanPlayer,
      sign: Math.random() > 0.5 ? "X" : "O",
    };
    const pTwo: Player = {
      type:
        gameMode === GameMode.PlayerVsPlayer
          ? PlayerType.HumanPlayer
          : PlayerType.ComputerPlayer,
      sign: pOne?.sign === "X" ? "O" : "X",
    };
    setPlayerOne(pOne);
    setPlayerTwo(pTwo);
    setCurrentPlayer(getRandomPlayer(pOne, pTwo));
  };

  const updateGameStatistics = (isTie = false) => {
    if (isTie) {
      setGameStatistics((prevStats) => ({
        ...prevStats,
        ties: prevStats.ties++,
      }));

      return;
    }

    if (currentPlayer.sign === playerOne.sign) {
      setGameStatistics((prevStats) => ({
        ...prevStats,
        playerOneWins: prevStats.playerOneWins++,
      }));
    } else {
      setGameStatistics((prevStats) => ({
        ...prevStats,
        playerTwoWins: prevStats.playerTwoWins++,
      }));
    }
  };

  const resetGameStatistics = () => {
    setGameStatistics({
      playerOneWins: 0,
      playerTwoWins: 0,
      ties: 0,
    });
  };

  const goToNextPlayer = () => {
    if (currentPlayer.sign === playerOne.sign) {
      setCurrentPlayer(playerTwo);
    } else {
      setCurrentPlayer(playerOne);
    }
  };

  const playMove = (row: number, column: number) => {
    if (isGameOver) {
      restartGame(true);
      return;
    }

    if (!currentPlayer) 
      return;

    if (isComputerPlaying)
      return;
    
    const tempGrid = [...grid];

    if (tempGrid[row][column] !== null) return;

    tempGrid[row][column] = currentPlayer.sign;

    const gameOverResult = checkIsGameOver(tempGrid, currentPlayer);

    if (gameOverResult.isOver) {
      updateGameStatistics();
      setIsGameOver(true);
      setWinLocation(gameOverResult.winLocation);
      return;
    } else if (gameOverResult.isTie) {
      updateGameStatistics(true);
      setIsGameOver(true);
      return;
    }
    setGrid(tempGrid);
    goToNextPlayer();
  };

  const playComputerMove = () => {
    return setTimeout(() => {
      if (currentPlayer === null) return;

      if (isGameOver) return;

      isComputerPlaying = true;

      const tempGrid = [...grid];
      let randomRow = getRandomNumber(3);
      let randomColumn = getRandomNumber(3);

      while (grid[randomRow][randomColumn] !== null) {
        randomRow = getRandomNumber(3);
        randomColumn = getRandomNumber(3);
      }

      tempGrid[randomRow][randomColumn] = currentPlayer.sign;

      const gameOverResult = checkIsGameOver(tempGrid, currentPlayer);

      if (gameOverResult.isOver) {
        updateGameStatistics();
        setIsGameOver(true);
        setWinLocation(gameOverResult.winLocation);
        return;
      } else if (gameOverResult.isTie) {
        updateGameStatistics(true);
        setIsGameOver(true);
        return;
      }

      isComputerPlaying = false;
      setGrid(tempGrid);
      goToNextPlayer();
    }, 400);
  };

  const restartGame = (ignoreStatReset = false) => {
    setGrid(createGrid(3, 3));
    resetPlayers();
    if (!ignoreStatReset) resetGameStatistics();
    setIsGameOver(false);
    setWinLocation(null);
  };

  const handleGameModeChange = () => {
    if (gameMode === GameMode.PlayerVsComputer)
      setGameMode(GameMode.PlayerVsPlayer);
    else setGameMode(GameMode.PlayerVsComputer);

    restartGame();
  };
  useEffect(() => {
    if (currentPlayer?.type === PlayerType.ComputerPlayer) {
      let timeoutId = playComputerMove();

      return () => clearTimeout(timeoutId);
    }
  }, [currentPlayer]);

  return (
    <>
      <Stats
        gameStatistics={gameStatistics}
        gameMode={gameMode}
        playerOne={playerOne}
        playerTwo={playerTwo}
        currentPlayer={currentPlayer}
        isGameOver={isGameOver}
        handleGameModeChange={handleGameModeChange}
      />
      {grid && (
        <div className="grid-container" ref={gameContainerRef}>
          {isGameOver && gameContainerMeasures && (
            <Line
              location={winLocation}
              gameContainerMeasures={gameContainerMeasures}
            />
          )}
          {grid.map((row, rowIndex) => {
            return row.map((_, colIndex) => {
              const cellNumber = row.length * rowIndex + colIndex;
              return (
                <div
                  key={cellNumber}
                  className={`cell-${cellNumber}`}
                  onClick={() => handleCellOnClick(rowIndex, colIndex)}
                >
                  {grid[rowIndex][colIndex] && (
                    <Sign sign={grid[rowIndex][colIndex]} />
                  )}
                </div>
              );
            });
          })}
        </div>
      )}
    </>
  );
}
