import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

const path = '/objects/restart-button.glb';

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

export function RestartButton(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(path) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.button} scale={[1.77, 1, 1]} />
      <mesh
        geometry={nodes.Text.geometry}
        material={materials.buttonText}
        position={[-1.45, 0, 0.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(path);
