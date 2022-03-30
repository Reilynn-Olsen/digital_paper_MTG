import React, { useState, useEffect } from 'react';
import '../public/css/battlefield.css';

import Attacks from './zones/attack';
import CommandZone from './zones/commandZone';
import Creatures from './zones/creatures';
import Deck from './zones/deck';
import Exile from './zones/exile';
import Graveyard from './zones/graveyard';
import Hand from './zones/hand';
import Permanents from './zones/permanents';
import DropDown from './dropDown';

type deck = {
  commander: string;
  partner: string | null;
  deckList: string[];
};

type battlefieldProps = {
  deck: deck | null;
};

type scryfallData = {
  name: string;
  type_line: string;
  image_uris: {
    small: string;
    normal: string;
  };
};

function BattleField(Props: battlefieldProps) {
  const [commandZoneCards, setCommandZoneCards] = useState<card[]>([]);
  const [deckCards, setDeckCards] = useState<card[]>([]);
  const [handCards, setHandCards] = useState<card[]>([]);
  const [exileCards, setExileCards] = useState<card[]>([]);
  const [graveyardCards, setGraveyardCards] = useState<card[]>([]);
  const [attacksCards, setAttacksCards] = useState<card[]>([]);
  const [creaturesCards, setCreaturesCards] = useState<card[]>([]);
  const [permanentsCards, setPermanentsCards] = useState<card[]>([]);
  const [dropDown, setDropDown] = useState<dropDownObj>({
    visible: false,
    x: 0,
    y: 0,
    options: [],
  });
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (Props.deck) {
      //todo: add error handling if a card can't be found
      fetch(
        `https://api.scryfall.com/cards/named?exact=${Props.deck.commander}`
      )
        .then((res) => res.json())
        .then((data: scryfallData) =>
          setCommandZoneCards((commandZoneCards) => [
            ...commandZoneCards,
            {
              name: data.name,
              type: data.type_line,
              images: {
                small: data.image_uris.small,
                normal: data.image_uris.normal,
              },
              tapped: false,
              id: 0,
            },
          ])
        );

      if (Props.deck.partner) {
        fetch(
          `https://api.scryfall.com/cards/named?exact=${Props.deck.partner}`
        )
          .then((res) => res.json())
          .then((data: scryfallData) =>
            setCommandZoneCards((commandZoneCards) => [
              ...commandZoneCards,
              {
                name: data.name,
                type: data.type_line,
                images: {
                  small: data.image_uris.small,
                  normal: data.image_uris.normal,
                },
                tapped: false,
                id: 1,
              },
            ])
          );
      }

      Props.deck.deckList.forEach((card: string, i) => {
        setTimeout(() => {
          const cardAmount = parseInt(card[0], 10);
          const cardName = card.slice(2);

          fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`)
            .then((res) => res.json())
            .then((data: scryfallData) => {
              for (let j = 0; j < cardAmount; j++) {
                setDeckCards((deckCards) => [
                  ...deckCards,
                  {
                    name: data.name,
                    type: data.type_line,
                    images: {
                      small: data.image_uris.small,
                      normal: data.image_uris.normal,
                    },
                    tapped: false,
                    id: commandZoneCards.length === 1 ? i + 1 : i + 2,
                  },
                ]);
              }
            });
        }, i * 100);
      });
    }
  }, []);

  useEffect(() => {
    if (deckCards.length + commandZoneCards.length === 100) {
      setLoading(false);
    }
  }, [deckCards]);

  const drawOpeningHand = () => {
    setDeckCards(shuffleArray(deckCards));

    const deckCopy = deckCards.slice();
    for (let i = 0; i < 7; i++) {
      const drawnCard = deckCopy.pop();
      if (isCard(drawnCard)) {
        setHandCards((handCards) => [...handCards, drawnCard]);
        setDeckCards(deckCopy);
      }
    }
  };

  useEffect(() => {
    if (
      handCards.length === 0 &&
      deckCards.length + commandZoneCards.length === 100 &&
      !gameStarted
    ) {
      drawOpeningHand();
    }
  }, [deckCards, handCards]);

  const moveZones = (card: card, fromZone: zones, toZone: zones) => {
    const filterFunction = (el: card) => el.id !== card.id;

    if (fromZone === 'creatures') {
      setCreaturesCards(creaturesCards.filter(filterFunction));
    } else if (fromZone === 'attack') {
      setAttacksCards(attacksCards.filter(filterFunction));
    } else if (fromZone === 'commandZone') {
      setCommandZoneCards(commandZoneCards.filter(filterFunction));
    } else if (fromZone === 'graveyard') {
      setGraveyardCards(graveyardCards.filter(filterFunction));
    } else if (fromZone === 'permanents') {
      setPermanentsCards(permanentsCards.filter(filterFunction));
    } else if (fromZone === 'exile') {
      setExileCards(exileCards.filter(filterFunction));
    } else if (fromZone === 'hand') {
      setHandCards(handCards.filter(filterFunction));
    } else if (fromZone === 'deck') {
      setDeckCards(deckCards.filter(filterFunction));
    }

    if (toZone === 'creatures') {
      setCreaturesCards((creaturesCards) => [...creaturesCards, card]);
    } else if (toZone === 'attack') {
      setAttacksCards((attacksCards) => [...attacksCards, card]);
    } else if (toZone === 'commandZone') {
      card.tapped = false;
      setCommandZoneCards((commandZoneCards) => [...commandZoneCards, card]);
    } else if (toZone === 'graveyard') {
      card.tapped = false;
      setGraveyardCards((graveyardCards) => [...graveyardCards, card]);
    } else if (toZone === 'permanents') {
      setPermanentsCards((permanentsCards) => [...permanentsCards, card]);
    } else if (toZone === 'exile') {
      card.tapped = false;
      setExileCards((exileCards) => [...exileCards, card]);
    } else if (toZone === 'hand') {
      card.tapped = false;
      setHandCards((handCards) => [...handCards, card]);
    }
  };

  const childMovingZones = (card: card, fromZone: zones, toZone: zones) =>
    moveZones(card, fromZone, toZone);
  const configureDropDown = (dropDownOptions: dropDownObj) =>
    setDropDown(dropDownOptions);
  const clearDropDownState = () =>
    setDropDown({ visible: false, x: 0, y: 0, options: [] });

  //function finds the card in the specified zone and flips its tapped state
  const tapUntapCard = (card: card, zone: zones) => {
    if (zone === 'attack') {
      const index = attacksCards.findIndex((el) => el.id === card.id);
      const attackCopy = attacksCards.slice();
      attackCopy[index].tapped = !attackCopy[index].tapped;
      setAttacksCards(attackCopy);
    } else if (zone === 'creatures') {
      const index = creaturesCards.findIndex((el) => el.id === card.id);
      const creatureCopy = creaturesCards.slice();
      creatureCopy[index].tapped = !creatureCopy[index].tapped;
      setCreaturesCards(creatureCopy);
    } else if (zone === 'permanents') {
      const index = permanentsCards.findIndex((el) => el.id === card.id);
      const permanentsCopy = permanentsCards.slice();
      permanentsCopy[index].tapped = !permanentsCopy[index].tapped;
      setPermanentsCards(permanentsCopy);
    }
  };

  return (
    <div>
      {loading ? (
        <div id="loadingDiv">
          <h1>Loading your deck!</h1>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div>
          <DropDown dropDown={dropDown} clearDropDown={clearDropDownState} />
          <div id="playArea">
            <CommandZone
              cards={commandZoneCards}
              moveZones={childMovingZones}
              configureDropDown={configureDropDown}
            />
            <Attacks
              cards={attacksCards}
              moveZones={childMovingZones}
              configureDropDown={configureDropDown}
              tapUntap={tapUntapCard}
            />
            <Deck
              cards={deckCards}
              moveZones={childMovingZones}
              configureDropDown={configureDropDown}
            />
            <Creatures
              cards={creaturesCards}
              moveZones={childMovingZones}
              configureDropDown={configureDropDown}
              tapUntap={tapUntapCard}
            />
            <Graveyard
              cards={graveyardCards}
              moveZones={childMovingZones}
              configureDropDown={configureDropDown}
            />
            <Permanents
              cards={permanentsCards}
              moveZones={childMovingZones}
              configureDropDown={configureDropDown}
              tapUntap={tapUntapCard}
            />
            <Exile
              cards={exileCards}
              moveZones={childMovingZones}
              configureDropDown={configureDropDown}
            />
            <Hand
              cards={handCards}
              moveZones={childMovingZones}
              configureDropDown={configureDropDown}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function isCard(value: any): value is card {
  return value.name && value.type && value.images.small && value.images.normal;
}

function shuffleArray(array: card[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getCardClass(card: card) {
  if (card.type.includes('Creature')) {
    return 'creature';
  } else if (card.type.includes('Artifact')) {
    return 'artifact';
  } else if (card.type.includes('Enchantment')) {
    return 'enchantment';
  } else if (card.type.includes('Land')) {
    return 'land';
  } else if (card.type.includes('Planeswalker')) {
    return 'planeswalker';
  } else if (card.type.includes('sorcery')) {
    return 'spell';
  } else if (card.type.includes('Instant')) {
    return 'spell';
  }
  return '';
}

export default BattleField;
