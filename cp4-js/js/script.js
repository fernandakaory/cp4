//recuperando os elementos html 
const formulario = document.getElementById("formulario");
const descricao = document.getElementById("idDescricao");
const autor = document.getElementById("idAutor");
const departamento = document.getElementById("idDepartamento");
const importancia = document.getElementById("idImportancia");
const cabecalho = document.getElementById("cabecalho");
const tbody = document.getElementById("tbody");
const btnAddTarefa = document.querySelector("#btnAddTarefa")
const mensagemAviso = document.querySelector(".mensagemAviso")
let arrayTarefas = []

//escutador de eventos ao clicar no botao "adicionar"
btnAddTarefa.addEventListener("click",(evento)=>{
    evento.preventDefault();

    if(descricao.value == "" || autor.value == "" || departamento.value == "" || importancia.value == "") {
        mensagemAviso.innerHTML = "PREENCHA TODOS OS CAMPOS!!!"
    } else {
        mensagemAviso.innerHTML = ""
    //criando novo objeto
    const novaTarefa = {
        descricao: descricao.value,
        autor: autor.value,
        departamento: departamento.value,
        importancia: importancia.value,
    };

    arrayTarefas.push(novaTarefa)
    //chamando a funçao
    atualizaCelula(arrayTarefas)

    //chamando a função
    esvaziaCampos();
}
})

//quando o botao ordenar for clicado, cria apenas a descrição
const btnOrdenar = document.getElementById("btnOrdenar");

btnOrdenar.addEventListener("click", (evento) => {
    evento.preventDefault();
    ordenarPorImportancia(arrayTarefas);
    criaApenasDescricao(arrayTarefas);
});


//FUNÇÔES
function ordenarPorImportancia(array) {
    array.sort((a, b) => {
       const valorA = a.importancia.split("-");
       const valorB = b.importancia.split("-");
       //nesse ordem pois quero em decrescente
       //[0] INDICE DOS NÚMEROS
       return parseInt(valorB[0]) - parseInt(valorA[0])
    });
}

//função para criar celula inteira de tarefa
//estou usando os botoes dentro do foreach porque dai eu não preciso especificar qual item eu quero manipular
function atualizaCelula(arrayTarefas) {
    //CRIAÇÃO DO HEAD DA TABELA
    // PARA NÃO APAGAR O CABEÇALHO CASO EU CLIQUE NA ORDENAR POR IMPORTÃNCIA
    cabecalho.innerHTML = ""
    cabecalho.append(criaElemento("Descrição","th"))
    cabecalho.append(criaElemento("Autor","th"))
    cabecalho.append(criaElemento("Departamento","th"))
    cabecalho.append(criaElemento("Importância","th"))
    cabecalho.append(criaElemento("Valor","th"))
    cabecalho.append(criaElemento("Duração","th"))
    tbody.innerHTML = ""

    //o objeto e seu indice como parametro. cada objeto recebe um indeice
    arrayTarefas.forEach((objeto) => {
        let novaLinha = document.createElement("tr")
        let colunaBotoes = document.createElement("td")
      
        // CRIAÇÃO DOS ELEMENTOS DA TABELA QUE PERTENCEM AO BODY EM UMA LINHA
        //usando o append direto, sem declarar uma variável para o valor 
        novaLinha.appendChild(criaElemento(objeto.descricao,"td"));
        novaLinha.appendChild(criaElemento(objeto.autor,"td"));
        novaLinha.appendChild(criaElemento(objeto.departamento,"td"));
        novaLinha.appendChild(criaElemento(objeto.importancia,"td"));

        // verifica se o objeto.valor recebeu um valor para colocar na tabela
        if(objeto.valor != null) {
            novaLinha.appendChild(criaElemento(`RS ${objeto.valor}`,"td"));
        } else {
            novaLinha.appendChild(criaElemento("-","td"));
        }

        if(objeto.duracao != null) {
            novaLinha.appendChild(criaElemento(`Duração: ${objeto.duracao}`,"td"));
        } else {
            novaLinha.appendChild(criaElemento("-","td"));
        }
        
        // CRIAÇÃO DOS BOTÕES
        let btnConcluir = criaElemento("Concluído", "button"); 
        let btnValor = criaElemento("Valor", "button");
        let btnDuracao = criaElemento("Duração", "button");  

        colunaBotoes.appendChild(btnValor);
        colunaBotoes.appendChild(btnDuracao);
        colunaBotoes.appendChild(btnConcluir);
        novaLinha.appendChild(colunaBotoes)

        //COLOCANDO A NOVALINHA INTEIRA NO BODY COM TODOS OS ELEMENTOS
        tbody.appendChild(novaLinha);


        //botaão concluir
        btnConcluir.addEventListener("click", (evento)=>{
            evento.preventDefault();
            // exclui a linha (novaLinha)
            evento.target.parentNode.parentNode.remove();
            apagarTarefa(objeto)
        })

        //adicionar duração
        btnDuracao.addEventListener("click", (evento)=>{
            evento.preventDefault();
            adicionaDuracao(objeto)
        })

        //adicionar valor
        btnValor.addEventListener("click", (evento)=>{
            evento.preventDefault();
            adicionaValor(objeto)
        })

})
console.log(arrayTarefas)
}

//função para criar novo elemento
function criaElemento(conteudo,tag) {
    let elemento = document.createElement(tag);
    elemento.textContent = conteudo;
    return elemento;
}

//cria apenas a descrição e a importancia, deixando os outros campos vazios
function criaApenasDescricao (arrayTarefas) {
    tbody.innerHTML = ""
    cabecalho.innerHTML = ""
    //CRIANDO CABECALHO APENAS DA DESCRIÇÃO E IMPIORTANCIA
    cabecalho.append(criaElemento("Descrição","th"))
    cabecalho.append(criaElemento("Importância","th"))

    arrayTarefas.forEach((objeto) => {
        let novaLinha = document.createElement("tr")
      
        //usando o append direto, sem declarar uma variável para o valor 
        novaLinha.appendChild(criaElemento(objeto.descricao,"td"));
        novaLinha.appendChild(criaElemento(objeto.importancia,"td"));
        tbody.appendChild(novaLinha);
    })
}

function adicionaValor (objeto) {
    const valor = prompt("Digite um valor: ");
    objeto.valor = valor
    atualizaCelula(arrayTarefas)
}

function adicionaDuracao (objeto) {
    const duracao = prompt("Digite uma duração: ");
    objeto.duracao = duracao
    atualizaCelula(arrayTarefas)
}

// Função para apgar tarefa usando index of e splice
function apagarTarefa(objeto) {
    const indiceTarefa = arrayTarefas.indexOf(objeto)
    if (indiceTarefa !== -1) {
        arrayTarefas.splice(indiceTarefa, 1); 
        atualizaCelula(arrayTarefas); 
        if(arrayTarefas.length <=0){
            cabecalho.innerHTML = ""
        }

}}

//funçao para limpar o campo do formulario
function esvaziaCampos() {
    descricao.value = "";
    autor.value = "";
    departamento.value = "";
    importancia.value = "";
}