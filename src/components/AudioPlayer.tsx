import React, { useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Download } from 'lucide-react';
import { useAudioStore } from '../store/useAudioStore';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { audioUrl, isPlaying, setIsPlaying } = useAudioStore();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'generated-speech.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!audioUrl) return null;

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mt-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Volume2 size={20} className="text-gray-500" />
            <div className="text-sm text-gray-600">Generated Audio</div>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          title="Download audio"
        >
          <Download size={20} />
        </button>
      </div>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
}