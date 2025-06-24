import { useState, useEffect, useRef } from "react";
import Car from "./Car";
import TrafficLight from "./TrafficLight";
import CollisionDetector from "./CollisionDetector";
import { usePhase } from "../contexts/PhaseContext";
import { getRandomCarConfig } from "../utils/paths";

function TrafficController() {
  const [cars, setCars] = useState([]);
  const carsRef = useRef(cars);
  const [trafficLightStates, setTrafficLightStates] = useState({});
  const { currentPhase, gameOver, handleCarPassed, handleGameOver } =
    usePhase();

  useEffect(() => {
    const initialStates = {};
    currentPhase.trafficLights.forEach((light) => {
      initialStates[light.id] = light.id.includes("horizontal") ? true : false;
    });
    setTrafficLightStates(initialStates);

    return () => {
      setCars([]);
    };
  }, [currentPhase]);

  useEffect(() => {
    if (gameOver) {
      handleGameOver();
      setCars([]);
    }
  }, [gameOver, handleGameOver]);

  useEffect(() => {
    const handleRestart = () => {
      resetGame();
    };

    window.addEventListener("restartGame", handleRestart);
    return () => {
      window.removeEventListener("restartGame", handleRestart);
    };
  }, []);

  const spawnCar = (spawnPoint) => {
    const carConfig = getRandomCarConfig();
    carConfig.direction = spawnPoint.direction;
    carConfig.initialPosition = spawnPoint.position;
    carConfig.speed = currentPhase.carSpeed;
    setCars((prevCars) => [...prevCars, carConfig]);
  };

  const removeCar = (carId) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    if (!gameOver) {
      handleCarPassed();
    }
  };

  const handleTrafficLightChange = (lightId, newState) => {
    setTrafficLightStates((prev) => ({
      ...prev,
      [lightId]: newState,
    }));
  };

  const handleCollision = () => {
    handleGameOver();
  };

  const resetGame = () => {
    setCars([]);
  };

  const getTrafficLightStateForDirection = (direction) => {
    const controllingLight = currentPhase.trafficLights.find(
      (light) =>
        light.controls === direction || light.controls.includes(direction)
    );

    return controllingLight ? trafficLightStates[controllingLight.id] : true;
  };

  const getCarCountInDirection = (direction) => {
    return carsRef.current.filter((car) => car.direction === direction).length;
  };

  useEffect(() => {
    if (gameOver) return;

    const intervals = [];

    currentPhase.spawnPoints.forEach((spawnPoint) => {
      const spawnRate = currentPhase.spawnRate[spawnPoint.direction];

      const interval = setInterval(() => {
        if (!gameOver) {
          const carCount = getCarCountInDirection(spawnPoint.direction);

          if (carCount <= currentPhase.maxCarsPerAvenue) {
            spawnCar(spawnPoint);
          }
        }
      }, spawnRate);

      intervals.push(interval);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [gameOver, currentPhase]);

  useEffect(() => {
    carsRef.current = cars;
  }, [cars]);

  return (
    <group>
      {currentPhase.trafficLights.map((light) => (
        <TrafficLight
          key={light.id}
          position={light.position}
          onStateChange={(newState) =>
            handleTrafficLightChange(light.id, newState)
          }
          lightType={light.controls}
        />
      ))}

      <CollisionDetector onCollision={handleCollision} />

      {cars.map((car) => (
        <Car
          key={car.id}
          id={car.id}
          direction={car.direction}
          color={car.color}
          speed={car.speed}
          initialPosition={car.initialPosition}
          trafficLightState={getTrafficLightStateForDirection(car.direction)}
          gameOver={gameOver}
          onCarExit={() => removeCar(car.id)}
        />
      ))}
    </group>
  );
}

export default TrafficController;
