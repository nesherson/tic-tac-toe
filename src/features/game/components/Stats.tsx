import { Statistics } from "./types/statistics";

export function Stats({ gameStatistics }: { gameStatistics: Statistics; }) {
  return <div className="stats-container">
    <div>
      <span>Player(X)</span>
      <span>{gameStatistics.playerWins}</span>
    </div>
    <div>
      <span>Tie</span>
      <span>{gameStatistics.ties}</span>
    </div>
    <div>
      <span>Computer(O)</span>
      <span>{gameStatistics.computerWins}</span>
    </div>
  </div>;
}
