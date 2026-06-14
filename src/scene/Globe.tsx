import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getEarthCanvas, getCloudCanvas } from '../utils/earthTexture';
import { useVoyage } from '../state/store';
import { EventMarkers } from './EventMarkers';

const EARTH_RADIUS = 2;

export function Globe() {
  const ma = useVoyage((s) => s.ma);
  const showClouds = useVoyage((s) => s.clouds);

  const group = useRef<THREE.Group>(null);
  const surfaceMat = useRef<THREE.MeshStandardMaterial>(null);
  const cloudMat = useRef<THREE.MeshStandardMaterial>(null);
  const cloudMesh = useRef<THREE.Mesh>(null);

  // texture iniziali
  const earthTex = useMemo(() => {
    const tex = new THREE.CanvasTexture(getEarthCanvas(ma));
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cloudTex = useMemo(() => {
    const tex = new THREE.CanvasTexture(getCloudCanvas(ma));
    return tex;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // aggiorna le texture quando cambia l'epoca (le canvas sono in cache)
  useEffect(() => {
    earthTex.image = getEarthCanvas(ma);
    earthTex.needsUpdate = true;
    cloudTex.image = getCloudCanvas(ma);
    cloudTex.needsUpdate = true;
    // emissività per la fase di magma (Adeano)
    if (surfaceMat.current) {
      const molten = THREE.MathUtils.clamp((ma - 3900) / 700, 0, 1);
      surfaceMat.current.emissive.setRGB(molten * 0.9, molten * 0.3, 0.0);
      surfaceMat.current.emissiveMap = molten > 0.01 ? earthTex : null;
      surfaceMat.current.emissiveIntensity = molten;
      surfaceMat.current.needsUpdate = true;
    }
  }, [ma, earthTex, cloudTex]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.04;
    if (cloudMesh.current) cloudMesh.current.rotation.y += delta * 0.01;
  });

  return (
    <group ref={group} rotation={[0.41, 0, 0]}>
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS, 96, 96]} />
        <meshStandardMaterial
          ref={surfaceMat}
          map={earthTex}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      <mesh ref={cloudMesh} visible={showClouds} scale={1.012}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial
          ref={cloudMat}
          map={cloudTex}
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>

      <EventMarkers radius={EARTH_RADIUS} />
    </group>
  );
}

export { EARTH_RADIUS };
