export type Item = {
  position: number;
  model: string;
  index: number;
  active: boolean;
};

export type GameState = 'start' | 'playing' | 'game-over' | 'finished';
