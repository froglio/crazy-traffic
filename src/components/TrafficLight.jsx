import { useState } from "react";
import { useCursor } from "@react-three/drei";

function TrafficLight({
  position = [0, 0, 0],
  onStateChange,
  lightType = "horizontal",
}) {
  const [isGreen, setIsGreen] = useState(lightType.startsWith("horizontal")); // Start with green for horizontal, red for vertical
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const handleClick = () => {
    const newState = !isGreen;
    setIsGreen(newState);
    onStateChange(newState);

    if (window.gameAudio && window.gameAudio.playClick) {
      window.gameAudio.playClick();
    }
  };

  const poleColor = "#333333";
  const housingColor = "#222222";
  const baseColor = "#444444";

  return (
    <group position={position}>
      {/* Traffic light pole */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.3, 4, 0.3]} />
        <meshStandardMaterial color={poleColor} />
      </mesh>

      {/* Traffic light housing */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[1, 1.5, 0.5]} />
        <meshStandardMaterial color={housingColor} />
      </mesh>

      {/* Red light */}
      <mesh
        position={[0, 4.3, 0.26]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={isGreen ? "#330000" : "#ff0000"}
          emissive={isGreen ? "#000000" : "#ff0000"}
          emissiveIntensity={isGreen ? 0 : 0.3}
        />
      </mesh>

      {/* Green light */}
      <mesh
        position={[0, 3.7, 0.26]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={isGreen ? "#00ff00" : "#003300"}
          emissive={isGreen ? "#00ff00" : "#000000"}
          emissiveIntensity={isGreen ? 0.3 : 0}
        />
      </mesh>

      {/* Base of the traffic light */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color={baseColor} />
      </mesh>

      {/* Label to identify which traffic light controls which avenue */}
      <mesh position={[0, 6, 0]}>
        {lightType.startsWith("horizontal") ? (
          <boxGeometry args={[1.5, 0.3, 0.1]} />
        ) : (
          <boxGeometry args={[0.3, 1.5, 0.1]} />
        )}
        <meshStandardMaterial
          color={lightType.startsWith("horizontal") ? "#0066cc" : "#cc6600"}
        />
      </mesh>
    </group>
  );
}

export default TrafficLight;
