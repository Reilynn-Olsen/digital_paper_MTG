import React from 'react';

function Hand(Props: zoneProps) {
  //finds clicked card and moves it to the appropriate zone
  const handleHandClick = (e: React.MouseEvent) => {
    if (isValidImgElement(e.target)) {
      const cardName = e.target.getAttribute('data-name');

      const cardIndex = Props.cards.findIndex((card) => cardName === card.name);

      if (cardIndex > -1) {
        if (Props.cards[cardIndex].type.includes('Creature')) {
          Props.moveZones(Props.cards[cardIndex], 'hand', 'creatures');
        } else if (
          !(
            Props.cards[cardIndex].type.includes('Instant') ||
            Props.cards[cardIndex].type.includes('Sorcery')
          )
        ) {
          Props.moveZones(Props.cards[cardIndex], 'hand', 'permanents');
        } else {
          Props.moveZones(Props.cards[cardIndex], 'hand', 'attack');
        }
      }
    }
  };

  const displayHand = () => {
    return Props.cards.map((card: card, i) => (
      <img
        data-name={card.name}
        key={i}
        src={card.images.small}
        alt={`${card.name} is in your hand`}
      />
    ));
  };

  return <div onClick={handleHandClick}>{displayHand().map((el) => el)}</div>;
}

function isValidImgElement(value: any): value is HTMLImageElement {
  return !!value.getAttribute('src') && !!value.getAttribute('data-name');
}

export default Hand;
