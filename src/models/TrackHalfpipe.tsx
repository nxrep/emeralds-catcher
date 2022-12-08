import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

const path = '/objects/track-halfpipe.glb';

type GLTFResult = GLTF & {
  nodes: {
    track1: THREE.Mesh;
  };
  materials: {
    walls: THREE.MeshStandardMaterial;
  };
};

export function TrackHalfpipe(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(path) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.track1.geometry}
        material={materials.walls}
        position={[0, 4.74, -99.98]}
        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
        scale={[1, 2, 1]}
      />
    </group>
  );
}

useGLTF.preload(path);
