import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { VRButton, XR } from '@react-three/xr';
import { Suspense } from 'react';
import { styles } from 'AppStyles';
import EmeraldsCatcher from './EmeraldsCatcher';

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <div style={styles.Instructions}>
          There are two easy ways to play the game in Virtual Reality:
          <br />
          1️⃣ visit emeralds.nxdec.io in the Meta Quest browser
          <br />
          2️⃣ use Chrome or Edge, connect your headset and press Enter VR
        </div>
        <VRButton style={styles.VRButton} onClick={() => console.log('clicked me!')} />
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
