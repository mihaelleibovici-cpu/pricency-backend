const axios = require('axios');

module.exports = async (req, res) => {
    // הגדרות אבטחה שמאפשרות לאתר שלך לגשת לנתונים
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // שליפת מילת החיפוש מהכתובת
    const { q } = req.query;
    
    // המפתח הסודי שלך - עכשיו הוא מוגן בתוך השרת
    const API_KEY = "f93468b7cf17169a9dd3584bc3c91fe10947b64b19e0cf52266a0aaa35775903";

    if (!q) {
        return res.status(400).json({ error: "נא להזין מוצר לחיפוש" });
    }

    try {
        // פנייה ל-SerpApi כדי להביא מחירים מ-Google Shopping
        const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(q)}&hl=he&gl=il&api_key=${API_KEY}`;
        const response = await axios.get(url);
        
        // שליחת התוצאות בחזרה לאתר שלך
        res.status(200).json(response.data);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "שגיאה במשיכת הנתונים מהשרת" });
    }
};
