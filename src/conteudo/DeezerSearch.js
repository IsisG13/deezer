import React, { useEffect, useState } from "react";
import "../App.css";

const DeezerSearch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pesquisarMusicas, setPesquisarMusicas] = useState("artic monkeys");

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${pesquisarMusicas}`;
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
        setData(result.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Erro na solicitação:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [pesquisarMusicas]);

  const handleSearch = () => {
    setLoading(true);
    setData([]);
    setPesquisarMusicas(document.getElementById("nomeArtista").value);
  };

  return (
    <div className="App">
      <div className="cabecalho">
        <h1>
          Escute uma prévia das suas músicas preferidas ou ouça pelo Deezer
        </h1>

        <div className="pesquisa">
          <form>
            <input
              id="nomeArtista"
              className="input"
              type="text"
              placeholder="Digite o nome do seu artista."
            />
            <br />
            <button type="button" className="button" onClick={handleSearch}>
              Buscar
            </button>
          </form>
        </div>
      </div>

      <div className="grid-container">
        {loading ? (
          <p>Carregando...</p>
        ) : data.length > 0 ? (
          data.map((item) => (
            <div className="conteudo" key={item.id}>
              <a href={item.link} className="imagemOuvir" target="_blank">
                <img
                  id="picture"
                  className="imagem"
                  src={item.album.cover_medium}
                  alt={item.title}
                />
              </a>
              <div className="conteudo-descricao">
                <audio controls className="audio">
                  <source src={item.preview} type="audio/mp3" />
                  Seu navegador não suporta o elemento de áudio.
                </audio>
                <div className="descricao">
                  <h3 className="title" id="title">
                    {item.title} | {Math.floor(item.duration / 60)}:
                    {(item.duration % 60).toString().padStart(2, "0")}
                  </h3>
                  <h3 id="name">{item.artist.name}</h3>
                  <h3>
                    <a href={item.link} target="_blank">
                      Ouvir no Deezer
                    </a>
                  </h3>
                  <h3>{item.tracklist}</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default DeezerSearch;
