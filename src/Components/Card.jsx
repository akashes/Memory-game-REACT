import React from "react";
import './Card.css'

function Card({card,handleChoice,flipped,disabled}) {
	const handleClick=()=>{
		if(!disabled){

					handleChoice(card)

		}

	}

	return (
		<div className="card" >
			<div className={flipped? 'flipped' : " "}>
				<img className="cardFront " src={card.src} alt="card front" />
				<img className="cardBack" onClick={handleClick} src="/Photo/cover.png" alt=" card back" />
			</div>
		</div>
	);
}

export default Card;
