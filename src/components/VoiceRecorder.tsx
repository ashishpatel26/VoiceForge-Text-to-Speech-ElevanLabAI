import React, { useState, useRef } from 'react';
import { Mic, Square, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.success('Recording started');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success('Recording completed');
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      {isRecording ? (
        <div className="flex items-center gap-4">
          <div className="flex gap-1 items-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-purple-light animate-waveform"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <button
            onClick={stopRecording}
            className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <Square size={20} />
          </button>
        </div>
      ) : (
        <button
          onClick={startRecording}
          className="p-3 rounded-full bg-purple-light text-white hover:bg-purple transition-colors"
        >
          <Mic size={20} />
        </button>
      )}
      
      {audioBlob && !isRecording && (
        <div className="text-sm text-gray-600">
          Recording saved! You can now use it for voice cloning.
        </div>
      )}
    </div>
  );
}