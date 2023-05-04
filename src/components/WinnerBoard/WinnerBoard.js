import React from "react";

export const WinnerBoard = ({ winners }) => {
    return (
      <div>
        <h1>Historial de la partida</h1>
        <div className="winners">
        <ul>
          {winners.map((winner, index) => (
            <li key={index} style={{ margin: "10px 0", fontSize: "18px", color: "#ffebcd" }}>
              Ganador: {winner.name} - fecha: {winner.fecha}
            </li>
          ))}
        </ul>
        </div>
      </div>
    );
  };