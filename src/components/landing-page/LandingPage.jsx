import React, { useEffect, useRef , useState } from "react"; 
import './LandingPage.css';
import bgSoundFile from '../../Assets/sound1.mp3';
import clickSoundFile from '../../Assets/sound2.mp3';

    function LandingPage({ startGame}) {
    const [isReady, setIsReady] = useState(false);
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');
    const audioRef = useRef(new Audio(bgSoundFile)); // Create a reference to the audio element
    const keySoundRef = useRef(new Audio(clickSoundFile)); // Create a reference to the audio element
    const [isAudioEnabled, setIsAudioEnabled] = useState(true); // Enable or disable audio
    const [isMuted, setIsMuted] = useState(false); // Mute or unmute audio

    useEffect(() =>{
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

    const handleInputChange = (e , setPlayer) => {
        setPlayer(e.target.value);
        if(keySoundRef.current && isAudioEnabled) {
            keySoundRef.current.play().catch((error) => {'error playing sound:', error});
        }
    };

    const handleKeySound = () =>{
        if(keySoundRef.current && isAudioEnabled) {
            keySoundRef.current.play().catch((error) => {'error playing sound:', error});
        }
    }

    const handleStartGame = () => {
        startGame(playerX, playerO);
}
    return (
        <div className="landing-page">
            <audio ref={audioRef} src={bgSoundFile} autoPlay loop></audio>
            <audio ref={keySoundRef} src={clickSoundFile}></audio>

            <h1 className="welcome-title">Tic Tac Toe</h1>

            <div className="player-input-section">
                <h2>Enter Player Names</h2>
                <div className="input-fields">
                    <input type="text" placeholder="Player X" value={playerX} onChange={(e) => handleInputChange(e, setPlayerX)} onKeyDown={handleKeySound} />
                    <input type="text" placeholder="Player O" value={playerO} onChange={(e) => handleInputChange(e, setPlayerO)} onKeyDown={handleKeySound} />
                </div>

                <button onClick={handleStartGame} disabled={!isReady}>Start Game</button>
                {/* <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button> */}
                <button><a href="https://drive.google.com/file/d/1HOfVib-eP6G45_uPkCvpjrNzguUabZ9V/view?usp=sharing" target="_blank"></a>GE INTERNSHIP VIDEO LINK</button>
            </div>

           
        </div>
    )

}

export default LandingPage;