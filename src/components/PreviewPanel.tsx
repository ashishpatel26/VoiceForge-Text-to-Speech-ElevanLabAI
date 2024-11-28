import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { generatePreviewText } from '../lib/textPreview';

interface PreviewPanelProps {
  onSelectPreview: (text: string) => void;
}

export function PreviewPanel({ onSelectPreview }: PreviewPanelProps) {
  const previewExamples = Array.from({ length: 3 }, () => generatePreviewText());

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#8265A7]/20 rounded-lg">
          <Sparkles className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Example Previews</h2>
          <p className="text-gray-300">Try these sample texts</p>
        </div>
      </div>
      <div className="space-y-3">
        {previewExamples.map((text, index) => (
          <button
            key={index}
            onClick={() => onSelectPreview(text)}
            className="w-full text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-start gap-3">
              <BookOpen className="text-gray-400 group-hover:text-white mt-1" size={16} />
              <p className="text-gray-300 group-hover:text-white">{text}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}