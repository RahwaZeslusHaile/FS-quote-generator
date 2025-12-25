import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const filePath = path.resolve('../frontend/quotes.json');
let quotes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
app.get('/api/quotes', (req, res) => {
  res.json(quotes);
});

app.post('/api/quotes', (req, res) => {
  const { text, author } = req.body;

  if (!text || !author) {
    return res.status(400).json({ error: 'Text and author are required' });
  }

  const newQuote = {
    id: quotes.length + 1,
    text,
    author
  };

  quotes.push(newQuote);
  fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2));

  res.status(201).json(newQuote);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
