import { useEffect, useState } from "react";
import Dies from "./Dies";
import { v4 as uuid } from 'uuid';
import Confetti from 'react-confetti'

function App() {

  const [dice,setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
}, [dice])

  function allNewDice(){
    const newDice =[]
    for(let i = 0; i <10; i++){
      newDice.push({
        value: Math.ceil(Math.random()*6),
        isHeld: false,
        id: uuid()
      })
    }
    return newDice
  }

  function rollDice(){
    if(!tenzies){
      setDice(prev => prev.map(die => {
        return die.isHeld ? 
        die:  {
          value: Math.ceil(Math.random()*6),
          isHeld: false,
          id: uuid()
        }
      }))
    }else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id){
    setDice(prev => prev.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} :
      die
    }))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same</p>
      <div className="dice-container">
        {dice.map(die =>(
          <Dies holdDice={()=> holdDice(die.id)} key={die.id} value={die.value} isHeld={die.isHeld} />
        ))}
      </div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
