function buscarSeriesPorNome(termo) {
  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(termo)}`;

  return fetch(url)
    .then((resposta) => {
      return resposta.json();
    })
    .then((dados) => {
      return mapearParaSeries(dados);
    })
}

window.buscarSeriesPorNome = buscarSeriesPorNome;
