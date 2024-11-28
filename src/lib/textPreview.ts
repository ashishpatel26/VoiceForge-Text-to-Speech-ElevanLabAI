export function generatePreviewText(): string {
  const previewTexts = [
    "Welcome to VoiceForge! Transform this text into natural speech.",
    "Experience the power of AI voice synthesis with this sample text.",
    "Hello world! This is a preview of our text-to-speech technology.",
    "Try our advanced voice synthesis with this example message.",
    "Convert this preview text into lifelike speech with just one click."
  ];
  
  return previewTexts[Math.floor(Math.random() * previewTexts.length)];
}