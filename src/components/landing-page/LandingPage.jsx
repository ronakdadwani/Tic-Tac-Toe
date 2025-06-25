import React, { useEffect, useRef, useState } from "react"; 
import './LandingPage.css';
import bgSoundFile from '../../Assets/sound1.mp3';
import clickSoundFile from '../../Assets/sound2.mp3';

const HORROR_IMAGES = [
  'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1200&q=80', // creepy house
  'https://images.unsplash.com/photo-1464655646192-3cb2ace7a67e?auto=format&fit=crop&w=1200&q=80', // dark graveyard
];

function LandingPage({ startGame }) {
    const [isReady, setIsReady] = useState(false);
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');
    const [gameMode, setGameMode] = useState('pvp');
    const [aiDifficulty, setAiDifficulty] = useState('hard');
    const [errorMessage, setErrorMessage] = useState('');
    const audioRef = useRef(new Audio(bgSoundFile));
    const keySoundRef = useRef(new Audio(clickSoundFile));
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isMuted, setIsMuted] = useState(false);

    // Carousel state
    const [current, setCurrent] = useState(0);
    const [next, setNext] = useState(1);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        setIsReady(true);
        const enableAudio = () => { 
            if (isAudioEnabled) {
                audioRef.current.muted = isMuted;
                audioRef.current.volume = 0.3;
                audioRef.current.loop = true;
                audioRef.current.play().catch((error) => {'error playing sound:', error});
                setIsAudioEnabled(true);
            }
        }
        window.addEventListener('mousemove', enableAudio);
        window.addEventListener('click', enableAudio);

        return () => {
            window.removeEventListener('mousemove', enableAudio);
            window.removeEventListener('click', enableAudio);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    }, [isAudioEnabled, isMuted]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                handleStartGame();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [playerX, playerO, gameMode, aiDifficulty]);

    // Horror carousel effect
    useEffect(() => {
      const interval = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setCurrent(next);
          setNext((next + 1) % HORROR_IMAGES.length);
          setFade(false);
        }, 900);
      }, 8000);
      return () => clearInterval(interval);
    }, [next]);

    const handleInputChange = (e, player) => {
        if (player === 'X') {
            setPlayerX(e.target.value);
        } else {
            setPlayerO(e.target.value);
        }
        setErrorMessage(''); // Clear error message on input change
        if(keySoundRef.current && isAudioEnabled) {
            keySoundRef.current.play().catch((error) => {'error playing sound:', error});
        }
    };

    const handleKeySound = () => {
        if(keySoundRef.current && isAudioEnabled) {
            keySoundRef.current.play().catch((error) => {'error playing sound:', error});
        }
    };

    const handleGameModeChange = (mode) => {
        setGameMode(mode);
        setErrorMessage(''); // Clear error message on game mode change
        if(keySoundRef.current && isAudioEnabled) {
            keySoundRef.current.play().catch((error) => {'error playing sound:', error});
        }
        if (mode === 'ai') {
            setPlayerO('AI'); // Ensure playerO is set for AI mode
        } else {
            setPlayerO(''); // Reset for PvP
        }
    };

    const handleAiDifficultyChange = (difficulty) => {
        setAiDifficulty(difficulty);
    };

    const handleStartGame = () => {
        if (!playerX.trim()) {
            setErrorMessage("Player X name cannot be empty!");
            return;
        }

        if (gameMode === 'pvp' && !playerO.trim()) {
            setErrorMessage("Player O name cannot be empty in Player vs Player mode!");
            return;
        }

        startGame(playerX.trim(), playerO.trim(), gameMode, aiDifficulty);
    };

    return (
      <div className="landing-bg-carousel-fade">
        <div
          className="landing-bg-img base"
          style={{ backgroundImage: `url(${HORROR_IMAGES[current]})` }}
        ></div>
        <div
          className={`landing-bg-img top${fade ? ' show' : ''}`}
          style={{ backgroundImage: `url(${HORROR_IMAGES[next]})` }}
        ></div>
        <div className="landing-bg-overlay"></div>
        <div className="landing-page">
            <audio ref={audioRef} src={bgSoundFile} autoPlay loop></audio>
            <audio ref={keySoundRef} src={clickSoundFile}></audio>

            <h1 className="welcome-title">Tic Tac Toe</h1>

            <div className="player-input-section">
                <h2>Enter Player Names</h2>
                <div className="input-fields">
                    <input 
                        type="text" 
                        placeholder="Player X" 
                        value={playerX} 
                        onChange={(e) => handleInputChange(e, 'X')} 
                        onKeyDown={handleKeySound}
                        className={errorMessage.includes("Player X") ? 'error' : ''}
                    />
                    {gameMode === 'pvp' && (
                        <input 
                            type="text" 
                            placeholder="Player O" 
                            value={playerO} 
                            onChange={(e) => handleInputChange(e, 'O')} 
                            onKeyDown={handleKeySound}
                            className={errorMessage.includes("Player O") ? 'error' : ''}
                        />
                    )}
                </div>

                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}

                <div className="game-mode-selector">
                    <h3>Select Game Mode</h3>
                    <div className="mode-buttons">
                        <button
                            className={`pvp-button ${gameMode === 'pvp' ? 'active' : ''}`}
                            onClick={() => handleGameModeChange('pvp')}
                        >
                            Player vs Player
                        </button>
                        <button
                            className={`ai-mode-button ${gameMode === 'ai' ? 'active' : ''}`}
                            onClick={() => handleGameModeChange('ai')}
                        >
                            Player vs AI
                        </button>
                    </div>
                </div>

                {gameMode === 'ai' && (
                    <div className="ai-difficulty-selector">
                        <h3>AI Difficulty</h3>
                        <div className="difficulty-buttons">
                            <button
                                className={aiDifficulty === 'easy' ? 'active' : ''}
                                onClick={() => handleAiDifficultyChange('easy')}
                            >
                                Easy
                            </button>
                            <button
                                className={aiDifficulty === 'medium' ? 'active' : ''}
                                onClick={() => handleAiDifficultyChange('medium')}
                            >
                                Medium
                            </button>
                            <button
                                className={aiDifficulty === 'hard' ? 'active' : ''}
                                onClick={() => handleAiDifficultyChange('hard')}
                            >
                                Hard
                            </button>
                        </div>
                    </div>
                )}

                <button 
                    className="start-game-button"
                    onClick={handleStartGame} 
                    disabled={!isReady}
                >
                    Start Game{gameMode === 'ai' ? ` (${aiDifficulty.charAt(0).toUpperCase() + aiDifficulty.slice(1)})` : ''}
                </button>
            </div>
        </div>
      </div>
    );
}

export default LandingPage;