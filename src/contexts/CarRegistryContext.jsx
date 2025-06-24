import { createContext, useContext, useRef, useCallback } from "react";

const CarRegistryContext = createContext();

export function CarRegistryProvider({ children }) {
  const carsRef = useRef(new Map());

  const registerCar = useCallback((carId, carRef) => {
    carsRef.current.set(carId, carRef);
  }, []);

  const unregisterCar = useCallback((carId) => {
    carsRef.current.delete(carId);
  }, []);

  const getAllCars = useCallback(() => {
    const cars = Array.from(carsRef.current.values());
    return cars;
  }, []);

  const getAllCarIds = useCallback(() => {
    return Array.from(carsRef.current.keys());
  }, []);

  const value = {
    registerCar,
    unregisterCar,
    getAllCars,
    getAllCarIds,
  };

  return (
    <CarRegistryContext.Provider value={value}>
      {children}
    </CarRegistryContext.Provider>
  );
}

export function useCarRegistry() {
  const context = useContext(CarRegistryContext);
  if (!context) {
    throw new Error("useCarRegistry must be used within a CarRegistryProvider");
  }
  return context;
}
