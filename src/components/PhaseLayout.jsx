import { useMemo } from "react";
import { usePhase } from "../contexts/PhaseContext";

function LowPolyTree({ position }) {
  return (
    <group position={position}>
      <mesh castShadow position-y={1}>
        <cylinderGeometry args={[0.15, 0.2, 2, 8]} />
        <meshStandardMaterial color="#664422" metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh castShadow position-y={2.5}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#228B22" metalness={0.1} roughness={0.8} />
      </mesh>
    </group>
  );
}

function PhaseLayout() {
  const { currentPhase } = usePhase();

  const roads = useMemo(() => {
    switch (currentPhase.layout) {
      case "cross":
        return [
          // Horizontal road
          { position: [0, 0, 0], size: [30, 0.1, 2], color: "#444444" },
          // Vertical road
          { position: [0, 0, 0], size: [2, 0.1, 30], color: "#444444" },
        ];

      case "double-cross":
        return [
          // Main horizontal road
          { position: [0, 0, 0], size: [30, 0.1, 2], color: "#444444" },
          // Main vertical road
          { position: [0, 0, 0], size: [2, 0.1, 30], color: "#444444" },
          // Secondary horizontal road
          { position: [0, 0, -10], size: [30, 0.1, 2], color: "#444444" },
          // Secondary vertical road
          { position: [10, 0, 0], size: [2, 0.1, 30], color: "#444444" },
        ];

      default:
        return [
          { position: [0, 0, 0], size: [30, 0.1, 2], color: "#444444" },
          { position: [0, 0, 0], size: [2, 0.1, 30], color: "#444444" },
        ];
    }
  }, [currentPhase.layout]);

  const sidewalks = useMemo(() => {
    switch (currentPhase.layout) {
      case "cross":
        return [
          // Horizontal sidewalks
          { position: [0, 0.05, 1.5], size: [30, 0.1, 0.5], color: "#888888" },
          { position: [0, 0.05, -1.5], size: [30, 0.1, 0.5], color: "#888888" },
          // Vertical sidewalks
          { position: [1.5, 0.05, 0], size: [0.5, 0.1, 30], color: "#888888" },
          { position: [-1.5, 0.05, 0], size: [0.5, 0.1, 30], color: "#888888" },
        ];

      case "double-cross":
        return [
          // Main horizontal sidewalks
          { position: [0, 0.05, 1.5], size: [30, 0.1, 0.5], color: "#888888" },
          { position: [0, 0.05, -1.5], size: [30, 0.1, 0.5], color: "#888888" },
          // Main vertical sidewalks
          { position: [1.5, 0.05, 0], size: [0.5, 0.1, 30], color: "#888888" },
          { position: [-1.5, 0.05, 0], size: [0.5, 0.1, 30], color: "#888888" },
          // Secondary horizontal sidewalks
          { position: [0, 0.05, -8.5], size: [30, 0.1, 0.5], color: "#888888" },
          {
            position: [0, 0.05, -11.5],
            size: [30, 0.1, 0.5],
            color: "#888888",
          },
          // Secondary vertical sidewalks
          { position: [8.5, 0.05, 0], size: [0.5, 0.1, 30], color: "#888888" },
          { position: [11.5, 0.05, 0], size: [0.5, 0.1, 30], color: "#888888" },
        ];

      default:
        return [
          { position: [0, 0.05, 1.5], size: [30, 0.1, 0.5], color: "#888888" },
          { position: [0, 0.05, -1.5], size: [30, 0.1, 0.5], color: "#888888" },
          { position: [1.5, 0.05, 0], size: [0.5, 0.1, 30], color: "#888888" },
          { position: [-1.5, 0.05, 0], size: [0.5, 0.1, 30], color: "#888888" },
        ];
    }
  }, [currentPhase.layout]);

  const stopLines = useMemo(() => {
    switch (currentPhase.layout) {
      case "cross":
        return [
          // Horizontal stop line
          { position: [-2, 0.06, 0], size: [0.1, 0.01, 2], color: "white" },
          // Vertical stop line
          { position: [0, 0.06, -2], size: [2, 0.01, 0.1], color: "white" },
        ];

      case "double-cross":
        return [
          // Main intersection stop lines
          { position: [-2, 0.06, 0], size: [0.1, 0.01, 2], color: "white" },
          { position: [0, 0.06, -2], size: [2, 0.01, 0.1], color: "white" },
          // Secondary intersection stop lines
          { position: [-2, 0.06, -10], size: [0.1, 0.01, 2], color: "white" },
          { position: [0, 0.06, -12], size: [2, 0.01, 0.1], color: "white" },
          { position: [8, 0.06, -2], size: [0.1, 0.01, 2], color: "white" },
          { position: [10, 0.06, 0], size: [2, 0.01, 0.1], color: "white" },
        ];

      default:
        return [
          { position: [-2, 0.06, 0], size: [0.1, 0.01, 2], color: "white" },
          { position: [0, 0.06, -2], size: [2, 0.01, 0.1], color: "white" },
        ];
    }
  }, [currentPhase.layout]);

  const treePositions = useMemo(() => {
    if (currentPhase.layout === "cross") {
      return [
        [10, 0, 10],
        [-10, 0, 10],
        [10, 0, -10],
        [-10, 0, -10],
        [15, 0, 5],
        [-15, 0, 5],
        [15, 0, -5],
        [-15, 0, -5],
      ];
    } else if (currentPhase.layout === "double-cross") {
      return [
        [7, 0, 10],
        [-10, 0, 10],
        [6, 0, -7],
        [-10, 0, -13],
        [15, 0, 5],
        [-15, 0, 5],
        [15, 0, -5],
        [-15, 0, -5],
      ];
    } else {
      return [];
    }
  }, [currentPhase.layout]);

  return (
    <group>
      {roads.map((road, index) => (
        <mesh
          key={`road-${index}`}
          position={road.position}
          rotation={road.rotation || [0, 0, 0]}
          receiveShadow
        >
          <boxGeometry args={road.size} />
          <meshStandardMaterial
            color={road.color}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
      ))}

      {sidewalks.map((sidewalk, index) => (
        <mesh
          key={`sidewalk-${index}`}
          position={sidewalk.position}
          rotation={sidewalk.rotation || [0, 0, 0]}
          receiveShadow
        >
          <boxGeometry args={sidewalk.size} />
          <meshStandardMaterial color={sidewalk.color} roughness={0.8} />
        </mesh>
      ))}

      {stopLines.map((line, index) => (
        <mesh
          key={`stopline-${index}`}
          position={line.position}
          rotation={line.rotation || [0, 0, 0]}
        >
          <boxGeometry args={line.size} />
          <meshStandardMaterial color={line.color} />
        </mesh>
      ))}

      {treePositions.map((pos, i) => (
        <LowPolyTree key={i} position={pos} />
      ))}

      <mesh
        position={[0, -0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#559955" />
      </mesh>
    </group>
  );
}

export default PhaseLayout;
