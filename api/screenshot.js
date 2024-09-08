// api/screenshot.js

export default async function handler(req, res) {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: 'No URL provided' });
    }
  
    const response = await fetch(`http://api.screenshotlayer.com/api/capture?url=${encodeURIComponent(url)}&format=png`);
  
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to capture screenshot' });
    }
  
    const screenshotBuffer = await response.buffer();
    const screenshotUrl = `data:image/png;base64,${screenshotBuffer.toString('base64')}`;
    
    return res.status(200).json({ screenshotUrl });
  }
  