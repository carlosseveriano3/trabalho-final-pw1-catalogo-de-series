class Serie {
  constructor(id, titulo, ano, imagem, nota, resumo) {
    this.id = id;
    this.titulo = titulo;
    this.ano = ano;
    this.imagem = imagem;
    this.nota = nota;
    this.resumo = resumo;
  }

  getLabelAno() {
    return this.ano ? `(${this.ano})` : "(ano desconhecido)";
  }

  getNotaFormatada() {
    return this.nota ? this.nota.toFixed(1) : "N/A";
  }
}

window.Serie = Serie;
