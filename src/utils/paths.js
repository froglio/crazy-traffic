export const CAR_SPAWN_CONFIGS = {
  horizontal: {
    direction: "horizontal",
    initialPosition: [-15, 0.5, 0],
    speed: 0.05,
    colors: [
      "red",
      "blue",
      "green",
      "yellow",
      "purple",
      "white",
      "black",
      "gray",
    ],
  },

  vertical: {
    direction: "vertical",
    initialPosition: [0, 0.5, -15],
    speed: 0.05,
    colors: [
      "red",
      "blue",
      "green",
      "yellow",
      "purple",
      "white",
      "black",
      "gray",
    ],
  },
};

export function getRandomCarConfig() {
  const directions = Object.keys(CAR_SPAWN_CONFIGS);
  const randomDirection =
    directions[Math.floor(Math.random() * directions.length)];
  const config = CAR_SPAWN_CONFIGS[randomDirection];

  const randomColor =
    config.colors[Math.floor(Math.random() * config.colors.length)];

  return {
    ...config,
    color: randomColor,
    id: Date.now() + Math.random(),
  };
}

export const SPAWN_INTERVALS = {
  horizontal: 3000,
  vertical: 3500,
};
