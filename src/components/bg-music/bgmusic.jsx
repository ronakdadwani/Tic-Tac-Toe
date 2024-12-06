import React, {useRef , useEffect} from 'react'

const backgroundMusic = ({src}) =>{
    const audioRef = useRef(null);

    useEffect(() =>{
        if(audioRef.current) {
            audioRef.current.play().catch(()=>{
                console.log('User interaction required to play');
                
            });
        }
    
    },[]);

    return (
        <audio src={audioRef} loop >
            <source src={src} type='audio/mpeg'/>
            Your browser does not support the auido element..
        </audio>
    )
}

export default backgroundMusic;