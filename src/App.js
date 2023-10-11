import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";

const cardImages=[
	{"src":'./Photo/helmet-1.png',matched:false},
	{'src':'./Photo/potion-1.png',matched:false},
	{'src':'./Photo/ring-1.png',matched:false},
	{'src':'./Photo/scroll-1.png',matched:false},
	{'src':'./Photo/shield-1.png',matched:false},
	{'src':'./Photo/sword-1.png',matched:false}
]

function App() {
	//states
	const [cards,setCards]=useState([])
    const [turns, setTurns] = useState(0);
	const[choiceOne,setChoiceOne]=useState(null)
	const[choiceTwo,setChoiceTwo]=useState(null)
	const [disabled,setDisabled]=useState(false)

	const handleChoice=(card)=>{
		if(card.id===choiceOne?.id){
			return
		}
				choiceOne ? setChoiceTwo(card):setChoiceOne(card)
	
		
		
	}

	//Starting game automatically
	useEffect(()=>{
		shuffleCards()

	},[])

	//compare two selected cards
	useEffect(()=>{
		if(choiceOne && choiceTwo){
					setDisabled(true)

			
		if(choiceOne.src===choiceTwo.src){
			setCards(prevCards => {
				return prevCards.map((card)=>{

					if(card.src === choiceOne.src){
						return {...card,matched:true}
					}else{
						return card
					}
				})
			})
			resetTurn()
		}else{
			console.log('cards do not match');
			resetTurn()
		}
		}


	},[choiceOne,choiceTwo])

	console.log(cards);

	const resetTurn=()=>{
		setTimeout(()=>{
				setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(prevTurns => prevTurns+1)
		setDisabled(false)

		},500)
	
		

	}
	


	//to shuffle cards
	const shuffleCards=()=>{        // executes when new game is clicked , which shuffles the cards and also set it to cards state and initialize turns to 0
		const shuffleCards= [...cardImages,...cardImages]
		.sort(()=>Math.random() - .5)      // to shuffle the cards based on the retuns values 1,0 and -1
		.map((ele)=>({...ele,id:Math.random()})) // includes a new key id with random values . () for returing the result within the same line
		setChoiceOne(null)
		setChoiceTwo(null)
		setCards(shuffleCards)
		setTurns(0)


	}
	console.log(cards,turns);
	return (
		<div className="App">
			
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>
					<div className="card-grid">

						{cards.map((card)=>{
							return (
								<Card
								 key={card.id}
								 card={card} 
								handleChoice={handleChoice}
								flipped={card===choiceOne || card === choiceTwo || card.matched}
								disabled={disabled}
								  />
							)
						})}
					</div>
					<div className="turns">TURNS : {turns}</div>

		</div>
	);
}

export default App;
