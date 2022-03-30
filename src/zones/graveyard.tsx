function Graveyard(Props: zoneProps) {
  const displayGraveyard = () => {
    if (Props.cards.length > 0) {
      return (
        <img
          src={Props.cards[0].images.small}
          alt={`${Props.cards[0].name} is the top card of your graveyard`}
        />
      );
    }
  };

  return <div>{displayGraveyard()}</div>;
}

export default Graveyard;
