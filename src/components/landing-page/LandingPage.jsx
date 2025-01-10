import React, { useEffect, useRef } from "react"; 
import './LandingPage.css';
import bgSoundFile from '../../Assets/sound1.mp3';
import clickSoundFile from '../../Assets/sound2.mp3';

function LandingPage({ startGame}) {
    const [isReady, setIsReady] = useState(false);
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');
    const audioRef = useRef(new audio(bgSoundFile)); // Create a reference to the audio element
    const keySoundRef = useRef(new audio(clickSoundFile)); // Create a reference to the audio element
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
        window.addEventListener('click', enableAudio);

        return () => {
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
