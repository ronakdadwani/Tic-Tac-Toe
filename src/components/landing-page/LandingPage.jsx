import React, { useState , useEffect } from "react";
import './LandingPage.css'

function LandingPage({startGame}){
    const [showWelcome , setShowWelcome] = useState(true)// show welcome animation initially
    const [playerX , setPlayerX] =  useState('')
    const [playerO , setPlayerO ] = useState('')


    useEffect( () => {
        const timer = setTimeout(()=>{
            setShowWelcome(false); // hide the welcoe animation after 4 seconds
        },2000)
        return () => clearTimeout(timer);
    }, []);

    const handleStartGame = () =>{
        if(playerX && playerO) {
            startGame(playerX , playerO)
        } else {
            alert("Please enter player names to start the game")
        }
    } ;

    return (
        <div className="landing-page">
            
            {showWelcome ? (
                <div className= {`welcome-section ${showWelcome ? "show" : ""}`}>
                    
                    <h1 className="welcome-title">Tic Tac Toe</h1>
                    <p className="welcome-message">
                        Challenge your friends in this classic game of strategy and fun!
                    </p>
                </div>
            ) : (
                <div className= {`player-input-section ${!showWelcome ? "show" : ""}`}>
                    <h2>Enter Player Names</h2>
                    <input 
                    type="text" 
                    placeholder="Player X Name"
                    value={playerX}
                    onChange={(e)=> setPlayerX(e.target.value)}
                    />

                    <input 
                    type="text"
                    placeholder="Player O Name"
                    value={playerO}
                    onChange={(e)=> setPlayerO(e.target.value)}
                     />

                     <button onClick={handleStartGame}>Start Game</button>
                </div>
            )}
        </div>
    );
}

    export default LandingPage;
