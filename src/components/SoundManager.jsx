import { useEffect } from "react";
import useSound from "use-sound";
import { useAudio } from "../contexts/AudioContext";

function SoundManager() {
  const { getEffectiveVolume } = useAudio();

  const [playClick] = useSound("/sounds/click.mp3", {
    volume: getEffectiveVolume(),
    interrupt: true,
  });

  const [playCrash] = useSound("/sounds/crash.mp3", {
    volume: getEffectiveVolume(),
    interrupt: true,
  });

  const [playHorn] = useSound("/sounds/horn.mp3", {
    volume: getEffectiveVolume(),
    interrupt: true,
  });

  const [playSuccess] = useSound("/sounds/win.mp3", {
    volume: getEffectiveVolume(),
    interrupt: true,
  });

  const [playBackground, { stop: stopBackground }] = useSound(
    "/sounds/background.mp3",
    {
      volume: getEffectiveVolume() * 0.5,
      loop: true,
      interrupt: false,
    }
  );

  useEffect(() => {
    const volume = getEffectiveVolume();

    if (volume > 0) {
      stopBackground();
      setTimeout(() => {
        playBackground();
      }, 100);
    } else {
      stopBackground();
    }
  }, [getEffectiveVolume, playBackground, stopBackground]);

  useEffect(() => {
    const volume = getEffectiveVolume();
    if (volume > 0) {
      setTimeout(() => {
        playBackground();
      }, 500);
    }
  }, []);

  useEffect(() => {
    window.gameAudio = {
      playClick,
      playCrash,
      playHorn,
      playSuccess,
      playBackground,
      stopBackground,
    };

    return () => {
      delete window.gameAudio;
    };
  }, [
    playClick,
    playCrash,
    playHorn,
    playSuccess,
    playBackground,
    stopBackground,
  ]);

  return null;
}

export default SoundManager;
