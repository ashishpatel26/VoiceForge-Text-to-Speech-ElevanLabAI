import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { TextInput } from './components/TextInput';
import { AudioPlayer } from './components/AudioPlayer';
import { PreviewPanel } from './components/PreviewPanel';
import { VoiceCloner } from './components/VoiceCloner';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A1B3D] via-[#44318D] to-[#8265A7]">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Left Panel - Voice Cloning */}
          <div className="space-y-6">
            <VoiceCloner />
            <PreviewPanel onSelectPreview={(text) => console.log(text)} />
          </div>
          
          {/* Right Panel - Text to Speech */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Text to Speech</h2>
              <p className="text-gray-200">Transform your text into natural speech</p>
            </div>
            <TextInput />
            <AudioPlayer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;