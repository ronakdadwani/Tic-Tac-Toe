import React, { useEffect, useState } from "react";
import './LandingPage.css';

function LandingPage({ startGame }) {
    const [isReady ,setIsReady] = useState(false);
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');

    useEffect(()=>{
        // simulates css load or dom rediness
        setIsReady(true)
    },[])
    const handleStartGame = () => {
        if (playerX && playerO) {
            startGame(playerX, playerO);
        } else {
            alert("khelna hai tho nam likhoooo...");
        }
    };

    return (
        <div className={`landing-page ${isReady ? "ready" : ''}`}>
            {/* Game Title */}
            <h1 className="welcome-title">Tic Tac Toe</h1>
            
            {/* Player input section */}
            <div className="player-input-section">
                <h2>Enter Player Names</h2>
                <div className="input-fields">
                    <input
                        type="text"
                        placeholder="Player X Name"
                        value={playerX}
                        onChange={(e) => setPlayerX(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Player O Name"
                        value={playerO}
                        onChange={(e) => setPlayerO(e.target.value)}
                    />
                </div>
                <button onClick={handleStartGame}>Start Game</button>
            </div>
        </div>
    );
}

export default LandingPage;
