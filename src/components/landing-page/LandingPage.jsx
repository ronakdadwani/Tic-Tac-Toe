import { useState } from "react";
import './LandingPage.css'

function LandingPage({startGame}){
    const [playerX , setPlayerX] =  useState('')
    const [playerO , setPlayerO ] = useState('')

    const handleStartGame = () =>{
        if(playerX && playerO) {
            startGame(playerX , playerO)
        } else {
            alert("Please enter player names to start the game")
        }
    } ;

    return (
        <div className="landing-page">
                <h1>Welcome to Tic Tac Toe</h1>
                <p>Challenage your friends in this classic game of strategy and fun.</p>
                <h2>Enter Your name</h2>
                <input 
                    type="text"
                    placeholder="Enter Player x name"
                    value={playerX}
                    onChange={(e)=> setPlayerX(e.target.value)}
                 />
                 <input 
                type="text"
                placeholder="Enter Player Y name"
                value={playerO}
                onChange={(e)=> setPlayerO(e.target.value)}
                 />
                <button onClick={handleStartGame}>Start Game</button>
            </div>
    )
}

export default LandingPage;