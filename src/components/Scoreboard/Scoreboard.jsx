import React from "react";
import '../Scoreboard/Scoreboard.css'

function Scoreboard({playerX , playerO , scoreX , scoreO}) {
    return (
        <div className="scoreboard">
            <div className="player-score">
                <h2>{playerX || 'Player X'}</h2>
                <p>Score : {}scoreX</p>
            </div>
            <div className="player-score">
                <h2> {playerO || 'Player O'} </h2>
                <p>Score : {scoreO}</p>
            </div>
        </div>
    )
}

export default Scoreboard;