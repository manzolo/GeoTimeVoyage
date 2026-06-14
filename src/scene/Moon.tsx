import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useVoyage } from '../state/store';

// Texture procedurale grigia e craterizzata per la Luna.
function moonTexture(): THREE.CanvasTexture {
  const s = 128;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#9a9a9a';
  ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 120; i++) {
    const r = Math.random() * 6 + 1;
    const x = Math.random() * s;
    const y = Math.random() * s;
    const shade = 120 + Math.random() * 90;
    ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function Moon() {
  const ma = useVoyage((s) => s.ma);
  const ref = useRef<THREE.Group>(null);
  const tex = useMemo(moonTexture, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    // la Luna nel passato era molto più vicina (oggi si allontana ~3,8 cm/anno)
    const closeness = THREE.MathUtils.clamp(ma / 4600, 0, 1); // 1 = passato
    const dist = THREE.MathUtils.lerp(7.5, 3.2, closeness);
    const a = clock.elapsedTime * 0.12;
    ref.current.position.set(Math.cos(a) * dist, Math.sin(a) * 0.6, Math.sin(a) * dist);
    const size = THREE.MathUtils.lerp(0.45, 0.85, closeness);
    ref.current.scale.setScalar(size);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={tex} roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}
