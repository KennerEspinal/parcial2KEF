import React from "react";

import './ScoreBoard.css'

export const ScoreBoard = ({scoreX, scoreO}) => {
    return (
        <div className="scoreBoard">
            <div>{scoreX}</div>
            <div>{scoreO}</div>
        </div>
    );
}