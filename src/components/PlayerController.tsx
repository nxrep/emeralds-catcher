import { useFrame } from '@react-three/fiber';
import { useController, useXR } from '@react-three/xr';

import { GameState } from '../types';

type Props = {
  gameState: GameState;
};

const PlayerController = ({ gameState }: Props) => {
  const { player } = useXR();
  const controller = useController('right');

  useFrame(() => {
    const plPos = player.position;

    if (gameState === 'game-over' || gameState === 'finished') {
      plPos.setX(0);
      return;
    }

    const thumbpadAxes2 = controller?.inputSource.gamepad?.axes[2];

    if (thumbpadAxes2) {
      if (thumbpadAxes2 < -0.25 && plPos.x > -2) {
        plPos.x -= 2;
      }
      if (thumbpadAxes2 > 0.25 && plPos.x < 2) {
        plPos.x += 2;
      }
    } else {
      plPos.setX(0);
    }
  });

  return null;
};

export default PlayerController;
