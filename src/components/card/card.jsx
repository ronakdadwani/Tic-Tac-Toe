import Icon from "../icon/icon";
import './Card.css';

function Card({ gameEnd, player, onPlay, index, clickSoundX, clickSoundO }) {
    let icon = <Icon />;
    if (player === 'X') {
        icon = <Icon name="cross" />;
    } else if (player === 'O') {
        icon = <Icon name="circle" />;
    }

    // Play click sound based on the current player
    const playClickSound = () => {
        if (player === '') {
            if (clickSoundX && clickSoundO) {
                const sound = player === 'O' ? clickSoundO : clickSoundX;
                sound.play();
            }
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
