import Icon from "../icon/icon";
import './Card.css';
import clickSoundFile from '../../Assets/clicksound.mp3';
import { useRef } from 'react';
import PropTypes from 'prop-types';


// const clickSound = new Audio(clickSoundFile);    


function Card({ gameEnd, player, onPlay, index }) {
    let icon = <Icon />;
    if (player === 'X') {
        icon = <Icon name="cross" />;
    } else if (player === 'O') {
        icon = <Icon name="circle" />;
    }

    // Preload click sound
    const clickSoundRef = useRef();
    if (!clickSoundRef.current) {
        clickSoundRef.current = new Audio(clickSoundFile);
    }

    // Play click sound based on the current player
    const playClickSound = () => {
        if (!gameEnd) {
            const clickSound = clickSoundRef.current;
            clickSound.currentTime = 0;
            clickSound.play().catch((error) => { 'error playing sound:', error });
        }
    };

    // Handle card click
    const handleClick = () => {
        if (!gameEnd && player === '') {
            playClickSound();
            onPlay(index);
        }
    };

    // Handle keyboard events for accessibility
    const handleKeyDown = (e) => {
        if (!gameEnd && player === '' && (e.key === 'Enter' || e.key === ' ')) {
            playClickSound();
            onPlay(index);
        }
    };

    // Determine card state for styling
    const isClickable = !gameEnd && player === '';
    const cardClass = `card${isClickable ? ' card-clickable' : ''}${gameEnd && player === '' ? ' card-disabled' : ''}${player ? ' card-animated' : ''}`;

    return (
        <div
            className={cardClass}
            onClick={handleClick}
            role="button"
            tabIndex={isClickable ? 0 : -1}
            aria-disabled={!isClickable}
            aria-label={player ? `Cell marked ${player}` : 'Empty cell, press to play'}
            onKeyDown={handleKeyDown}
        >
            {icon}
        </div>
    );
}

Card.propTypes = {
    gameEnd: PropTypes.bool.isRequired,
    player: PropTypes.string.isRequired,
    onPlay: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default Card;
