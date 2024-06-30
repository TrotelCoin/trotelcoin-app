import { useRef, useState } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/20/solid";

const AudioComponent = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="/audio/lofi.mp3"
        preload="auto"
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.play();
          }
        }}
      />
      <button
        className="rounded-full bg-white p-2 text-gray-900 hover:bg-gray-100 focus:bg-white dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
        onClick={toggleAudio}
      >
        {isPlaying ? (
          <>
            <SpeakerWaveIcon className="h-5 w-5" />
          </>
        ) : (
          <>
            <SpeakerXMarkIcon className="h-5 w-5" />
          </>
        )}
      </button>
    </div>
  );
};

export default AudioComponent;
