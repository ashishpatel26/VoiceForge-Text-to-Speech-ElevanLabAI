import { ELEVENLABS_CONFIG, AUDIO_SETTINGS } from './constants';

export async function synthesizeSpeech(text: string): Promise {
  try {
    const response = await fetch(
      `${ELEVENLABS_CONFIG.API_URL}/text-to-speech/${ELEVENLABS_CONFIG.VOICE_IDS.chris}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_CONFIG.API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: AUDIO_SETTINGS.DEFAULT_STABILITY,
            similarity_boost: AUDIO_SETTINGS.DEFAULT_SIMILARITY,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('ElevenLabs API Error:', errorData);
      throw new Error(errorData.detail?.message || 'Failed to synthesize speech');
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    throw error;
  }
}