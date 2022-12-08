import { BackSide } from 'three';
import { useTexture } from '@react-three/drei';

const Sky = (): React.ReactElement => {
  const [skyMap] = useTexture(['/textures/sky-edit.jpg']);

  return (
    <>
      <color attach="background" args={['#87CEEB']} />
      <ambientLight intensity={0.8} />
      <pointLight intensity={0.2} position={[2, 4, 2]} color={'#88EE88'} />

      <mesh position={[0, 0, 0]} rotation={[0, 0, -2]}>
        <sphereBufferGeometry args={[600, 60, 40]} />
        <meshStandardMaterial map={skyMap} side={BackSide} />
      </mesh>
    </>
  );
};
export default Sky;
