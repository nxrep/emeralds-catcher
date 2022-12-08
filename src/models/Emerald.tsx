import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

const path = '/objects/emerald.glb';

type GLTFResult = GLTF & {
  nodes: {
    Emerald: THREE.Mesh;
  };
  materials: {
    Emerald: THREE.MeshStandardMaterial;
  };
};

export function Emerald(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(path) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Emerald.geometry} material={materials.Emerald} position={[0, 0.15, 0]} />
    </group>
  );
}

useGLTF.preload(path);
