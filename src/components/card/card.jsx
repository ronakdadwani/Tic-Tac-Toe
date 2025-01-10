import Icon from "../icon/icon";
import './Card.css';
import clickSoundFile from '../../Assets/clicksound.mp3';


// const clickSound = new Audio(clickSoundFile);


function Card({ gameEnd, player, onPlay, index, }) {
    let icon = <Icon />;
    if (player === 'X') {
        icon = <Icon name="cross" />;
    } else if (player === 'O') {
        icon = <Icon name="circle" />;
    }

    // Play click sound based on the current player
    const playClickSound = () => {
        if(!gameEnd){

            const clickSound = new Audio(clickSoundFile);        
            clickSound.play().catch((error) => {'error playing sound:' , error});
        }
    };

    // Handle card click
    const handleClick = () => {
        if (!gameEnd && player === '') {
            playClickSound();
            onPlay(index);
        }
    };

    return (
        <div className="card" onClick={handleClick}>
            {icon}
        </div>
    );
}

export default Card;
