import { useEffect, useState } from "react";
import Card from '../card/card'
import './Grid.css';
import isWinner from "../helpers/checkWinner";
import LandingPage from "../landing-page/LandingPage";



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

    // player winner announcement sound
    useEffect(()=>{
        if(winner) {
            const winnerSound = new Audio(
                winner === "Draw"
                ? '/draw-sound.mp3'
                :`/winner-${winner === playerX ? 'x' : 'o'} -sound.mp3  ` 
            )

            winnerSound.play();
        }
    });


    // function to handle player move 

    function play(index){
        if(board[index] !== '') return; // prevent clicking on already filled squares

        const newBoard = [...board]; // create a corp of board
        newBoard[index] = turn ? 'O' : 'X'; // mark the move on the board
        const currentPlayer = turn ? 'O' : 'X';
        const win = isWinner(newBoard , currentPlayer); // check if there's a winner

        if(win){
            setWinner(turn ? playerO : playerX) // set the winner 
        } else if (newBoard.every(cell => cell !== '')){
            setWinner("Draw")
        };
        setBoard(newBoard); // update the board state
        setTurn(!turn); // switch turns
    }; 

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
                            />
                        ))}
                    </div>
                </>
            )} 
        </div>
    );
}

export default Grid;