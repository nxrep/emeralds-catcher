import { Text } from '@react-three/drei';

type Props = {
  score: number;
  highscore: number;
  lives: number;
};

const PlayerStatus = ({ score, highscore, lives }: Props): React.ReactElement => {
  return (
    <>
      {highscore === 0 && score === 0 && (
        <Text color={'green'} fontSize={0.3} position={[0, 3.8, -7]}>
          Move the right thumbstick left or right to avoid the bombs
        </Text>
      )}
      <group position={[0, 4.9, -8]}>
        <Text color={'yellow'} fontSize={0.6} position={[-3, 0, 0]}>
          Lives: {lives}
        </Text>
        <Text color={'yellow'} fontSize={0.6} position={[3, 0, 0]}>
          Score: {score}
        </Text>
        {highscore > 0 && (
          <Text color={'yellow'} fontSize={0.6} position={[2.4, 0.7, 0]}>
            Highscore: {highscore}
          </Text>
        )}
      </group>
    </>
  );
};
export default PlayerStatus;
