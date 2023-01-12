import { useRef } from 'react';
import { Emerald } from '../models/Emerald';

const BigToken = (): React.ReactElement => {
  const tokenRef = useRef<THREE.Group>(null);

  return (
    <group position={[0, 2, -506]} ref={tokenRef}>
      <Emerald scale={3.5} />
    </group>
  );
};
export default BigToken;
