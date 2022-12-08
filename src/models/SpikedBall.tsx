import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

const path = '/objects/spiked-ball.glb';

type GLTFResult = GLTF & {
  nodes: {
    Icosphere_1: THREE.Mesh;
    Icosphere_2: THREE.Mesh;
  };
  materials: {
    spikes: THREE.MeshStandardMaterial;
    ball: THREE.MeshPhysicalMaterial;
  };
};

export function SpikedBall(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(path) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null} scale={1.5}>
      <mesh geometry={nodes.Icosphere_1.geometry} material={materials.spikes} position={[0, -0.05, 0]} />
      <mesh geometry={nodes.Icosphere_2.geometry} material={materials.ball} position={[0, -0.05, 0]} />
    </group>
  );
}

useGLTF.preload(path);
