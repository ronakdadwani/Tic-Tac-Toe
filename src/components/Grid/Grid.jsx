import { useState } from "react";
import Card from '../card/card'
import './Grid.css';
import isWinner from "../helpers/checkWinner";
import LandingPage from "../landing-page/landingpage";



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
    }
        // reset function
        const reset= ()=> {
            if (winner === "Draw" && rematchCount === 1){
                // if it is the second drwa , go to the main screen
                setGameStarted(false)
                setIsNewGame(false)
                setRematchCount(0)
            } else if (winner === "Draw"){
                // allow  one match
                setRematchCount(rematchCount + 1);
            } else {

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
        setIsNewGame(false);
        setRematchCount(0)

    }

    // continue with the existing player 

    const continueWithExistingGame = () =>{
        setGameStarted(true);
        setWinner(null)
        setBoard(Array(numberOfCards).fill(''));
        setTurn(true);
        setIsNewGame(false);
        setRematchCount(0);
    }
       

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
                                <button className="rematch" onClick={reset}>Rematch</button>
                            )}
                        </>
                    )}

                    {!winner && (
                        <h1 className="turn-highlight">
                            Current Turn: {turn ? playerO : playerX}
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

            {isNewGame && (
                <div className="new-game-option">
                    <h2>Do You Want To Start a New Game</h2>
                    <button onClick={startNewGame}>Enter New Player Name </button>
                    <button onClick={continueWithExistingGame}>Continue With Existing Players</button>
                </div>
            )}
        </div>
    );
}

export default Grid;