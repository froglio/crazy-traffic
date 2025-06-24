import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useCarRegistry } from "../contexts/CarRegistryContext";

function Car({
  id,
  direction,
  color = "red",
  speed = 0.05,
  initialPosition = [0, 0, 0],
  trafficLightState = true,
  onCarExit,
  gameOver = false,
}) {
  const carRef = useRef();
  const [hasPassedTrafficLight, setHasPassedTrafficLight] = useState(false);
  const [isVisuallyImpatient, setIsVisuallyImpatient] = useState(false);
  const waitTimeRef = useRef(0);
  const isImpatientRef = useRef(false);
  const impatienceThresholdRef = useRef(0);
  const { registerCar, unregisterCar, getAllCars } = useCarRegistry();

  const IMPATIENT_COLOR = "orange";

  const dimensions = direction.includes("horizontal")
    ? [2, 0.5, 1]
    : [1, 0.5, 2];

  // Generate random impatience threshold for this car (5-15 seconds)
  useEffect(() => {
    impatienceThresholdRef.current = 5 + Math.random() * 10;
  }, [id]);

  useEffect(() => {
    if (carRef.current && id) {
      registerCar(id, carRef.current);
    }

    return () => {
      if (id) {
        unregisterCar(id);
      }
    };
  }, [id, registerCar, unregisterCar]);

  const checkCarAhead = () => {
    if (!carRef.current) return false;

    const cars = getAllCars();
    const minDistance = 3;

    for (const otherCar of cars) {
      if (!otherCar || otherCar === carRef.current) continue;

      const isSameDirection = direction.includes("horizontal")
        ? Math.abs(otherCar.position.z - carRef.current.position.z) < 1
        : Math.abs(otherCar.position.x - carRef.current.position.x) < 1;

      if (!isSameDirection) continue;

      const isAhead = direction.includes("horizontal")
        ? otherCar.position.x > carRef.current.position.x
        : otherCar.position.z > carRef.current.position.z;

      if (!isAhead) continue;

      const distance = carRef.current.position.distanceTo(otherCar.position);
      if (distance < minDistance) {
        return true;
      }
    }

    return false;
  };

  const getStopZone = () => {
    if (direction === "horizontal-1") {
      return { start: -3, end: -2 };
    } else if (direction === "horizontal-2") {
      return { start: -3, end: -2 };
    } else if (direction === "vertical-1") {
      return { start: -3, end: -2 };
    } else if (direction === "vertical-2") {
      return { start: -3, end: -2 };
    } else {
      return { start: -3, end: -2 };
    }
  };

  const getIntersectionEntry = () => {
    if (direction.includes("horizontal")) {
      return -2;
    } else {
      return -2;
    }
  };

  useFrame((state, delta) => {
    if (!carRef.current || gameOver) return; // Pause if game over

    if (checkCarAhead()) {
      return;
    }

    const intersectionEntry = getIntersectionEntry();
    const hasEnteredIntersection = direction.includes("horizontal")
      ? carRef.current.position.x > intersectionEntry
      : carRef.current.position.z > intersectionEntry;

    if (hasEnteredIntersection && !hasPassedTrafficLight) {
      setHasPassedTrafficLight(true);
      waitTimeRef.current = 0;
      isImpatientRef.current = false;
    }

    const stopZone = getStopZone();

    const isInStopZone = direction.includes("horizontal")
      ? carRef.current.position.x >= stopZone.start &&
        carRef.current.position.x <= stopZone.end
      : carRef.current.position.z >= stopZone.start &&
        carRef.current.position.z <= stopZone.end;

    if (isInStopZone && !trafficLightState && !hasPassedTrafficLight) {
      waitTimeRef.current += delta;

      if (
        waitTimeRef.current > impatienceThresholdRef.current &&
        !isImpatientRef.current
      ) {
        isImpatientRef.current = true;
        setIsVisuallyImpatient(true);

        setTimeout(() => {
          setIsVisuallyImpatient(false);
        }, 1500);

        if (window.gameAudio && window.gameAudio.playHorn) {
          window.gameAudio.playHorn();
        }
      }

      if (!isImpatientRef.current) {
        return;
      }
    } else {
      // Car is moving or light is green - reset wait time
      waitTimeRef.current = 0;
    }

    if (direction.includes("horizontal")) {
      carRef.current.position.x += speed;

      if (carRef.current.position.x > 15) {
        onCarExit && onCarExit();
      }
    } else {
      carRef.current.position.z += speed;

      if (carRef.current.position.z > 15) {
        onCarExit && onCarExit();
      }
    }
  });

  const carColor = isVisuallyImpatient ? IMPATIENT_COLOR : color;

  const cabinDimensions = [
    dimensions[0] * 0.7,
    dimensions[1] * 0.9,
    dimensions[2] * 0.6,
  ];

  return (
    <group ref={carRef} position={initialPosition}>
      {/* Car Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={dimensions} />
        <meshStandardMaterial
          color={carColor}
          metalness={0.1}
          roughness={0.5}
        />
      </mesh>

      {/* Car Cabin */}
      <mesh
        castShadow
        receiveShadow
        position-y={dimensions[1] * 0.5}
        position-x={direction.includes("vertical") ? 0 : -dimensions[0] * 0.1}
        position-z={
          direction.includes("horizontal") ? 0 : -dimensions[2] * 0.15
        }
      >
        <boxGeometry args={cabinDimensions} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.1}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Visual feedback for impatient cars - always render but conditionally position */}
      <Text
        position={[0, dimensions[1] + 1, 0]}
        fontSize={0.5}
        color="red"
        anchorX="center"
        anchorY="middle"
        visible={isVisuallyImpatient}
      >
        😡
      </Text>
    </group>
  );
}

export default Car;
