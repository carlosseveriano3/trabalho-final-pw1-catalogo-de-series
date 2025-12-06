function mapearParaSeries(dadosApi) {
  return dadosApi.map((item) => {
    const show = item.show || {};
    return new Serie(
      show.id,
      show.name,
      show.premiered ? show.premiered.substring(0, 4) : null,
      show.image ? show.image.medium : null,
      show.rating && show.rating.average ? show.rating.average : null,
      show.summary || ""
    );
  });
}

function filtrarSeriesPorTitulo(series, termo) {
  const termoNormalizado = termo.trim().toLowerCase();
  if (!termoNormalizado) return series;

  return series.filter((serie) =>
    serie.titulo.toLowerCase().includes(termoNormalizado)
  );
}

function calcularMediaNota(series) {
  const seriesComNota = series.filter((s) => s.nota);
  if (seriesComNota.length === 0) return null;

  const soma = seriesComNota.reduce((acc, serie) => acc + serie.nota, 0);
  return soma / seriesComNota.length;
}

window.mapearParaSeries = mapearParaSeries;
window.filtrarSeriesPorTitulo = filtrarSeriesPorTitulo;
window.calcularMediaNota = calcularMediaNota;