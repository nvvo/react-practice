import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';

class MyTabList2 extends React.Component {
  render() {
    return  <div>{this.props.children}</div>
  }
}

class MyTabList extends React.Component {
  state = {
    activeIndex: 0
  };

  onTabChange(activeIndex) {
    this.setState({ activeIndex });
  }

  render() {
    const children = this.props.children;
    console.log("Tab list children", children);

    const titles = children.map(t => {
      return t.props.children[0].props.children
    });
    console.log("Tab list tiles", titles);

    const contents = children.map(t => {
      return t.props.children[1].props.children
    });
    console.log("Tab list contents", contents);
    const { activeIndex } = this.state;

    return (
      <div class="container">
        <div class="tabList">
          {titles.map((title, index) => (
            <div
              key={index}
              onClick={() => this.onTabChange(index)}
              class={`tab ${index === activeIndex ? "active" : ""}`}
            >
              {title}
            </div>
          ))}
        </div>
        <div class="tabContent">{contents[activeIndex]}</div>
      </div>
    );
  }
}

class MyTab extends React.Component {
  render() {
    return null;
  }
}
class MyTitle extends React.Component {
  render() {
    return null;
  }
}
class MyContent extends React.Component {
  render() {
    return null;
  }
}
class TabContainer extends React.Component {
  render() {
    return (
      <MyTabList>
        <MyTab>
          <MyTitle>Title 10</MyTitle>
          <MyContent>Content 10</MyContent>ƒ
        </MyTab>
        <MyTab>
          <MyTitle>Title 20</MyTitle>
          <MyContent>Content 20</MyContent>
        </MyTab>
        <MyTab>
          <MyTitle>Title 30</MyTitle>
          <MyContent>Content 30</MyContent>
        </MyTab>
      </MyTabList>
    );
  }
}



class ReactTabContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: [
        { index: 0, title: "Trump", text: "US President" },
        { index: 1, title: "Putin", text: "Russia President" },
        { index: 2, title: "Kim Jong Un", text: "North Korea President" },
        { index: 3, title: "Nguyen Phu Trong", text: "Vietnam President" }
      ],
    }
  }
  render() {
    const title = this.state.tabList.map((x) => {
      return (<Tab key={x.id}>{x.title}</Tab>)

    });
    const text = this.state.tabList.map((x) => {
      return (<TabPanel key={x.id}>{x.text}</TabPanel>)
    });
    const displayTab = (
      <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
        <TabList>
          {title}
        </TabList>
        {text}
      </Tabs >
    );
    return (
      <div>
        {displayTab}
      </div>

    );
  }
}


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <button>  {this.state.date.toLocaleTimeString()}
      </button>
    );
  }
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
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
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    };
    this.calculateWinner = this.calculateWinner.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  calculateWinner(squares) {
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

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Play #' + move :
        'Reset';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }


    return (
      <div>
        <TabContainer />
      </div>
      // <div className="game">

      //     <div className="game-board">
      //       <Board
      //         squares={current.squares}
      //         onClick={(i) => this.handleClick(i)}
      //       />
      //     </div>
      //     <div className="game-info">
      //       <div>{status}</div>
      //       <ol>{moves}</ol>
      //     </div>
      //     <div>
      //       <Clock />
      //     </div>
      //   </div>
      // </div>
    );
  }
}


export default Game;
