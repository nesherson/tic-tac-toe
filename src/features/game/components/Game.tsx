import { useEffect, useRef, useState } from "react";

import { Stats } from "./Stats";
import { Sign } from "./Sign";
import Line from "components/line/Line";
import { GameMode, GameOverResult, GameStatistics, Player, PlayerType } from "features/game/types/types";

function checkIsGameOver(grid: string[][], player: Player): GameOverResult {
  const gameOverResult: GameOverResult = {
    winLocation: null,
    isTie: false,
    isOver: false
  };

  if (grid[0][0] === player.sign && grid[0][1] === player.sign && grid[0][2] === player.sign) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "first-row";
  }
  else if (grid[1][0] === player.sign && grid[1][1] === player.sign && grid[1][2] === player.sign) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "second-row";
  }
  else if (grid[2][0] === player.sign && grid[2][1] === player.sign && grid[2][2] === player.sign) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "third-row";
  }
  else if (grid[0][0] === player.sign && grid[1][0] === player.sign && grid[2][0] === player.sign) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "first-col";
  }
  else if (grid[0][1] === player.sign && grid[1][1] === player.sign && grid[2][1] === player.sign) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "second-col";
  }
  else if (grid[0][2] === player.sign && grid[1][2] === player.sign && grid[2][2] === player.sign) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "third-col";
  }
  else if (grid[0][0] === player.sign && grid[1][1] === player.sign && grid[2][2] === player.sign) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "left-to-right-diagonal";
  }
  else if (grid[0][2] === player.sign && grid[1][1] === player.sign && grid[2][0] === player.sign) {
    gameOverResult.isOver = true;
    gameOverResult.winLocation = "right-to-left-diagonal";
  }
  else {
    gameOverResult.isTie = isTie(grid);
  }

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

function createGrid(rows: number, columns: number) {
  return Array.from({ length: rows }, (value1, index1) => {
    return Array.from({ length: columns }, (value2, index2) => {
      return "";
    });
  });
}

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

const PLAYER_ONE_INITIAL_STATE: Player = {
  type: PlayerType.HumanPlayer,
  sign: Math.random() > 0.5 ? "X" : "O",
  isPlaying: Math.random() > 0.5 ? true : false
}

const PLAYER_TWO_INITIAL_STATE: Player = {
  type: PlayerType.ComputerPlayer,
  sign: PLAYER_ONE_INITIAL_STATE.sign === "X" ? "O" : "X",
  isPlaying: PLAYER_ONE_INITIAL_STATE.isPlaying
}

const GAME_STATISTICS_INITIAL_STATE: GameStatistics = {
  playerOneWins: 0,
  playerTwoWins: 0,
  ties: 0
}

