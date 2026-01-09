import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors({
  origin: '*',
}));
app.use(express.json());

const filePath = path.resolve('./quotes.json');
let quotes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
app.get('/api/quotes', (req, res) => {
  res.json(quotes);
});

app.post('/api/quotes', (req, res) => {
  const { quote, author } = req.body;

  if (!quote || !author) {
    return res.status(400).json({ error: 'quote and author are required' });
  }

  const newQuote = {
    id: quotes.length + 1,
    quote,
    author
  };

  quotes.push(newQuote);
  fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2));

  res.status(201).json(newQuote);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
