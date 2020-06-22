import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Square = (props) => {
  return (
    <button className='square' onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};

class Board extends React.Component {
  renderSquare = (i) => {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  };

  render() {
    return (
      <div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      activePlayer: 'X',
      stepNumber: 0,
    };
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;

    if (squares[i] === null) {
      squares[i] = this.state.activePlayer;

      this.setState({
        history: history.concat([{ squares: squares }]),
        activePlayer: this.state.activePlayer === 'X' ? 'O' : 'X',
        stepNumber: history.length,
      });
    }
  };

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      activePlayer: step % 2 === 0 ? 'X' : 'O',
    });
  };

  handleReset = () => {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      activePlayer: 'X',
      stepNumber: 0,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;

    if (winner) {
      status = 'Winner ' + winner;
    } else {
      status = `Next player: ${this.state.activePlayer}`;
    }

    const moves = history.map((step, move) => {
      /*  const desc = move ? 'Go to move #' + move : 'Go to game start!';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );*/

      const desc = move ? 'Go to move #' + move : 'Go to game start!';

      if (move === 0) {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      } else {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
            <Board squares={history[move].squares} />
          </li>
        );
      }
    });

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            activePlayer={this.state.activePlayer}
            onClick={(i) => this.handleClick(i)}
          />
          <button onClick={() => this.handleReset()}>Reset</button>
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol className='info-board'>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
