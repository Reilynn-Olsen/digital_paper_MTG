import cardBack from '../../public/images/cardBack.webp';

function Deck(Props: zoneProps) {
  const displayDeck = () => {
    if (Props.cards.length > 0) {
      return (
        <img
          className="cardBack"
          src={cardBack}
          alt={`your deck with ${Props.cards.length} cards`}
        />
      );
    }
  };

  return <div>{displayDeck()}</div>;
}

export default Deck;
