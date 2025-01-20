import { GameMode, GameStatistics, Player, PlayerType } from "../types/types";

interface Props {
  gameStatistics: GameStatistics;
  gameMode: GameMode;
  playerOne: Player;
  playerTwo: Player;
  currentPlayer: Player;
  isGameOver: boolean;
  handleGameModeChange: () => void;
}

export function Stats({
  gameStatistics,
  playerOne,
  playerTwo,
  currentPlayer,
  isGameOver,
  handleGameModeChange,
}: Props) {
  const playerTwoName =
    playerTwo.type === PlayerType.HumanPlayer
      ? `Player 2(${playerTwo.sign})`
      : `Computer(${playerTwo.sign})`;

  return (
    <div className="stats-container">
      <div
        className={`${
          currentPlayer.sign === playerOne.sign && !isGameOver ? "active-player" : ""
        }`}
      >
        <span>{`Player 1(${playerOne.sign})`}</span>
        <span>{gameStatistics.playerOneWins}</span>
      </div>
      <div>
        <span>Tie</span>
        <span>{gameStatistics.ties}</span>
      </div>
      <div
        className={`stats-player-two ${
          currentPlayer.sign === playerTwo.sign && !isGameOver ? "active-player" : ""
        }`}
        title="Change game mode"
        onClick={handleGameModeChange}
      >
        <span>{playerTwoName}</span>
        <span>{gameStatistics.playerTwoWins}</span>
      </div>
    </div>
  );
}
