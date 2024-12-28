import isWinner from "../helpers/checkWinner";
import Icon from "../icon/icon";
import './Card.css'

function Card({gameEnd , player, onPlay , index}){
    let icon = <Icon/>
    if(player === 'X'){
        icon = <Icon name ="cross"/>
    } else if (player === 'O'){
        icon = <Icon name = "circle"/>
    }

    // play muic on card click if it not already playing
    const playClickSound = () =>{
       // const soundFile = turn ? '/o-click-sound.mp3' : 'x-click-sound.mp3'; // this line is for 2 sound effect for different different player 
        const clickSund = new Audio('./Assets/clicksound/click1.mp3')
        clickSund === isWinner
        clickSund.play();
    }
    // handle card click 
    const handleClick = ( )=>{
        if (!gameEnd &&  player === '') {
            playClickSound();
            onPlay(index);
        }
    }
    return (
        <div className="card" onClick={handleClick}>
        {icon}
    </div>
    )

}

export default Card;