import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, processType } = req.body;
    
    const input = {
      audio: url,
      batch_size: 64
    };

    const output = await replicate.run(
      "vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c",
      { input }
    );

    return res.status(200).json(output);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}