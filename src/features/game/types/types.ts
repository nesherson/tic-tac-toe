type GameStatistics = {
    playerOneWins: number,
    playerTwoWins: number,
    ties: number
}

type Player = {
    type: PlayerType,
    sign: string
}

type GameOverResult = {
    winLocation: string | null,
    isTie: boolean,
    isOver: boolean
  }

enum GameMode {
    PlayerVsPlayer,
    PlayerVsComputer
}

enum PlayerType {
    HumanPlayer,
    ComputerPlayer
}

export { type GameStatistics, type Player, type GameOverResult, GameMode, PlayerType };