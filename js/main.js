let resultadosAtuais = [];
let favoritos = [];

function carregarFavoritosDoStorage() {
  try {
    const raw = localStorage.getItem("favoritosSeries");
    if (raw) {
      const arr = JSON.parse(raw);
      favoritos = arr.map(
        (s) => new Serie(s.id, s.titulo, s.ano, s.imagem, s.nota, s.resumo)
      );
    }
  } catch (e) {
    console.warn("Não foi possível carregar favoritos do storage.", e);
  }
};

carregarFavoritosDoStorage()

function salvarFavoritosNoStorage() {
  try {
    localStorage.setItem("favoritosSeries", JSON.stringify(favoritos));
  } catch (e) {
    console.warn("Não foi possível salvar favoritos no storage.", e);
  }
}

function toggleFavorito(serie) {
  const existe = favoritos.some((fav) => fav.id === serie.id);
  if (existe) {
    favoritos = favoritos.filter((fav) => fav.id !== serie.id);
  } else {
    favoritos.push(serie);
  }

  salvarFavoritosNoStorage();

  const resultadosEl = document.getElementById("resultados");
  if (resultadosEl) {
    renderizarResultados(resultadosAtuais, favoritos, toggleFavorito);
  }

  const listaFavEl = document.getElementById("lista-favoritos");
  if (listaFavEl) {
    atualizarListaFavoritos();
  }
}

function atualizarListaFavoritos() {
  const campoFiltro = document.getElementById("filtro-favoritos");
  const termo = campoFiltro ? campoFiltro.value || "" : "";

  const filtrados = filtrarSeriesPorTitulo(favoritos, termo);
  renderizarFavoritos(filtrados, toggleFavorito);
  atualizarResumoFavoritos(filtrados);
}

function onSubmitBusca(evento) {
  evento.preventDefault();
  const input = document.getElementById("busca");
  const mensagem = document.getElementById("mensagem-status");

  const termo = input.value.trim();
  if (!termo) return;

  mensagem.textContent = "Buscando séries...";

  buscarSeriesPorNome(termo)
    .then((series) => {
      resultadosAtuais = series;
      mensagem.textContent = `Encontradas ${series.length} séries para "${termo}".`;
      renderizarResultados(resultadosAtuais, favoritos, toggleFavorito);
    })
}

function init() {
  const formBusca = document.getElementById("form-busca");
  if (formBusca) {
    formBusca.addEventListener("submit", onSubmitBusca);
  }

  const filtroFavoritos = document.getElementById("filtro-favoritos");
  if (filtroFavoritos) {
    filtroFavoritos.addEventListener("input", atualizarListaFavoritos);
    atualizarListaFavoritos();
  }
}

init()
