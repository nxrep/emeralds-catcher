import { Item } from '../types';

const DISTANCE = 500;
const MODEL = ['EMERALD', 'BOMB', 'EMPTY'];

export const generateItemSequence = () => {
  const items: Item[] = [{ position: 1, model: 'EMPTY', index: 0, active: true }];
  let i;
  let lastModel = 9;
  let newModel;
  let newPosition = 1;
  let lastPosition = 9;

  for (i = 1; i < DISTANCE; i++) {
    newModel = Math.round(Math.random() * 2);

    // same Model always in a row and new Model in a new position
    if (newModel !== lastModel) {
      while (lastPosition === newPosition) {
        newPosition = Math.round(Math.random() * 2);
      }
      lastPosition = newPosition;
      lastModel = newModel;
    }

    items.push({
      position: newPosition,
      model: MODEL[newModel],
      index: i,
      active: true,
    });
  }
  return items;
};
