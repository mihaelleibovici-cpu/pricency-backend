import axios from 'axios';

export default async function handler(req, res) {
  // שחרור חסימת הגישה מהאתר שלך
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { q } = req.query;
  const apiKey = process.env.SERPAPI_API_KEY;

  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: "google",
        q: q,
        api_key: apiKey,
        hl: "he",
        gl: "il"
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
}
