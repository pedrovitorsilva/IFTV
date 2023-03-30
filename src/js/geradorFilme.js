import filme from './filme.js'
import catalogo from './catalogo.js'

const numTemas = 3

const palavras1 = [
  'Uma Historia',
  'Origem',
  'Vida',
  'Uma Aventura',
  'Uma Pessoa',
  'Vinganca',
  'A Vida E'
]
const palavras2 = [
  'Feliz',
  'Triste',
  'Humilde',
  'Furiosa',
  'Precisa',
  'Sincera',
  'Rapida',
  'Perigosa',
  'Animal',
  'Familiar'
]
export const temas = [
  'Acao',
  'Aventura',
  'Comedia',
  'Terror',
  'Suspense',
  'Romance',
  'Documentario',
  'Drama'
]

let nomesUsados = []

export function gerarFilme() {
  // Nome = palavraAleatoria1 + palavraAleatoria2
  let palavraAleatoria1 = Math.floor(Math.random() * palavras1.length)
  let palavraAleatoria2 = Math.floor(Math.random() * palavras2.length)
  let nome = `${palavras1[palavraAleatoria1]} ${palavras2[palavraAleatoria2]}`

  // Caso o nome já exista, gerar outro filme.
  // Caso contrario, adicionar a lista de nomes usados
  if (nomesUsados.includes(nome)) {
    return gerarFilme()
  } else {
    nomesUsados.push(nome)
  }

  // Duracao entre 90 e 200 minutos
  let duracao = Math.floor(Math.random() * 111) + 90
  // Visualizacoes entre 100 e 1000
  let visualizacoes = Math.floor(Math.random() * 901) + 100

  let temasSelecionados = []
  for (let i = 0; i < numTemas; i++) {
    let temaAtual = Math.floor(Math.random() * temas.length)

    // Se o tema nao estiver na lista de temas, adiciona-lo
    if (!temasSelecionados.includes(temas[temaAtual])) {
      temasSelecionados.push(temas[temaAtual])
    }
  }

  return new filme(nome, temasSelecionados, duracao, visualizacoes)
}

export function criarFilmes(catalogo, numero) {
  for (let i = 0; i < numero; i++) {
    catalogo.adicionarFilme(gerarFilme())
  }
}
