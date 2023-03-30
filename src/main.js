// Arquivo usado para testar a implementação das classe sem uso da página.

import filme from './js/filme.js'
import catalogo from './js/catalogo.js'
import { gerarFilme, criarFilmes, temas } from './js/geradorFilme.js'

// Criar catálogo
let c = new catalogo()
// Criar número específico de filmes e inserir no catálogo
// No exemplo, foram 10 filmes
criarFilmes(c, 10)

/*

//Imprimir o catálogo
c.imprimir()

// Gerar um filme apenas
let filme_exemplo = gerarFilme()
// Editar o nome dele
filme_exemplo.setNome('De Volta Para o Futuro II')
//Adiciona-lo no catálogo
c.adicionarFilme(filme_exemplo)

// Exibir o filme, buscando-o por nome
c.exibirFilme('De Volta Para o Futuro II')
c.exibirFilme('De Volta Para o Futuro V')

// Pesquisar filmes por tema(s)
c.pesquisarPorTema('Acao', 'Aventura')
*/
// Exibir todas as combinações de temas possíveis
c.temasPossiveis()