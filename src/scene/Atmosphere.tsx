import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useVoyage } from '../state/store';
import { climateAt } from '../data/timeline';
import { EARTH_RADIUS } from './Globe';

const vertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  varying vec3 vNormal;
  uniform vec3 uColor;
  uniform float uIntensity;
  void main() {
    float fres = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    gl_FragColor = vec4(uColor, 1.0) * fres * uIntensity;
  }
`;

export function Atmosphere() {
  const ma = useVoyage((s) => s.ma);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#3a8bff') },
      uIntensity: { value: 1.4 },
    }),
    [],
  );

  useFrame(() => {
    if (!matRef.current) return;
    const cl = climateAt(ma);
    // atmosfera rossastra/densa nell'Adeano-Archeano (CO₂, foschia),
    // azzurra nel Fanerozoico
    const young = THREE.MathUtils.clamp((ma - 2000) / 2600, 0, 1);
    const c = uniforms.uColor.value as THREE.Color;
    c.setRGB(
      THREE.MathUtils.lerp(0.23, 0.85, young),
      THREE.MathUtils.lerp(0.55, 0.4, young),
      THREE.MathUtils.lerp(1.0, 0.25, young),
    );
    uniforms.uIntensity.value = 1.2 + THREE.MathUtils.clamp((cl.co2 - 400) / 4000, 0, 1) * 0.8;
  });

  return (
    <mesh scale={1.18}>
      <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
