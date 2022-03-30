import React from 'react';

function CommandZone(Props: zoneProps) {
  const dropDownCommandZone = (e: React.MouseEvent<HTMLImageElement>) => {
    if (Props.cards.length > 0) {
      Props.configureDropDown({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        options:
          Props.cards.length === 2
            ? [
                <ul>
                  <p
                    onClick={() =>
                      Props.moveZones(
                        Props.cards[0],
                        'commandZone',
                        'creatures'
                      )
                    }
                    key={1}
                  >
                    Move {Props.cards[0].name} to the battlefield
                  </p>
                  <p
                    onClick={() =>
                      Props.moveZones(
                        Props.cards[1],
                        'commandZone',
                        'creatures'
                      )
                    }
                    key={2}
                  >
                    Move {Props.cards[1].name} to the battlefield
                  </p>
                </ul>,
              ]
            : [
                <p
                  key={1}
                  onClick={() =>
                    Props.moveZones(Props.cards[0], 'commandZone', 'creatures')
                  }
                >
                  Move {Props.cards[0].name} to the battlefield
                </p>,
              ],
      });
    }
  };

  const displayCards = () => {
    return Props.cards.map((card, i) => (
      <img
        key={i}
        onClick={dropDownCommandZone}
        src={card.images.small}
        alt={`{${card.name} is in your command zone}`}
      />
    ));
  };

  return (
    <div onClick={dropDownCommandZone}>{displayCards().map((el) => el)}</div>
  );
}

export default CommandZone;
