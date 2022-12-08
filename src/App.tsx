import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { VRButton, XR } from '@react-three/xr';
import { Suspense } from 'react';
import EmeraldsCatcher from './EmeraldsCatcher';

const styles = {
  VRButton: {
    color: 'black',
    background: 'white',
    border: '2px solid black',
    borderRadius: '4px',
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '14px 26px',
    font: '1rem sans-serif',
    outline: 'none',
    zIndex: '99999',
    cursor: 'pointer',
  } as React.CSSProperties,
};

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <VRButton style={styles.VRButton} />
        <Canvas>
          <XR>
            <EmeraldsCatcher />
          </XR>
        </Canvas>
      </Suspense>
      <Loader dataInterpolation={p => `Loading Emeralds Catcher VR ${p.toFixed(2)}% \nPlease wait..`} />
    </>
  );
}

export default App;
