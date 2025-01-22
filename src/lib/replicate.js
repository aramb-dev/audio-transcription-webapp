import Replicate from 'replicate';

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const transcribeAudio = async (audioUrl) => {
  try {
    const output = await replicate.run(
      "vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c",
      {
        input: {
          audio: audioUrl,
          batch_size: 64
        }
      }
    );
    return output;
  } catch (error) {
    throw new Error(`Transcription failed: ${error.message}`);
  }
};