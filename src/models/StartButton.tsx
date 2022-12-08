import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

const path = '/objects/start-button.glb';

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Text: THREE.Mesh;
  };
  materials: {
    button: THREE.MeshPhysicalMaterial;
    buttonText: THREE.MeshPhysicalMaterial;
  };
};

export function StartButton(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(path) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.button} />
      <mesh
        geometry={nodes.Text.geometry}
        material={materials.buttonText}
        position={[0, 0, 0.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(path);
