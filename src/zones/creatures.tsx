type tapUntapCardType = { tapUntap: (a: card, b: zones) => void };

function Creatures(Props: zoneProps & tapUntapCardType) {
  const handleCreatureClick = (e: React.MouseEvent) => {
    if (isValidImgElement(e.target)) {
      const cardName = e.target.getAttribute('data-name');
      const card: card | undefined = Props.cards.find(
        (el) => el.name === cardName
      );
      if (card) {
        Props.configureDropDown({
          visible: true,
          x: e.clientX,
          y: e.clientY,
          options: [
            <p onClick={() => Props.tapUntap(card, 'creatures')} key={1}>
              {card.tapped ? 'Untap creatures' : 'Tap creature'}
            </p>,
            <p
              onClick={() => Props.moveZones(card, 'creatures', 'attack')}
              key={2}
            >
              Move to attack
            </p>,
            <p
              onClick={() => Props.moveZones(card, 'creatures', 'permanent')}
              key={3}
            >
              Move to permanent
            </p>,
            <p
              onClick={() => Props.moveZones(card, 'creatures', 'commandZone')}
              key={4}
            >
              Move to command zone
            </p>,
            <p
              onClick={() => Props.moveZones(card, 'creatures', 'graveyard')}
              key={5}
            >
              Move to graveyard
            </p>,
            <p
              onClick={() => Props.moveZones(card, 'creatures', 'exile')}
              key={6}
            >
              Move to exile
            </p>,
            <p
              onClick={() => Props.moveZones(card, 'creatures', 'hand')}
              key={7}
            >
              Move to hand
            </p>,
          ],
        });
      }
    }
  };

  const displayCreatures = () => {
    return Props.cards.map((card, i) => (
      <img
        data-name={card.name}
        key={i}
        src={card.images.small}
        alt={`${card.name} is a creature on the battlefield`}
        className={card.tapped ? 'tapped' : ''}
      />
    ));
  };

  return (
    <div onClick={handleCreatureClick}>
      {displayCreatures().map((el) => el)}
    </div>
  );
}

function isValidImgElement(value: any): value is HTMLImageElement {
  return !!value.getAttribute('src') && !!value.getAttribute('data-name');
}

export default Creatures;
