import { create } from 'zustand';

interface AudioState {
  audioUrl: string | null;
  isPlaying: boolean;
  setAudioUrl: (url: string | null) => void;
  setIsPlaying: (playing: boolean) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  audioUrl: null,
  isPlaying: false,
  setAudioUrl: (url) => set({ audioUrl: url }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
}));