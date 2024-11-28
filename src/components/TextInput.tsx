import React, { useState } from 'react';
import { Send, RefreshCw, Settings } from 'lucide-react';
import { synthesizeSpeech } from '../lib/elevenlabs';
import { useAudioStore } from '../store/useAudioStore';
import { generatePreviewText } from '../lib/textPreview';
import toast from 'react-hot-toast';

export function TextInput() {
  const [text, setText] = useState(generatePreviewText());
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { setAudioUrl } = useAudioStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error('Please enter some text to convert to speech');
      return;
    }

    setIsLoading(true);
    try {
      const audioUrl = await synthesizeSpeech(text);
      setAudioUrl(audioUrl);
      toast.success('Speech generated successfully!');
    } catch (error) {
      console.error('Speech synthesis error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate speech. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshPreview = () => {
    setText(generatePreviewText());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full min-h-[120px] p-4 pr-12 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none bg-white/80"
          disabled={isLoading}
        />
        <div className="absolute right-3 bottom-3 flex gap-2">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="Voice settings"
          >
            <Settings size={20} />
          </button>
          <button
            type="button"
            onClick={handleRefreshPreview}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="Generate new preview text"
          >
            <RefreshCw size={20} />
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`p-2 rounded-full ${
              isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors flex items-center justify-center`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      
      {showSettings && (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-4 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Voice Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Stability</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Clarity + Similarity Enhancement</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="75"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}