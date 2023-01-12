import { useFrame } from '@react-three/fiber';
import { Controllers, Interactive, useXR } from '@react-three/xr';
import { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import bombFX from './assets/bomb-fx.mp3';
import coinFX from './assets/coin-fx.mp3';
import BigEmerald from './components/BigEmerald';
import { generateItemSequence } from './components/ItemSequence';
import PlayerController from './components/PlayerController';
import PlayerStatus from './components/PlayerStatus';
import Playfield from './components/Playfield';
import Sky from './components/Sky';
import { StartButton } from './models/StartButton';
import { RestartButton } from './models/RestartButton';
import { GameState, Item } from './types';

const STARTSPEED = 1.5;
const STARTLIVES = 3;

const EmeraldsCatcher = (): React.ReactElement => {
  const [playfieldItems, setPlayfieldItems] = useState<Item[]>([]);
  const [hoverStart, setHoverStart] = useState(false);
  const [trackSpeed, setTrackSpeed] = useState(STARTSPEED);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [lives, setLives] = useState(STARTLIVES);
  const [gameState, setGameState] = useState<GameState>('start');

  const groupPlayfieldRef = useRef<THREE.Group>(null);

  const [playCoinFX] = useSound(coinFX, { volume: 1 });
  const [playBombFX] = useSound(bombFX, { volume: 0.9 });

  const { player } = useXR();

  const buttonHandler = () => {
    setGameState('playing');
  };

  const restartButtonHandler = () => {
    if (groupPlayfieldRef.current) {
      groupPlayfieldRef.current.position.z = 0;
    }
    setHoverStart(false);
    setLives(STARTLIVES);
    setTrackSpeed(STARTSPEED);
    setScore(0);
    setGameState('start');
  };

  useEffect(() => {
    if (gameState === 'finished' || gameState === 'game-over') {
      score > highscore && setHighscore(score);
    }
    if (gameState === 'start') {
      const itemSequence = generateItemSequence();
      setPlayfieldItems(itemSequence);
    }
  }, [gameState, score, highscore]);

  useFrame((_, delta) => {
    if (gameState !== 'playing' || !groupPlayfieldRef.current) {
      return;
    }

    groupPlayfieldRef.current.position.z += trackSpeed * delta;

    // check if player reached the end
    if (groupPlayfieldRef.current.position.z > 506) {
      playCoinFX();
      setScore(score + 25);
      setGameState('finished');
      return;
    }

    // collision detection between player and item
    for (let i = 0; i < playfieldItems.length; i++) {
      if (
        -playfieldItems[i].index + groupPlayfieldRef.current.position.z > 1 &&
        playfieldItems[i].active &&
        playfieldItems[i].model !== 'EMPTY'
      ) {
        playfieldItems[i].active = false;

        setPlayfieldItems(
          playfieldItems.map((item, index) => {
            if (index === i) {
              return { ...item, active: false };
            }
            return item;
          }),
        );

        // check if the player position same as item, 0=left, 1=center, 2=right
        if (player.position.x === -2 + playfieldItems[i].position * 2) {
          switch (playfieldItems[i].model) {
            case 'EMERALD':
              playCoinFX();
              setTrackSpeed(trackSpeed + 0.2);
              setScore(score + 10);
              break;
            case 'BOMB':
              playBombFX();
              if (lives > 0) {
                setLives(lives - 1);
              } else {
                setGameState('game-over');
                setPlayfieldItems([]);
              }
              break;
          }
        }
      }
    }
  });

  return (
    <>
      <Controllers />
      <Sky />

      <PlayerStatus score={score} highscore={highscore} lives={lives} />

      {gameState === 'start' && (
        <Interactive onSelect={buttonHandler} onHover={() => setHoverStart(true)} onBlur={() => setHoverStart(false)}>
          <StartButton position={[0, 1.6, -1.8]} scale={hoverStart ? 0.22 : 0.2} />
        </Interactive>
      )}

      <PlayerController gameState={gameState} />

      <group ref={groupPlayfieldRef}>
        <Playfield playfieldItems={playfieldItems} />
        {gameState === 'playing' && <BigEmerald />}
      </group>

      {(gameState === 'finished' || gameState === 'game-over') && (
        <Interactive
          onSelect={restartButtonHandler}
          onHover={() => setHoverStart(true)}
          onBlur={() => setHoverStart(false)}
        >
          <RestartButton position={[0, 1.6, -1.8]} scale={hoverStart ? 0.22 : 0.2} />
        </Interactive>
      )}
    </>
  );
};

export default EmeraldsCatcher;
