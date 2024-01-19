const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/deezer-search', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    params: { q: 'teto' },
    headers: {
      'X-RapidAPI-Key': '400aa04bb1mshb2d036df856a660p1f6351jsne40e75e39652',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json({ data: response.data.data, artist: response.data.artist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter dados da API Deezer' });
  }  
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
