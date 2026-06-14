import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Globe } from './Globe';
import { Atmosphere } from './Atmosphere';
import { Moon } from './Moon';
import { actions, getState, useVoyage } from '../state/store';

// Avanza la timeline quando è attiva l'"Accelerazione Temporale".
function TimeDriver() {
  useFrame((_, delta) => {
    const s = getState();
    if (!s.playing) return;
    const next = s.ma - s.speed * delta;
    if (next <= 0) {
      actions.setMa(0);
      actions.setPlaying(false);
    } else {
      actions.setMa(next);
    }
  });
  return null;
}

// Intensità del Sole in funzione dell'epoca (faint young Sun ~70% a 4,6 Ga).
function SunLight() {
  const ma = useVoyage((s) => s.ma);
  const intensity = THREE.MathUtils.lerp(2.4, 1.6, THREE.MathUtils.clamp(ma / 4600, 0, 1));
  const warmth = THREE.MathUtils.clamp(ma / 4600, 0, 1);
  const color = new THREE.Color().setRGB(1, 1 - warmth * 0.25, 1 - warmth * 0.45);
  return <directionalLight position={[5, 2, 4]} intensity={intensity} color={color} />;
}

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#05070f']} />
      <ambientLight intensity={0.18} />
      <SunLight />
      <Suspense fallback={null}>
        <Stars radius={120} depth={60} count={6000} factor={4} saturation={0} fade speed={0.5} />
        <Globe />
        <Atmosphere />
        <Moon />
      </Suspense>
      <TimeDriver />
      <OrbitControls
        enablePan={false}
        minDistance={2.6}
        maxDistance={14}
        rotateSpeed={0.5}
        zoomSpeed={0.7}
      />
    </Canvas>
  );
}
