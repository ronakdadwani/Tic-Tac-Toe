import { useEffect, useState } from "react";
import Card from '../card/card'
import './Grid.css';
import isWinner from "../helpers/checkWinner";
import LandingPage from "../landing-page/LandingPage";
import Scoreboard from "../Scoreboard/Scoreboard"
import clickSoundXFile from './Assets/clicksound/click1.mp3'
import clickSoundOFile from './Assets/clicksound/click1.mp3'

const   clickSoundX = new audio(clickSoundFile)
const   clickSoundO = new audio(clickSoundFile)



function Grid({numberOfCards}){
    const [board , setBoard] =  useState(Array(numberOfCards).fill(""));
    const [turn , setTurn] = useState(true); // true => 0 , false => X turn hai
    const [winner , setWinner] = useState(null);

    // new state for storing player names
    const [playerX , setPlayerX] =useState('')
    const [playerO , setPlayerO] =useState('')
    const [gameStarted , setGameStarted] =useState(false)
    const [isNewGame , setIsNewGame] = useState(false) // state for new game option
    const [rematchCount , setRematchCount] = useState(0);

    const [scoreX , setScoreX] = useState(0); // player x score
    const [scoreO , setScoreO] = useState(0); // player O score


    // player winner announcement sound
    useEffect(() => {
        if (winner && winner !== "Draw") {
            const announcement = `Winner is ${winner}`;
            const utterance = new SpeechSynthesisUtterance(announcement);
            utterance.lang = "en-US"; // Set language
            utterance.pitch = 1; // Adjust pitch
            utterance.rate = 1; // Adjust rate
            window.speechSynthesis.speak(utterance);
        } else if (winner === "Draw") {
            const utterance = new SpeechSynthesisUtterance("It's a Draw");
            utterance.lang = "en-US";
            window.speechSynthesis.speak(utterance);
        }
    }, [winner]); // Runs every time the winner changes

    // function to handle player move 
    function play(index) {
        if (board[index] !== '') return; // Prevent clicking on already filled squares
    
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
    
      

        // start new game
        const startGame = (pX , pO) => {
        setPlayerX(pX)
        setPlayerO(pO)
        setGameStarted(true)
        setRematchCount(0);
    }
        // reset function
        const reset= ()=> {
            if (winner === "Draw" && rematchCount === 1){
                // after second draw , reset t main screen
                setGameStarted(false)
                setIsNewGame(false)
                setRematchCount(0); // increment rematch count
            } else if(winner === "Draw"){
                setTurn(true)
                setWinner(null)
                setBoard(Array(numberOfCards).fill(''))
                setRematchCount(rematchCount + 1 )
            } 
            else {
                setTurn(true)
                setWinner(null)
                setBoard(Array(numberOfCards).fill(""))
            }
    }

    
    // start a new game with new player name 
    const startNewGame = () =>{
        setPlayerX('');
        setPlayerO('');
        setGameStarted(false);
        setBoard(Array(numberOfCards).fill(''))
        setTurn(true)
        setIsNewGame(false);
        setRematchCount(0)

    }

    // continue with the existing player 

   

    return (
        <div className="grid-wrapper">
            {!gameStarted ? (
                <LandingPage startGame={startGame} />
            ) : (
                <>

                <>
                    <Scoreboard

                    playerX={playerX}
                    playerO={playerO}
                    scoreX={scoreX}
                    scoreO={scoreO}
                    />
                </>
                    {winner && (
                        <>
                            <h1 className="turn-highlight">
                                {winner === "Draw" ? "It's a Draw" : `Winner is ${winner}`}
                            </h1>
                            <button className="reset" onClick={reset}>Start New Game</button>
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
                                clickSoundX={clickSoundX}
                                clickSoundO={clickSoundO}
                            />
                        ))}
                    </div>
                </>
            )} 
        </div>
    );
}

export default Grid;