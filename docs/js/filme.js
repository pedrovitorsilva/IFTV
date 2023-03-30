export default class filme {
  #nome
  #temas
  #duracao
  #visualizacoes

  constructor(nome, temas, duracao, visualizacoes) {
    this.#nome = nome
    this.#temas = temas
    this.#duracao = duracao
    this.#visualizacoes = visualizacoes
  }

  // Método toString
  imprimir = () => {
    console.log(
      `#--------------------\n` +
        `# Nome do Filme: ${this.#nome}\n` +
        `# Temas: ${this.#temas}\n` +
        `# Duração: ${this.#duracao} min.\n` +
        `# Nº de Visualizacoes: ${this.#visualizacoes}\n`
    )
  }

  //Getters e Setters
  getNome = () => {
    return this.#nome
  }

  setNome = nome => {
    this.#nome = nome
  }

  getTemas = () => {
    return this.#temas
  }

  setTemas = temas => {
    this.#temas = temas
  }

  addTema = tema => {
    if (!this.#temas.includes(tema)) {
      this.#temas.push(tema)
      return true
    } else {
      return false
    }
  }

  getDuracao = () => {
    return this.#duracao
  }

  setDuracao = duracao => {
    this.#duracao = duracao
  }

  getVisualizacoes = () => {
    return this.#visualizacoes
  }

  setVisualizacoes = visualizacoes => {
    this.#visualizacoes = visualizacoes
  }

  valueOf() {
    return this.#nome
  }
}
