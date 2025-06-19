import React from "react";
import '../Scoreboard/Scoreboard.css'

function Scoreboard({playerX , playerO , scoreX , scoreO}) {
    return (
        <div className="scoreboard">
            <h1 className="scoreboard-title">Game Score</h1>
            <div className="scoreboard-content">
                <div className="player-score player-x">
                    <div className="player-info">
                        <h2>{playerX || 'Player X'}</h2>
                        <div className="score-display">
                            <span className="score-label">Score</span>
                            <span className="score-value">{scoreX}</span>
                        </div>
                    </div>
                </div>
                <div className="scoreboard-divider"></div>
                <div className="player-score player-o">
                    <div className="player-info">
                        <h2>{playerO || 'Player O'}</h2>
                        <div className="score-display">
                            <span className="score-label">Score</span>
                            <span className="score-value">{scoreO}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Scoreboard;