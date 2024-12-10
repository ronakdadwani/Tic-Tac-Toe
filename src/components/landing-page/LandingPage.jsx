import React, { useEffect, useState, useRef } from "react";
import './LandingPage.css';


function LandingPage({ startGame }) {
    const [isReady ,setIsReady] = useState(false);
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');
    const [isTyping , setIsTyping] = useState(false) // track typing status
    const audioRef = useRef(null) //    background music 
    const keySoundRef = useRef(null) // keppad soundd
    const [inputActive , setInputActive] = useState(false) // track input click 
    useEffect(()=>{
        // simulates css load or dom rediness
        setIsReady(true)

        
        const enableAudioOnMouse = ()=>{
            if(audioRef.current){
                audioRef.current.muted = false;
                audioRef.current.volume = 0.3
                audioRef.current.play().catch((err1)=>{
                    console.log('Audi playback error' , err1);
                    
                });
            }

            window.removeEventListener('mousemove' , enableAudioOnMouse)
        }
         
        window.addEventListener('mousemove' , enableAudioOnMouse);

        return ()=>{
            window.removeEventListener('mousemove' , enableAudioOnMouse)
        }
        },[])

    const handleKeySound = (event)=>{
        if(inputActive &&!event.repeat){
           if(keySoundRef.current){
            console.log(`key pressed ${event.keySoundRef}`);
            keySoundRef.current.currentTime = 0;
            keySoundRef.current.play();
           }
        }

    };
     
    const handleInputCLick = () =>{
        setInputActive(true) // input field is active
    }
    
    const handleTyping = (isTyping) =>{
        setIsTyping(isTyping); // update typing status
        if(audioRef.current){
            if(isTyping){
                audioRef.current.pause(); // pause music while typing

            } else {
                audioRef.current.play(); /// resume music when not typing
            }
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


            {/**keypad sound */}
            <audio ref={keySoundRef}>
                <source src="./Assets/music/sound2.mp3" />
                Your browser does not support the audio element..
            </audio>

            
            


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
                        onClick={handleInputCLick} // acitvate key sound
                        onFocus={() => handleTyping(true)} // typing start
                        onBlur={()=>{
                            handleTyping(false)
                            setInputActive(false); // deactivate key sound
                        }}

                        onKeyDown={handleKeySound}

                    />
                    <input
                        type="text"
                        placeholder="Player O Name"
                        value={playerO}
                        onClick={handleInputCLick}// activate key sound
                        onFocus={()=>{
                            handleTyping(false)
                            setInputActive(false)
                        }}
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
