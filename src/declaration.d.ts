declare module '*.webp'

type card = {
  type: string,
  name: string,
  images: {
    small: string,
    normal: string,
  };
  tapped: boolean,
  id: number,
};

type zones =
| 'commandZone'
| 'attack'
| 'creatures'
| 'graveyard'
| 'permanents'
| 'exile'
| 'hand'
| 'deck';

type zoneProps = {
  cards: card[],
  moveZones: (cardToMove: card, fromZone: zone, toZone: zone) => void
  configureDropDown: (param: dropDownObj) => void
}

type dropDownObj = {
  visible: boolean;
  x: number;
  y: number;
  options: JSX.Element[];
};