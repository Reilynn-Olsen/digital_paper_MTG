type tapUntapCardType = { tapUntap: (a: card, b: zones) => void };

function Permanents(Props: zoneProps & tapUntapCardType) {
  const handlePermanentClick = (e: React.MouseEvent) => {
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
            <p onClick={() => Props.tapUntap(card, 'permanents')} key={1}>
              {card.tapped ? 'Untap permanent' : 'Tap Permanent'}
            </p>,
            <p
              onClick={() => Props.moveZones(card, 'permanents', 'creatures')}
              key={3}
            >
              Move to creature
            </p>,
            <p
              onClick={() => Props.moveZones(card, 'permanents', 'commandZone')}
              key={4}
            >
              Move to command zone
            </p>,
            <p
              onClick={() => Props.moveZones(card, 'permanents', 'graveyard')}
              key={5}
            >
              Move to graveyard
            </p>,
            <p
              onClick={() => Props.moveZones(card, 'permanents', 'exile')}
              key={6}
            >
              Move to exile
            </p>,
            <p
              onClick={() => Props.moveZones(card, 'permanents', 'hand')}
              key={7}
            >
              Move to hand
            </p>,
          ],
        });
      }
    }
  };

  const displayPermanents = () => {
    return Props.cards.map((card, i) => (
      <img
        data-name={card.name}
        className={card.tapped ? 'tapped' : ''}
        key={i}
        src={card.images.small}
        alt={`${card.name} is on the battlefield`}
      />
    ));
  };

  return (
    <div onClick={handlePermanentClick}>
      {displayPermanents().map((el) => el)}
    </div>
  );
}

function isValidImgElement(value: any): value is HTMLImageElement {
  return !!value.getAttribute('src') && !!value.getAttribute('data-name');
}

export default Permanents;
