import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpotifyData = () => {
  const [spotifyData, setSpotifyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://spotify-web2.p.rapidapi.com/search/',
        params: {
          q: 'jão',
          type: 'multi',
          offset: '0',
          limit: '10',
          numberOfTopResults: '5',
        },
        headers: {
          'X-RapidAPI-Key': 'd4de8578ebmsheab69c6aea9b8a6p1ea851jsn554d4ca0227a',
          'X-RapidAPI-Host': 'spotify-web2.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data); // Adiciona esta linha para verificar a resposta da API

        // Verifica se a resposta da API contém a propriedade 'albums' ou 'artists'
        if (response.data.albums) {
          setSpotifyData(response.data.albums.items);
        } else if (response.data.artists) {
          setSpotifyData(response.data.artists.items);
        } else {
          console.error('A resposta da API não contém a propriedade esperada (albums ou artists).');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Spotify Data</h1>
      <ul>
        {Array.isArray(spotifyData) && spotifyData.map((item) => (
          <li key={item.uri}>
            {item.name} - {item.artists ? item.artists[0].name : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyData;
