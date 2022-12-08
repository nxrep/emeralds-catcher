import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

const path = '/objects/leaderboard.glb';

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    button: THREE.MeshPhysicalMaterial;
  };
};

export function Leaderboard(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(path) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.button} position={[0, 3.17, 0]} />
    </group>
  );
}

useGLTF.preload(path);
