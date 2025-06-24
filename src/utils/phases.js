export const PHASES = [
  {
    id: 1,
    name: "Phase 1 - Simple Crossover",
    description: "Learn the basics of traffic control",
    layout: "cross",
    trafficLights: [
      { id: "horizontal", position: [2, 0, 2], controls: "horizontal" },
      { id: "vertical", position: [-2, 0, -2], controls: "vertical" },
    ],
    spawnPoints: [
      { direction: "horizontal", position: [-15, 0.5, 0] },
      { direction: "vertical", position: [0, 0.5, -15] },
    ],
    targetCars: 10,
    spawnRate: { horizontal: 3000, vertical: 3500 },
    carSpeed: 0.05,
    maxCarsPerAvenue: 4,
    difficulty: "easy",
  },
  {
    id: 2,
    name: "Phase 2 - Two Intersections",
    description: "Manage two intersections simultaneously",
    layout: "double-cross",
    trafficLights: [
      { id: "horizontal-1", position: [2, 0, 2], controls: "horizontal-1" },
      { id: "vertical-1", position: [-2, 0, -2], controls: "vertical-1" },
      { id: "horizontal-2", position: [2, 0, -8], controls: "horizontal-2" },
      { id: "vertical-2", position: [8, 0, -2], controls: "vertical-2" },
    ],
    spawnPoints: [
      { direction: "horizontal-1", position: [-15, 0.5, 0] },
      { direction: "vertical-1", position: [0, 0.5, -15] },
      { direction: "horizontal-2", position: [-15, 0.5, -10] },
      { direction: "vertical-2", position: [10, 0.5, -15] },
    ],
    targetCars: 15,
    spawnRate: {
      "horizontal-1": 2500,
      "vertical-1": 3000,
      "horizontal-2": 2500,
      "vertical-2": 3000,
    },
    carSpeed: 0.06,
    maxCarsPerAvenue: 3,
    difficulty: "medium",
  },
  {
    id: 3,
    name: "Phase 3 - Heavy Traffic",
    description: "Lots of cars, little time to think",
    layout: "cross",
    trafficLights: [
      { id: "horizontal", position: [2, 0, 2], controls: "horizontal" },
      { id: "vertical", position: [-2, 0, -2], controls: "vertical" },
    ],
    spawnPoints: [
      { direction: "horizontal", position: [-15, 0.5, 0] },
      { direction: "vertical", position: [0, 0.5, -15] },
    ],
    targetCars: 20,
    spawnRate: { horizontal: 500, vertical: 800 },
    carSpeed: 0.18,
    maxCarsPerAvenue: 4,
    difficulty: "hard",
  },
];

export function getPhaseById(id) {
  return PHASES.find((phase) => phase.id === id);
}

export function getNextPhase(currentPhaseId) {
  const currentIndex = PHASES.findIndex((phase) => phase.id === currentPhaseId);
  return currentIndex < PHASES.length - 1 ? PHASES[currentIndex + 1] : null;
}

export function isPhaseCompleted(carsPassed, targetCars) {
  return carsPassed >= targetCars;
}
