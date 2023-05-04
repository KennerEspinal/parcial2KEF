import React from "react";
import './Square.css';
import classNames from "classnames";

export const Square = ({value, onClick, turn, winner}) => {
    const handleClick = () => {
       (turn !== null && value === null) && onClick();
    }

    let squareClass = classNames ({
        Square: true,
        [`Square--${value}`]: value !== null,
        winner: winner
    })
    return (
        <div className={squareClass} onClick={() => handleClick()}>
        </div>
    );
}