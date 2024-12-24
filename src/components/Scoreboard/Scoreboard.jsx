import React from "react";
import '../Scoreboard/Scoreboard.css'

function Scoreboard({playerX , playerO , scoreX , scoreO}) {
    return (
        <div className="scoreboard">
            <div className="player-score">
                <h2>{playerX || 'Player X'}</h2>
                <p>Score X : {scoreX}</p>
            </div>
            <div className="player-score">
                <h2> {playerO || 'Player O'} </h2>
                <p>Score O : {scoreO}</p>
            </div>
        </div>
    )
}

export default Scoreboard;