import { Scene } from './scene/Scene';
import { Hud } from './ui/Hud';
import { Timeline } from './ui/Timeline';
import { InfoPanel } from './ui/InfoPanel';
import { EventAutoOpen } from './ui/EventAutoOpen';

export default function App() {
  return (
    <>
      <Scene />
      <Hud />
      <InfoPanel />
      <Timeline />
      <EventAutoOpen />
    </>
  );
}
