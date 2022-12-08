import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Emerald } from '../models/Emerald';

const BigToken = (): React.ReactElement => {
  const tokenRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (tokenRef.current) {
      tokenRef.current.rotateY(delta * 1.5);
    }
  });

  return (
    <group position={[0, 2, -566]} ref={tokenRef}>
      <Emerald scale={3.5} />
    </group>
  );
};
export default BigToken;
