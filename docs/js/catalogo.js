import quickSortAlgo from './quicksort.js'
import { temas } from './geradorFilme.js'

export default class catalogo {
  #listaDeFilmes
  constructor() {
    this.#listaDeFilmes = []
  }

  getFilmes = () => {
    return this.#listaDeFilmes
  }

  adicionarFilme = filme => {
    this.#listaDeFilmes.push(filme)
    console.log(`Filme ${filme.getNome()} adicionado!`)
  }

  imprimir = () => {
    console.log(`\nCatálogo:\n`)
    for (let f of this.#listaDeFilmes) {
      f.imprimir()
    }
  }

  // Retorna o indice do array onde se encontra o filme
  // Ou nulo, caso o filme nao esteja no array
  #pesquisarFilme = filme => {
    let nomeFilme = ''

    if (typeof filme === 'string') {
      nomeFilme = filme
    } else {
      nomeFilme = filme.getNome()
    }

    // Deixar em minusculo
    // Ex:
    // "De Volta Para o Futuro" --> de volta para o futuro"
    nomeFilme = nomeFilme.toLowerCase()

    for (let i = 0; i < this.#listaDeFilmes.length; i++) {
      let nomeAtual = this.#listaDeFilmes[i].getNome().toLowerCase()

      if (nomeAtual === nomeFilme) {
        return i
      }
    }
    return null
  }

  removerFilme = filme => {
    let indiceFilme = this.#pesquisarFilme(filme)

    if (indiceFilme != null) {
      let nomeFilme = this.#listaDeFilmes[indiceFilme].getNome()
      this.#listaDeFilmes.splice(indiceFilme, 1)
      console.log(`Filme "${nomeFilme}" removido!`)
    } else {
      console.log(`Filme não encontrado no catálogo!`)
    }
  }

  exibirFilme = filme => {
    let indiceFilme = this.#pesquisarFilme(filme)

    if (indiceFilme != null) {
      console.log(`\nExibindo Filme:`)
      this.#listaDeFilmes[indiceFilme].imprimir()
      return this.#listaDeFilmes[indiceFilme]
    } else {
      console.log(`Filme não encontrado no catálogo!`)
      return null
    }
  }

  ordernar = () => {
    this.#listaDeFilmes = quickSortAlgo(this.#listaDeFilmes)
  }

  pesquisarPorTema = function () {
    let temasPesquisa = [...arguments]
    let filmesComTema = []

    loop_pesquisa: for (let i = 0; i < this.#listaDeFilmes.length; i++) {
      let filmeAtual = this.#listaDeFilmes[i]

      for (let j = 0; j < temasPesquisa.length; j++) {
        let tema = temasPesquisa[j]
        if (!filmeAtual.getTemas().includes(tema)) {
          continue loop_pesquisa
        }
      }

      filmesComTema.push(filmeAtual)
    }

    if (filmesComTema.length > 0) {
      console.log('\nResultados da pesquisa:')
      for (let i = 0; i < filmesComTema.length; i++) {
        filmesComTema[i].imprimir()
      }
      return filmesComTema
    } else {
      console.log('Não existem filmes com os temas escolhidos!')
      return null
    }
  }

  temasPossiveis = function () {
    // Temas foi declarado como uma lista que foi importada,
    // No comeco do script
    const n = temas.length
    const subsets = []
    for (let i = 0; i < Math.pow(2, n); i++) {
      const subset = []
      for (let j = 0; j < n; j++) {
        if ((i & (1 << j)) !== 0) {
          subset.push(temas[j])
        }
      }
      subsets.push(subset)
    }
    console.log(subsets)
    console.log(`Os temas disponíveis são os seguintes:`)
    for (const nome of temas) {
      console.log(nome)
    }
    console.log(`\nNosso catálogo é tão variado que pode possuir até ${subsets.length} combinações desses temas!`)
    return subsets
  }
}
