import filme from '../js/filme.js'
import catalogo from '../js/catalogo.js'
import { criarFilmes, temas } from '../js/geradorFilme.js'

// Inicializar catálogo
let c = new catalogo()
let numero_filmes = 0

/* Gerar filmes ---------------------------------------------*/
document
  .getElementById('formulario_filmes')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    gerar()
  })

function gerar() {
  let numero = document.getElementById('quantidade_gerar').value
  criarFilmes(c, numero)
  numero_filmes += parseInt(numero)
  console.log('Catálogo possui agora ' + numero_filmes + ' filmes')
  alert(`${numero} filme(s) criado(s) com sucesso!`)
}

/* Exibir Catálogo ---------------------------------------------*/

document
  .getElementById('botao_catalogo')
  .addEventListener('click', visualizar_catalogo)

function visualizar_catalogo() {
  let lista_catalogo = document.getElementById('ul_catalogo')
  if (numero_filmes != 0) {
    // Limpar os filmes anteriores
    lista_catalogo.innerHTML = ''
  }

  // Organizar os filmes ---------------------------------------------*/
  c.ordernar()
  // Coletando filmes ---------------------------------------------*/
  let catalogo_atual = c.getFilmes()
  c.imprimir()

  for (const f of catalogo_atual) {
    let el = document.createElement('li')
    el.classList.add('li_catalogo')
    el.innerHTML = `<h1>${f.getNome()}</h1>`
    lista_catalogo.appendChild(el)
  }
}

/* Exibir filmes - Auto completar texto ---------------------------------------------*/

const autocomplete = document.getElementById('autocomplete')
const resultsHTML = document.getElementById('results')
const resultado_pesquisa = document.getElementById('resultado_pesquisa')

document.getElementById('botao_exibir').addEventListener('click', () => {
  autocomplete.dispatchEvent(new Event('input'))
})

autocomplete.oninput = function () {
  // Limpar filme já selecionado no menu
  resultado_pesquisa.innerHTML = ''

  let results = []
  const userInput = this.value
  resultsHTML.innerHTML = ''
  if (userInput.length > 0) {
    results = getResults(userInput)
  } else if (userInput.length == 0) {
    results = c.getFilmes()
  }
  for (let i = 0; i < results.length; i++) {
    const atual = results[i] + ''
    let palavra_pesquisada = atual.slice(0, userInput.length)
    let palavra_restante = atual.slice(userInput.length, results[i].length)

    resultsHTML.innerHTML += `<li class = "li_pesquisa"><b>${palavra_pesquisada}</b>${palavra_restante}</li>`
  }
}

// Bustar dentro do banco de dados, se existe um valor que complete
// a palavra até entao digitada

function getResults(input) {
  let catalogo_atual = c.getFilmes()
  const results = []
  for (let i = 0; i < catalogo_atual.length; i++) {
    let filme_atual = catalogo_atual[i].getNome()
    if (
      input.toLowerCase() === filme_atual.slice(0, input.length).toLowerCase()
    ) {
      results.push(filme_atual)
    }
  }
  return results
}

// Definir o valor do campo para o nome clicado
resultsHTML.onclick = function (event) {
  const setValue = event.target.innerText
  autocomplete.value = setValue
  this.innerHTML = ''
}

/* Exibir filmes - Modal de filmes ---------------------------------------------*/
document
  .getElementById('botao_expandir_filme')
  .addEventListener('click', expandir_filme)

document
  .getElementById('autocomplete')
  .addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      expandir_filme()
    }
  })

function expandir_filme() {
  let nome_filme = document.getElementById('autocomplete').value

  let f = c.exibirFilme(nome_filme)
  if (f === null) {
    alert(`Filme não encontrado no catálogo!`)
  } else {
    resultado_pesquisa.innerHTML = ''
    //
    let el = document.createElement('div')
    el.classList.add('filme_expandido')
    el.innerHTML = `<h1>${f.getNome()}</h1> <br>`
    el.innerHTML += `<p class = "black"><b>Temas:</b> ${f.getTemas()}</p>`
    el.innerHTML += `<p class = "black"><b>Duração:</b> ${f.getDuracao()} min.</p>`
    el.innerHTML += `<p class = "black"><b>Visualizações:</b> ${f.getVisualizacoes()}</p>`
    //resultsHTML.innerHTML = ''
    resultado_pesquisa.appendChild(el)
  }
}

/* Pesquisar filmes por tema ---------------------------------------------*/
document
  .getElementById('botao_pesquisar_temas')
  .addEventListener('click', pesquisar_por_tema)

function pesquisar_por_tema() {
  let lista_temas = []
  let temas_marcados = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  )
  for (let i = 0; i < temas_marcados.length; i++) {
    lista_temas.push(temas_marcados[i].value)
  }

  let resultados = c.pesquisarPorTema(...lista_temas)
  if (resultados) {
    let div_resultados = document.getElementById('resultados')
    div_resultados.innerHTML = ''
    //
    for (const f of resultados) {
      let el = document.createElement('div')
      el.classList.add('filme_expandido')
      el.innerHTML = `<h1>${f.getNome()}</h1> <br>`
      el.innerHTML += `<p class = "black"><b>Temas:</b> ${f.getTemas()}</p>`
      el.innerHTML += `<p class = "black"><b>Duração:</b> ${f.getDuracao()} min.</p>`
      el.innerHTML += `<p class = "black"><b>Visualizações:</b> ${f.getVisualizacoes()}</p>`
      //resultsHTML.innerHTML = ''
      div_resultados.appendChild(el)
    }
  } else {
    alert(`Um filme com essa(s) categoria(s) não foi encontrado no catálogo!`)
  }
}

document
  .getElementById('botao_temas_possiveis')
  .addEventListener('click', temas_possiveis_ordenados)

function temas_possiveis_ordenados() {
  let t = c.temasPossiveis()
  let num_temas = t.length - 1
  alert(`Os temas disponíveis são os seguintes: 
    \n${temas}
    \nNosso catálogo é tão variado que pode possuir até ${num_temas} combinações desses temas!`)
}
