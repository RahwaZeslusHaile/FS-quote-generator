const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : 'https://quotebackend.hosting.codeyourfuture.io'; 

export { API_URL };
