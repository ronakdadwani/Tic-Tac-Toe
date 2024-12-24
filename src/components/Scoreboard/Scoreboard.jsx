import React from "react";
import '../Scoreboard/Scoreboard.css'

function Scoreboard({playerX , playerO , scoreX , scoreO}) {
    return (
        <div className="scoreboard">
            <div className="player-score">
                <p>Score X : {scoreX}</p>
                <h2>{playerX || 'Player X'}</h2>
            </div>
            <div className="player-score">
                <p>Score O : {scoreO}</p>
                <h2> {playerO || 'Player O'} </h2>
            </div>
        </div>
    )
}

export default Scoreboard;