import React, { useEffect, useState, useRef } from "react";
import './LandingPage.css';


function LandingPage({ startGame }) {
    const [isReady ,setIsReady] = useState(false);
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');
    const audioRef = useRef(null)

    useEffect(()=>{
        // simulates css load or dom rediness
        setIsReady(true)

        if (audioRef.current){
            audioRef.current.volume = 0.2;
            audioRef.current.play().catch(()=>{
                console.log("user interaction required to play the music");
                
            })
        }

    },[])

    const playMusic = () =>{
        if(audioRef.current){
            audioRef.current.play()
        }
    }
    const handleStartGame = () => {
        if (playerX && playerO) {
            startGame(playerX, playerO);
        } else {
            alert("khelna hai tho nam likhoooo...");
        }
    };

    return (
        <div className={`landing-page ${isReady ? "ready" : ''}`}>
            {/** background music */}
            <audio ref={audioRef} loop>
                <source src="./Assets/music/sound1.mp3" type="audio/mpeg" />
                Your browser dows not support the audio element.
            </audio>
            <button onClick={playMusic}>
                Play Music
            </button>
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
