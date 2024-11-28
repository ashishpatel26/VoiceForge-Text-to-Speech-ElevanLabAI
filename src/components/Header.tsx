import React from 'react';
import { Mic } from 'lucide-react';
import { APP_NAME } from '../lib/constants';

export function Header() {
  return (
    <div className="text-center mb-12">
      <div className="inline-block p-4 bg-gradient-to-br from-[#8265A7] to-[#44318D] rounded-full text-white mb-6 shadow-lg">
        <Mic size={36} className="animate-pulse" />
      </div>
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        {APP_NAME}
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        Transform your text into natural speech with our advanced AI voice synthesis.
        Clone voices or use our pre-trained models for lifelike audio generation.
      </p>
    </div>
  );
}