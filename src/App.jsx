import Scene from "./components/Scene";
import HUD from "./components/HUD";
import { PhaseProvider } from "./contexts/PhaseContext";
import { CarRegistryProvider } from "./contexts/CarRegistryContext";
import { AudioProvider } from "./contexts/AudioContext";
import SoundManager from "./components/SoundManager";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AudioProvider>
        <PhaseProvider>
          <CarRegistryProvider>
            <SoundManager />
            <Scene />
            <HUD />
          </CarRegistryProvider>
        </PhaseProvider>
      </AudioProvider>
    </div>
  );
}

export default App;
