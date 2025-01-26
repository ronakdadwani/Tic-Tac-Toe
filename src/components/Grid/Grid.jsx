import { useEffect, useState } from "react";
import Card from '../card/card';
import './Grid.css';
import isWinner from "../helpers/checkWinner";
import LandingPage from "../landing-page/LandingPage";
import Scoreboard from "../Scoreboard/Scoreboard";

function Grid({ numberOfCards }) {
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true); // true => O, false => X
    const [winner, setWinner] = useState(null);
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [isNewGame, setIsNewGame] = useState(false);
    const [rematchCount, setRematchCount] = useState(0);
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);

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
    function play(index) {
        if (board[index] !== '' || winner) return; // Prevent clicking on already filled squares or if there's a winner

        const newBoard = [...board]; // Create a copy of the board
        newBoard[index] = turn ? 'O' : 'X'; // Mark the move on the board
        const currentPlayer = turn ? 'O' : 'X';
        const win = isWinner(newBoard, currentPlayer); // Check if there's a winner

        // Check for a winner
        if (win) {
            setWinner(turn ? playerO : playerX); // Set the winner's name
            if (turn) {
                setScoreO((prevScore) => prevScore + 1); // Increment player O's score
            } else {
                setScoreX((prevScore) => prevScore + 1); // Increment player X's score
            }
        } else if (newBoard.every((cell) => cell !== '')) {
            // Check for a draw
            setWinner("Draw"); // Handle draw
        }

        // Update the board and toggle the turn
        setBoard(newBoard);
        setTurn(!turn);
    }

    // Start new game
    const startGame = (pX, pO) => {
        setPlayerX(pX);
        setPlayerO(pO);
        setGameStarted(true);
        setRematchCount(0);
    };

    // Reset function
    const reset = () => {
        setTurn(true);
        setWinner(null);
        setBoard(Array(numberOfCards).fill(''));


        if (winner === "Draw" && rematchCount === 1) {
            // After second draw, reset to main screen
            setGameStarted(false);
            setIsNewGame(false);
            setRematchCount(0);
        } else if (winner === "Draw") {
            setTurn(true);
            setWinner(null);
            setBoard(Array(numberOfCards).fill(''));
            setRematchCount(rematchCount + 2);
        } else {
            setTurn(true);
            setWinner(null);
            setBoard(Array(numberOfCards).fill(""));
        }
    };

    // Start a new game with new player names
    const startNewGame = () => {
        setPlayerX('');
        setPlayerO('');
        setGameStarted(false);
        setBoard(Array(numberOfCards).fill(''));
        setTurn(true);
        setIsNewGame(false);
        setRematchCount(0);
        setWinner(null);
        setScoreX(0);
        setScoreO(0);
    };

    return (
        <div className="grid-wrapper">
            {!gameStarted ? (
                <LandingPage startGame={startGame} />
            ) : (
                <>
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
                                <button className="reset-game" onClick={reset}>Reset Game</button>
                            )}

                            {winner !== "Draw" && (
                                <button className="reset" onClick={startNewGame}>Start New Game</button>
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
                            Current Turn: <br />{turn ? playerO : playerX}
                        </h1>
                    )}
                    <div className="grid">
                        {board.map((el, idx) => (
                            <Card
                                key={idx}
                                gameEnd={winner ? true : false}
                                onPlay={play}
                                player={el}
                                index={idx}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Grid;