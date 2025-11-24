export default async function handler(req, res) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  // Jos halutaan dynaaminen kaupunki, voidaan lukea query-parametri
  const city = req.query.city || "Raahe"; // default = Raahe

  const days = 7; // ennuste 7 päivälle

  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${days}&units=metric&lang=fi&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "API error" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
