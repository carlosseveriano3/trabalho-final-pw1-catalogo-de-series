function criarCardSerie(serie, ehFavorita, onToggleFavorito) {
  const card = document.createElement("article");
  card.className = "card";

  if (serie.imagem) {
    const img = document.createElement("img");
    img.src = serie.imagem;
    img.alt = `Poster de ${serie.titulo}`;
    card.appendChild(img);
  }

  const titulo = document.createElement("h3");
  titulo.textContent = serie.titulo;
  card.appendChild(titulo);

  const ano = document.createElement("small");
  ano.textContent = serie.getLabelAno();
  card.appendChild(ano);

  const nota = document.createElement("span");
  nota.classList.add("badge");
  const notaValor = serie.nota;

  if (notaValor) {
    nota.textContent = `Nota: ${serie.getNotaFormatada()}`;

    if (notaValor >= 8) {
      nota.classList.add("good");
    } else if (notaValor >= 6) {
      nota.classList.add("medium");
    } else {
      nota.classList.add("bad");
    }
  } else {
    nota.textContent = "Sem nota";
  }
  card.appendChild(nota);

  const footer = document.createElement("div");
  footer.className = "card-footer";

  const botao = document.createElement("button");
  botao.textContent = ehFavorita ? "Remover favorito" : "Favoritar";

  botao.addEventListener("click", () => {
    onToggleFavorito(serie);
  });

  footer.appendChild(botao);
  card.appendChild(footer);

  return card;
}

function renderizarResultados(series, favoritos, onToggleFavorito) {
  const container = document.getElementById("resultados");
  container.innerHTML = "";

  if (series.length === 0) {
    container.textContent = "Nenhuma série encontrada.";
    return;
  }

  series.forEach((serie) => {
    const ehFavorita = favoritos.some((fav) => fav.id === serie.id);
    const card = criarCardSerie(serie, ehFavorita, onToggleFavorito);
    container.appendChild(card);
  });
}

function renderizarFavoritos(seriesFavoritas, onToggleFavorito) {
  const container = document.getElementById("lista-favoritos");
  container.innerHTML = "";

  if (seriesFavoritas.length === 0) {
    container.textContent = "Você ainda não favoritou nenhuma série.";
    return;
  }

  seriesFavoritas.forEach((serie) => {
    const card = criarCardSerie(serie, true, onToggleFavorito);
    container.appendChild(card);
  });
}

function atualizarResumoFavoritos(seriesFavoritas) {
  const elResumo = document.getElementById("resumo-favoritos");
  const total = seriesFavoritas.length;
  const media = calcularMediaNota(seriesFavoritas);

  let texto = `Total de favoritos: ${total}`;
  if (media !== null) {
    texto += ` | Média de nota: ${media.toFixed(2)}`;
  } else {
    texto += ` | Sem notas suficientes para média.`;
  }

  elResumo.textContent = texto;
}

window.criarCardSerie = criarCardSerie;
window.renderizarResultados = renderizarResultados;
window.renderizarFavoritos = renderizarFavoritos;
window.atualizarResumoFavoritos = atualizarResumoFavoritos;
