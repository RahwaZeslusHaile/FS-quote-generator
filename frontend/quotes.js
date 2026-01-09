let quotes = [];

const displayRandomQuote = () => {
  if (!quotes.length) return;

  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[quoteIndex];

  document.getElementById('quote').textContent = selectedQuote.quote;
  document.getElementById('author').textContent = `- ${selectedQuote.author}`;
};

async function loadQuotes() {
  try {
    const res = await fetch('http://localhost:3000/api/quotes');
    if (!res.ok) throw new Error('Quotes not fetched correctly');

    const data = await res.json();
    quotes = data;
    displayRandomQuote();
  } catch (err) {
    document.getElementById("quote").textContent = 'Could not load quotes.';
    console.error('Error:', err);
  }
}

loadQuotes();

const addQuoteForm = document.getElementById('add-quote-form');
const newQuoteText = document.getElementById('new-quote-text');
const newQuoteAuthor = document.getElementById('new-quote-author');

addQuoteForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const quote = newQuoteText.value.trim();
  const author = newQuoteAuthor.value.trim();

  if (!quote || !author) return;

  try {
    const res = await fetch('http://localhost:3000/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({quote, author })
    });

    if (!res.ok) throw new Error('Failed to add quote');

    const newQuote = await res.json();

    quotes.push(newQuote);

    document.getElementById('quote').textContent = newQuote.quote;
    document.getElementById('author').textContent = `- ${newQuote.author}`;

    addQuoteForm.reset();
  } catch (err) {
    console.error(err);
    alert('Error adding quote');
  }
});

document
  .getElementById('new-quote')
  .addEventListener('click', displayRandomQuote);

let intervalId;
const autoPlayCheckBox = document.getElementById('autoplay-toggle');
const autoPlayStatus = document.getElementById('autoplay-status');

autoPlayCheckBox.addEventListener('change', () => {
  if (autoPlayCheckBox.checked) {
    autoPlayStatus.textContent = "Auto-play: ON";
    intervalId = setInterval(displayRandomQuote, 1000);
  } else {
    autoPlayStatus.textContent = "Auto-play: OFF";
    clearInterval(intervalId);
  }
});
