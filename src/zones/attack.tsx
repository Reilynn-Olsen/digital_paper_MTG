type tapUntapCardType = { tapUntap: (a: card, b: zones) => void };

function Attack(Props: zoneProps & tapUntapCardType) {
  const handleAttackClick = (e: React.MouseEvent) => {
    if (isValidImgElement(e.target)) {
      const cardName = e.target.getAttribute('data-name');
      const card: card | undefined = Props.cards.find(
        (el) => el.name === cardName
      );
      if (card) {
        //currently the attacking and stack share a space, it's probably good to separate them but
        //in the mean time this is here to handle clicks for both the stack and attacks.
        console.log(card.type);
        if (card.type === 'Instant' || card.type === 'Sorcery') {
          Props.configureDropDown({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            options: [
              <p
                onClick={() => Props.moveZones(card, 'attack', 'creatures')}
                key={3}
              >
                Move to creature
              </p>,
              <p
                onClick={() => Props.moveZones(card, 'attack', 'graveyard')}
                key={5}
              >
                Move to graveyard
              </p>,
              <p
                onClick={() => Props.moveZones(card, 'attack', 'exile')}
                key={6}
              >
                Move to exile
              </p>,
              <p
                onClick={() => Props.moveZones(card, 'attack', 'hand')}
                key={7}
              >
                Move to hand
              </p>,
              <p
                onClick={() => Props.moveZones(card, 'attack', 'commandZone')}
                key={4}
              >
                Move to command zone
              </p>,
            ],
          });
        } else {
          Props.configureDropDown({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            options: [
              <p onClick={() => Props.tapUntap(card, 'attack')} key={1}>
                {card.tapped ? 'Untap creatures' : 'Tap creature'}
              </p>,
              <p
                onClick={() => Props.moveZones(card, 'attack', 'creatures')}
                key={3}
              >
                Move to creature
              </p>,
              <p
                onClick={() => Props.moveZones(card, 'attack', 'commandZone')}
                key={4}
              >
                Move to command zone
              </p>,
              <p
                onClick={() => Props.moveZones(card, 'attack', 'graveyard')}
                key={5}
              >
                Move to graveyard
              </p>,
              <p
                onClick={() => Props.moveZones(card, 'attack', 'exile')}
                key={6}
              >
                Move to exile
              </p>,
              <p
                onClick={() => Props.moveZones(card, 'attack', 'hand')}
                key={7}
              >
                Move to hand
              </p>,
            ],
          });
        }
      }
    }
  };

  const displayAttack = () => {
    return Props.cards.map((card, i) => (
      <img
        data-name={card.name}
        className={card.tapped ? 'tapped' : ''}
        key={i}
        src={card.images.small}
        alt={`${card.name} is attacking or on the stack`}
      />
    ));
  };

  return (
    <div onClick={handleAttackClick}>{displayAttack().map((el) => el)}</div>
  );
}

function isValidImgElement(value: any): value is HTMLImageElement {
  return !!value.getAttribute('src') && !!value.getAttribute('data-name');
}

export default Attack;
