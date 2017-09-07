
function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} key={i}
             onClick={() => this.props.onClick(i)}/>;
  }

  render() {
    let rows = [];
    for(let z =0; z<3;z++){
      let row = [];
      for(let zz=z*3; zz < z*3+3;zz++){
        row.push(this.renderSquare(zz));
      }
      rows.push(<div className="board-row" key={z}>{row}</div>);
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastStep: ''
      }],
      xIsNext: true,
      stepNum: 0,
      reverse: false,
      winnerIndex: ,
    }
  }

  calculateWinner(squares){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for(let j=0;j<lines.length; j++){
      const [a,b,c] = lines[j];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        this.setState({winnerIndex: [a,b,c]});
        return squares[a];
      }
    }
    return false;
  }

  handleClick(i) {

    const history = this.state.history.slice(0, this.state.stepNum +1);
    const current = history[history.length-1];
    const squares = current.squares.slice();

    if(squares[i] || calculateWinner(squares)){
      return ;
    }
    squares[i] = this.state.xIsNext ? 'x' : 'o';
    this.setState({
      history: history.concat([{
                squares: squares,
                lastStep: `(${Math.floor(i/3)+1}, ${i%3 + 1})`
              }]),
      xIsNext : !this.state.xIsNext,
      stepNum: this.state.stepNum + 1
    });
  }

  jumpTo(move){
    this.setState({
      xIsNext: (move % 2 ==0) ? true : false,
      stepNum: move
    })
  }

  reverse(){
    this.setState({reverse: !this.state.reverse});
  }

  render() {
    const history = this.state.history.slice(0, this.state.stepNum+1);
    const current = history[history.length-1];
    const squares = current.squares;
    const winner = calculateWinner(squares);

    const moves = this.state.history.map((step, move) => {
      const desc = move ?
        'Move #' + step.lastStep :
        'Game start';
        if(move == this.state.stepNum){
          return (
            <li key={move}  >
              <a href="#" onClick={() => this.jumpTo(move)}><strong>{desc}</strong></a>
            </li>
          );
        }else{
          return (
            <li key={move}  >
              <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
            </li>
          );
        }

    });


    let status;
    if(winner){
      status = 'winner: ' + winner;
    }else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={this.handleClick.bind(this)}
            winnerIndex={this.state.winnerIndex} />
        </div>
        <div className="game-info">
          <div><input type="button" value="reverse" onClick={this.reverse.bind(this)} /></div>
          <div>{status}</div>
          <ol>{!this.state.reverse ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// https://facebook.github.io/react/tutorial/tutorial.html
