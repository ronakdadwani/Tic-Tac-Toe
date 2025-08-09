import { useEffect, useState, useCallback, useRef } from "react";
import Card from '../card/card';
import './Grid.css';
import isWinner from "../helpers/checkWinner";
import LandingPage from "../landing-page/LandingPage";
import Scoreboard from "../Scoreboard/Scoreboard";
import { makeAIMove } from "../helpers/ai";
// Add these imports for hint logic
import { getRandomMoveWithReason, getMediumMoveWithReason, findBestMoveWithReason } from "../helpers/ai";
import clickSoundFile from "../../Assets/clicksound.mp3";

function yesGrid({ numberOfCards }) {
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(false); // false => X, true => O
    const [winner, setWinner] = useState(null);
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [isNewGame, setIsNewGame] = useState(false);
    const [rematchCount, setRematchCount] = useState(0);
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);
    const [gameMode, setGameMode] = useState('pvp');
    const [isAITurn, setIsAITurn] = useState(false);
    const [aiDifficulty, setAiDifficulty] = useState('hard'); // New state for AI difficulty
    const [hintMessage, setHintMessage] = useState(""); // State for hint message
    const clickSoundRef = useRef();

    if (!clickSoundRef.current) {
        clickSoundRef.current = new Audio(clickSoundFile);
    }

    // Player winner announcement sound
    useEffect(() => {
        if (winner && winner !== "Draw") {
            const announcement = `Winner is ${winner}`;
            const utterance = new SpeechSynthesisUtterance(announcement);
            utterance.lang = "en-US";
            utterance.pitch = 1;
            utterance.rate = 1;
            window.speechSynthesis.speak(utterance);
        } else if (winner === "Draw") {
            const utterance = new SpeechSynthesisUtterance("It's a Draw");
            utterance.lang = "en-US";
            window.speechSynthesis.speak(utterance);
        }
    }, [winner]);

    // Function to handle player move
    const play = useCallback((index, isAICall = false) => {
        if (board[index] !== '' || winner) {
            return;
        }

        // Prevent human from playing during AI's turn
        if (gameMode === 'ai' && isAITurn && !isAICall) {
            return;
        }

        const newBoard = [...board];
        const currentPlayer = turn ? 'O' : 'X';
        newBoard[index] = currentPlayer;

        const win = isWinner(newBoard, currentPlayer);
        const isDraw = !win && newBoard.every((cell) => cell !== '');

        if (!isDraw) {
            const clickSound = clickSoundRef.current;
            clickSound.currentTime = 0;
            clickSound.play().catch((error) => { 'error playing sound:', error });
        }

        if (win) {
            setWinner(turn ? playerO : playerX);
            if (turn) {
                setScoreO((prevScore) => prevScore + 1);
            } else {
                setScoreX((prevScore) => prevScore + 1);
            }
        } else if (isDraw) {
            setWinner("Draw");
        }

        setBoard(newBoard);
        setTurn(prevTurn => !prevTurn);
        
        if (gameMode === 'ai') {
            setIsAITurn(prevIsAITurn => !prevIsAITurn);
        }
    }, [board, winner, gameMode, isAITurn, turn, playerO, playerX, setBoard, setWinner, setScoreO, setScoreX, setTurn, setIsAITurn]);

    // Handle AI moves
    useEffect(() => {
        if (gameMode === 'ai' && isAITurn && !winner) {
            const aiMoveTimeout = setTimeout(() => {
                makeAIMove([...board], (moveIndex) => play(moveIndex, true), aiDifficulty);
            }, 800); // 0.8-second delay

            return () => clearTimeout(aiMoveTimeout);
        }
    }, [isAITurn, board, gameMode, winner, play, aiDifficulty]);

    // Function to get hint for the current player
    const getHint = () => {
        if (winner) return;
        let moveObj = { move: -1, reason: '' };
        if (aiDifficulty === "easy") {
            moveObj = getRandomMoveWithReason(board);
        } else if (aiDifficulty === "medium") {
            moveObj = getMediumMoveWithReason(board);
        } else {
            moveObj = findBestMoveWithReason(board);
        }
        if (moveObj.move !== -1) {
            setHintMessage(`Hint: Try cell ${moveObj.move + 1} (${moveObj.reason})`); // +1 for user-friendly index
        } else {
            setHintMessage("No moves available for a hint.");
        }
    };
    // Clear hint after a move
    useEffect(() => {
        setHintMessage("");
    }, [board]);

    // Start new game
    const startGame = (pX, pO, mode, difficulty) => {
        setPlayerX(pX);
        setPlayerO(mode === 'ai' ? 'AI' : pO);
        setGameMode(mode);
        setGameStarted(true);
        setRematchCount(0);
        setIsAITurn(false);
        setTurn(false); // X goes first
        setAiDifficulty(difficulty); // Set AI difficulty
    };

    // Reset function (now used for draw/rematch)
    const reset = () => {
        setTurn(false); // X goes first
        setWinner(null);
        setBoard(Array(numberOfCards).fill(''));
        setIsAITurn(false);

        if (winner === "Draw" && rematchCount === 1) {
            setGameStarted(false);
            setIsNewGame(false);
            setRematchCount(0);
        } else if (winner === "Draw") {
            setTurn(false);
            setWinner(null);
            setBoard(Array(numberOfCards).fill(''));
            setRematchCount(rematchCount + 2);
        } else {
            setTurn(false);
            setWinner(null);
            setBoard(Array(numberOfCards).fill(""));
        }
    };

    // Start a new round after a win (scores kept)
    const startNextRound = () => {
        setTurn(false); // X goes first
        setWinner(null);
        setBoard(Array(numberOfCards).fill(''));
        setIsAITurn(false);
    };

    // Start a new game with new player names
    const startNewGame = () => {
        setPlayerX('');
        setPlayerO('');
        setGameStarted(false);
        setBoard(Array(numberOfCards).fill(''));
        setTurn(false);
        setIsNewGame(false);
        setRematchCount(0);
        setWinner(null);
        setScoreX(0);
        setScoreO(0);
        setGameMode('pvp');
        setIsAITurn(false);
        setAiDifficulty('hard'); // Reset AI difficulty to default
    };

    return (
        <div className="grid-wrapper">
            {!gameStarted ? (
                <LandingPage startGame={startGame} />
            ) : (
                <>
                    <button className="home-button" onClick={startNewGame}>
                        <span className="home-icon">🏠</span>
                        Home
                    </button>
                    <Scoreboard
                        playerX={playerX}
                        playerO={playerO}
                        scoreX={scoreX}
                        scoreO={scoreO}
                    />
                    {winner && (
                        <>
                            <h1 className="turn-highlight">
                                {winner === "Draw" ? "It's a Draw" : `Winner is ${winner}`}
                            </h1>
                            {winner !== "Draw" && (
                                <button className="reset-game" onClick={startNextRound}>One More Game</button>
                            )}
                            {winner === "Draw" && (
                                <button className="rematch" onClick={reset}>
                                    {rematchCount === 1 ? "Final Match - End Game" : "Rematch"}
                                </button>
                            )}
                        </>
                    )}
                    {!winner && (
                        <h1 className="turn-highlight">
                            {turn ? playerO : playerX ? `It is now ${turn ? playerO : playerX}'s turn!` : 'Waiting for player...'}
                        </h1>
                    )}
                    {gameStarted && !winner && (
                        <button onClick={getHint} style={{ marginBottom: "1rem", padding: "8px 20px", fontSize: "18px", borderRadius: "8px", background: "#f1c40f", color: "#2c3e50", border: "none", cursor: "pointer" }}>
                            Hint
                        </button>
                    )}
                    {hintMessage && (
                        <div style={{ marginBottom: "1rem", fontSize: "20px", color: "#f1c40f", fontWeight: "bold", textShadow: "0 0 8px #2c3e50" }}>
                            {hintMessage}
                        </div>
                    )}
                    <div className="grid">
                        {board.map((el, idx) => (
                            <Card
                                key={idx}
                                gameEnd={winner ? true : false}
                                onPlay={(i) => play(i, false)} // Human calls play with isAICall = false
                                player={el}
                                index={idx}
                                isDraw={winner === "Draw"}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Grid;