export default function Game() {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const [grid, setGrid] = useState(createGrid(3, 3));
  const [playerOne, setPlayerOne] = useState<Player>(PLAYER_ONE_INITIAL_STATE);
  const [playerTwo, setPlayerTwo] = useState<Player>(PLAYER_TWO_INITIAL_STATE);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(playerOne.isPlaying ? playerOne : playerTwo);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.PlayerVsComputer);
  const [gameStatistics, setGameStatistics] = useState<GameStatistics>(GAME_STATISTICS_INITIAL_STATE);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winLocation, setWinLocation] = useState<string | null>(null);

  console.log("Player one -> ", playerOne);

  const handleCellOnClick = (row: number, column: number) => {
    playMove(row, column);
    goToNextPlayer();
  };

  const resetPlayers = () => {
    const pOne: Player = {
      type: PlayerType.HumanPlayer,
      sign: Math.random() > 0.5 ? "X" : "O",
      isPlaying: Math.random() > 0.5 ? true : false
    };
    const pTwo: Player = {
      type: gameMode === GameMode.PlayerVsPlayer ? PlayerType.HumanPlayer : PlayerType.ComputerPlayer,
      sign: playerOne?.sign === "X" ? "O" : "X",
      isPlaying: !playerOne?.isPlaying
    };
    setPlayerOne(pOne);
    setPlayerTwo(pTwo);

    if (pOne.isPlaying) {
      setCurrentPlayer(pOne);
    }
    else {
      setCurrentPlayer(pTwo);
    }
  }

  const updateGameStatistics = (isTie = false) => {
    if (isTie) {
      setGameStatistics(prevStats => {
        return {
          ...prevStats,
          ties: prevStats.ties++
        };
      });

      return;
    }

    if (playerOne?.isPlaying) {
      setGameStatistics(prevStats => {
        return {
          ...prevStats,
          playerOneWins: prevStats.playerOneWins++
        };
      });
    }
    else {
      setGameStatistics(prevStats => {
        return {
          ...prevStats,
          playerTwoWins: prevStats.playerTwoWins++
        };
      })
    }
  }

  const resetGameStatistics = () => {
    setGameStatistics(GAME_STATISTICS_INITIAL_STATE)
  }

  const goToNextPlayer = () => {
    if (playerOne.isPlaying) {
      setPlayerOne({ ...playerOne!, isPlaying: false });
      setPlayerTwo({ ...playerTwo!, isPlaying: true });
      setCurrentPlayer(playerTwo);
    }
    else if (playerTwo?.isPlaying) {
      setPlayerTwo({ ...playerTwo!, isPlaying: false });
      setPlayerOne({ ...playerOne!, isPlaying: true });
      setCurrentPlayer(playerOne);
    }
  }

  const playMove = (row: number, column: number) => {
    if (isGameOver) {
      restartGame();
      return;
    }

    const tempGrid = [...grid];

    if (!currentPlayer)
      return;

    if (tempGrid[row][column] !== "")
      return;

    tempGrid[row][column] = currentPlayer.sign;

    const gameOverResult = checkIsGameOver(tempGrid, currentPlayer);

    if (gameOverResult.isOver) {
      updateGameStatistics();
      setIsGameOver(true);
      setWinLocation(gameOverResult.winLocation);
      return;
    }
    else if (gameOverResult.isTie) {
      updateGameStatistics(true);
      setIsGameOver(true);
      return;
    }
    setGrid(tempGrid);
  }

  const playComputerMove = () => {
    setTimeout(() => {
      if (currentPlayer === null)
        return;

      const tempGrid = [...grid];
      let randomRow = getRandomNumber(3);
      let randomColumn = getRandomNumber(3);

      while (grid[randomRow][randomColumn] !== "") {
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
      }
      else if (gameOverResult.isTie) {
        updateGameStatistics(true);
        setIsGameOver(true);
        return;
      }

      setGrid(tempGrid);
      goToNextPlayer();
    }, 400);
  }

  const restartGame = () => {
    setGrid(createGrid(3, 3));
    resetPlayers();
    resetGameStatistics();
    setIsGameOver(false);
    setWinLocation(null);
  }

  const handleGameModeChange = () => {
    if (gameMode === GameMode.PlayerVsComputer)
      setGameMode(GameMode.PlayerVsPlayer);
    else
      setGameMode(GameMode.PlayerVsComputer);

    restartGame();
  }

  useEffect(() => {
    if (currentPlayer?.type === PlayerType.ComputerPlayer)
      playComputerMove();
  }, [currentPlayer]);

  return (
    <>
      <Stats
        gameStatistics={gameStatistics}
        gameMode={gameMode}
        playerOne={playerOne}
        playerTwo={playerTwo}
        handleGameModeChange={handleGameModeChange} />
      {grid && (
        <div className="grid-container" ref={gameContainerRef}>
          {isGameOver && gameContainerRef.current &&
            <Line
              location={winLocation}
              containerElementWidth={gameContainerRef.current.clientWidth}
              containerElementHeight={gameContainerRef.current.clientHeight} />
          }
          {grid.map((row, rowIndex) => {
            return row.map((_, colIndex) => {
              const cellNumber = row.length * rowIndex + colIndex;
              return (
                <div
                  key={cellNumber}
                  className={`cell-${cellNumber}`}
                  onClick={() => handleCellOnClick(rowIndex, colIndex)}>
                  <Sign sign={grid[rowIndex][colIndex]} />
                </div>
              )
            })
          })
          }
        </div>
      )}
    </>
  );
}
