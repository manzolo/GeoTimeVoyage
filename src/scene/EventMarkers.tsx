import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { EVENTS } from '../data/timeline';
import { actions, useVoyage } from '../state/store';
import { maToFrac } from '../utils/timeScale';

const DEG = Math.PI / 180;

function latLonToVec(lat: number, lon: number, r: number): [number, number, number] {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
}

export function EventMarkers({ radius }: { radius: number }) {
  const ma = useVoyage((s) => s.ma);
  const lang = useVoyage((s) => s.lang);
  const layers = useVoyage((s) => s.layers);
  const selected = useVoyage((s) => s.selectedEvent);

  return (
    <group>
      {EVENTS.filter((e) => layers[e.category]).map((e) => {
        // più visibile quando l'epoca corrente è vicina all'evento
        const dist = Math.abs(maToFrac(e.ma) - maToFrac(ma));
        const near = dist < 0.03;
        const isSel = selected === e.id;
        if (!near && !isSel) return null;
        const pos = latLonToVec(e.lat, e.lon, radius * 1.015);
        const color = e.category === 'geo' ? '#ff7a3c' : '#49e0a0';
        return (
          <Marker
            key={e.id}
            position={pos}
            color={color}
            selected={isSel}
            label={isSel ? e.title[lang] : undefined}
            onClick={() => {
              actions.setMa(e.ma);
              actions.selectEvent(e.id);
            }}
          />
        );
      })}
    </group>
  );
}

function Marker({
  position,
  color,
  selected,
  label,
  onClick,
}: {
  position: [number, number, number];
  color: string;
  selected: boolean;
  label?: string;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pulse = selected ? 1 + Math.sin(clock.elapsedTime * 4) * 0.25 : 1;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <group
      ref={ref}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <mesh>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh scale={selected || hover ? 2.4 : 1.6}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} toneMapped={false} />
      </mesh>
      {label && (
        <Html distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              transform: 'translate(12px, -50%)',
              background: 'rgba(8,12,22,0.85)',
              border: `1px solid ${color}`,
              color: '#e6ecff',
              padding: '4px 9px',
              borderRadius: 8,
              fontSize: 12,
              whiteSpace: 'nowrap',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}
