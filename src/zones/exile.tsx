function Exile(Props: zoneProps) {
  const displayExile = () => {
    if (Props.cards.length > 0) {
      return (
        <img
          src={Props.cards[0].images.small}
          alt={`${Props.cards[0].name} is the top card of your exile`}
        />
      );
    }
  };

  return <div>{displayExile()}</div>;
}

export default Exile;
