import fetch from 'node-fetch'; // Certifique-se de ter node-fetch instalado

export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    const apiUrl = `http://api.screenshotlayer.com/api/capture?url=${encodeURIComponent(url)}&format=png`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to capture screenshot');
    }

    const screenshotBuffer = await response.buffer();
    const screenshotUrl = `data:image/png;base64,${screenshotBuffer.toString('base64')}`;
    
    return res.status(200).json({ screenshotUrl });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
