import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react'

type deckObj = {
  commander: string;
  partner: string | null;
  deckList: string[];
}

type deckListProps = {
  onTransmit: (a: deckObj)=>void
}

function DeckList(Props: deckListProps){
  const [commander, setCommander] = useState("Rin and Seri, Inseparable")
  const [commanderPartner, setCommanderPartner] = useState('')
  const [deckList, setDeckList] = useState('')
  const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()

    //handles moxfields MTGA export
    Props.onTransmit({
      commander,
      partner: commanderPartner ? commanderPartner : null,
      deckList: deckList.split('\n')
    })

  }

  return(
    <div>
      <form>
        <label htmlFor='commanderInput'>Commander</label><br/>
        <input id="commanderInput"type="text" onChange={(e) => setCommander(e.currentTarget.value)} value="Rin and Seri, Inseparable"></input><br/>
        <label htmlFor='commanderPartnerInput'>Commander 2 (if partner)</label><br/>
        <input id="commanderPartnerInput"type="text" onChange={(e) => setCommanderPartner(e.currentTarget.value)}></input><br/>
        <label htmlFor='deckList'>Deck list without commander</label><br/>
        <textarea id="deckList"onChange={(e) => setDeckList(e.currentTarget.value)} rows={40} cols={50}></textarea><br/>
        <input type="submit" onClick={handleSubmit}></input><br/>
      </form>
    </div>
  )
}

export default DeckList;