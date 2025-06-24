import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import TrafficController from "./TrafficController";
import PhaseLayout from "./PhaseLayout";

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 15, 15], fov: 60 }}
      style={{ background: "#87CEEB" }}
      shadows
    >
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />

      <Environment preset="city" />
      <PhaseLayout />
      <TrafficController />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={10}
        maxDistance={50}
      />
    </Canvas>
  );
}

export default Scene;
