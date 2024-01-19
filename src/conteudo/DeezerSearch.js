import React, { useEffect, useState } from "react";
import "../App.css";

const DeezerSearch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=ludmilla";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "400aa04bb1mshb2d036df856a660p1f6351jsne40e75e39652",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result.data || []); // Certifique-se de que existe a propriedade 'data'
        setLoading(false);
      } catch (error) {
        console.error("Erro na solicitação:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayResults = () => {
    if (loading) {
      return <p>Carregando...</p>;
    } else if (data.length > 0) {
      return data.map((item) => (
        <div className="App" key={item.id}>
          <img
            className="imagem"
            src={item.album.cover_medium}
            alt={item.title}
          />
          <div className="conteudo">
            <h3>
              {item.title} | {Math.floor(item.duration / 60)}:
              {(item.duration % 60).toString().padStart(2, "0")}
            </h3>
            <h3>{item.artist.name}</h3>
            <h3>
              <a href={item.preview}>Prévia</a> <br/>
              <a href={item.link}>Ouvir</a>
            </h3>

            <h3>{item.tracklist}</h3>
          </div>
        </div>
      ));
    } else {
      return <p>Nenhum resultado encontrado.</p>;
    }
  };

  return (
    <div>
      <h2>Resultados da Pesquisa:</h2>
      {displayResults()}
    </div>
  );
};

export default DeezerSearch;
