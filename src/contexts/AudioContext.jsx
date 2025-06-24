import { createContext, useContext, useState, useEffect } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const setAudioVolume = (newVolume) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };

  const getEffectiveVolume = () => {
    return isMuted ? 0 : volume;
  };

  useEffect(() => {
    const savedMuted = localStorage.getItem("crazyTraffic_muted");
    const savedVolume = localStorage.getItem("crazyTraffic_volume");

    if (savedMuted !== null) {
      setIsMuted(JSON.parse(savedMuted));
    }

    if (savedVolume !== null) {
      setVolume(parseFloat(savedVolume));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("crazyTraffic_muted", JSON.stringify(isMuted));
    localStorage.setItem("crazyTraffic_volume", volume.toString());
  }, [isMuted, volume]);

  const value = {
    isMuted,
    volume,
    toggleMute,
    setAudioVolume,
    getEffectiveVolume,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
