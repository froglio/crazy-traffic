import { useFrame } from "@react-three/fiber";
import { useCarRegistry } from "../contexts/CarRegistryContext";

function CollisionDetector({ onCollision }) {
  const { getAllCars } = useCarRegistry();

  useFrame(() => {
    const cars = getAllCars();

    if (cars.length < 2) return;

    for (let i = 0; i < cars.length; i++) {
      for (let j = i + 1; j < cars.length; j++) {
        const carA = cars[i];
        const carB = cars[j];

        if (!carA || !carB) {
          continue;
        }

        // Only detect collisions between cars moving in different directions
        // Check if cars are in different lanes (crossing paths)
        const carAIsHorizontal = Math.abs(carA.position.z) < 1;
        const carBIsHorizontal = Math.abs(carB.position.z) < 1;

        if (carAIsHorizontal === carBIsHorizontal) {
          continue;
        }

        const distance = carA.position.distanceTo(carB.position);

        if (distance < 2.0) {
          if (window.gameAudio && window.gameAudio.playCrash) {
            window.gameAudio.playCrash();
          }

          onCollision && onCollision(carA, carB);
          return;
        }
      }
    }
  });

  return null;
}

export default CollisionDetector;
