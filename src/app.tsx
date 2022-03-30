import React, { useState } from "react"



import DeckList from "./deckList"
import BattleField from './battlefield'


type deckObj = {
  commander: string;
  partner: string | null;
  deckList: string[];
}

function App(){
  const [deck, SetDeck] = useState<deckObj | null>(null)
  const [play, setPlay] = useState(false)
  const handleTransmit = (deckObj: deckObj) => {
    //go through deck list and make sure commanders have been removed
    deckObj.deckList = deckObj.deckList.filter((card) => !card.includes(deckObj.commander || (deckObj.partner || '')))
    SetDeck(deckObj)
    setPlay(true)
  }

  return(
    <div>
      {play ? <BattleField deck={deck}/> : <DeckList onTransmit={handleTransmit}/>}
    </div>
  )
} 

export default App