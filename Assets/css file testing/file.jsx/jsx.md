import React, { useEffect, useState, useRef } from "react";
import './LandingPage.css';

function LandingPage({ startGame }) {
    const [isReady, setIsReady] = useState(false);
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');
    const audioRef = useRef(null); // Background music reference
    const keySoundRef = useRef(null); // Keypad sound reference
    const [isAudioEnabled, setIsAudioEnabled] = useState(false); // Track audio state

    useEffect(() => {
        setIsReady(true);

        const enableAudio = () => {
            if (!isAudioEnabled && audioRef.current) {
                audioRef.current.muted = false; // Unmute audio
                audioRef.current.volume = 0.3; // Set volume
                audioRef.current
                    .play()
                    .then(() => setIsAudioEnabled(true))
                    .catch((err) => console.error("Audio playback error:", err));
            }
        };

        // Add listeners for both mousemove and click events
        window.addEventListener('mousemove', enableAudio);
        window.addEventListener('click', enableAudio);

        // Cleanup event listeners
        return () => {
            window.removeEventListener('mousemove', enableAudio);
            window.removeEventListener('click', enableAudio);
        };
    }, [isAudioEnabled]);

    const handleKeySound = (event) => {
        if (!event.repeat && keySoundRef.current) {
            keySoundRef.current.currentTime = 0; // Restart sound
            keySoundRef.current.play();
        }
    };

    const handleStartGame = () => {
        if (playerX && playerO) {
            startGame(playerX, playerO);
        } else {
            alert("Please enter player names!");
        }
    };

    return (
        <div className={`landing-page ${isReady ? "ready" : ''}`}>
            {/* Background Music */}
            <audio ref={audioRef} loop muted>
                <source src="./Assets/music/sound1.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/* Keypad Sound */}
            <audio ref={keySoundRef}>
                <source src="./Assets/music/sound2.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/* Game Title */}
            <h1 className="welcome-title">Tic Tac Toe</h1>

            {/* Player Input Section */}
            <div className="player-input-section">
                <h2>Enter Player Names</h2>
                <div className="input-fields">
                    <input
                        type="text"
                        placeholder="Player X Name"
                        value={playerX}
                        onChange={(e) => setPlayerX(e.target.value)}
                        onKeyDown={handleKeySound}
                    />
                    <input
                        type="text"
                        placeholder="Player O Name"
                        value={playerO}
                        onChange={(e) => setPlayerO(e.target.value)}
                        onKeyDown={handleKeySound}
                    />
                </div>
                <button onClick={handleStartGame}>Start Game</button>
            </div>
        </div>
    );
}

export default LandingPage;
