import React, { useState, useRef } from 'react';
import { Upload, Mic, X } from 'lucide-react';
import { VoiceRecorder } from './VoiceRecorder';
import toast from 'react-hot-toast';

export function VoiceCloner() {
  const [isDragging, setIsDragging] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (isValidAudioFile(file)) {
      setAudioFile(file);
    } else {
      toast.error('Please upload a valid audio file (MP3, WAV, or M4A)');
    }
  };

  const isValidAudioFile = (file: File): boolean => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/x-m4a', 'audio/mp4'];
    return file && validTypes.includes(file.type);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidAudioFile(file)) {
      setAudioFile(file);
    }
  };

  const handleRemoveFile = () => {
    setAudioFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#8265A7]/20 rounded-lg">
          <Mic className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Voice Cloning</h2>
          <p className="text-gray-300">Record or upload your voice sample</p>
        </div>
      </div>
      
      <VoiceRecorder />
      
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging
            ? 'border-[#8265A7] bg-[#44318D]/30'
            : 'border-white/20 hover:border-[#8265A7]'
        }`}
      >
        {audioFile ? (
          <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#8265A7]/20 rounded-lg">
                <Mic size={16} className="text-white" />
              </div>
              <span className="text-white">{audioFile.name}</span>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="mx-auto text-white mb-4" size={32} />
            <p className="text-white mb-2">
              Drag and drop your voice sample or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-[#8265A7] hover:text-white transition-colors"
              >
                browse
              </button>
            </p>
            <p className="text-gray-400">
              Supported formats: MP3, WAV, M4A (max 10MB)
            </p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/mpeg,audio/wav,audio/x-m4a,audio/mp4"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}