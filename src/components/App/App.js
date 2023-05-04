import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Board } from '../Board/Board'
import { ScoreBoard } from '../ScoreBoard/ScoreBoard';
import { Footer } from '../Footer/Footer';

import './App.css';
import { WinnerBoard } from '../WinnerBoard/WinnerBoard';

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const App = () => {

  const [turn, setTurn] = useState('X');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScores] = useState({
    X: 0,
    O: 0
  });
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await axios.get('https://6438098cc1565cdd4d647cb0.mockapi.io/winners');
        const winners = response.data;
        const newScores = { X: 0, O: 0 };
        winners.forEach((winner) => {
          newScores[winner.name] = winner.score;
        });
        setScores(newScores);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWinners();
  }, []);

  const reset = () => {
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  }

  const checkWinner = newSquare =>{
    for(let i = 0; i < winningPositions.length; i++) {
      const [x,y,z] = winningPositions[i];
      if(newSquare[x] && newSquare[x] === newSquare[y] && newSquare[x] === newSquare[z]) {
        endGame(newSquare[x], winningPositions[i]);
        return
      }
    }

    if(!newSquare.includes(null)) {
      endGame(null, Array.from(Array(10).keys()));
      return
    }
    setTurn(turn === 'X' ? 'O':'X')
  }

  const handleClick = square => {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setSquares(newSquares);
    checkWinner(newSquares);
  }

  const saveWinner = async (winner) => {
    try {
      const response = await axios.post('https://6438098cc1565cdd4d647cb0.mockapi.io/winners', winner);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const endGame = (result, winningPositions) => {
    setTurn(null);
    if (result !== null) {
      setScores({
        ...score,
        [result]: score[result] + 1,
      });
      const winner = {
        name: result,
        score: score[result] + 1,
        fecha: new Date().toString()
      };
      saveWinner(winner);
      const newWinner = { name: result, score: score[result], fecha: new Date().toString() };
      setWinners([...winners, newWinner]);
    }
    setWinningSquares(winningPositions);
    setTimeout(reset, 2000);
  };
  

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Board 
      winningSquares={winningSquares}
      turn={turn} 
      squares={squares} 
      onClick={handleClick}
      />
      <ScoreBoard 
      scoreO={score.O}
      scoreX={score.X}
      />
      <WinnerBoard winners={winners} />
      <Footer />
    </div>
  );
}

