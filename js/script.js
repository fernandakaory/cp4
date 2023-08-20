//capturando os valores dos inputs
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
        valor: "Valor não definido", // Definindo o valor como nulo
        duracao: "Duração não definida", // Definindo a duração como nula
    };

    arrayTarefas.push(novaTarefa)
    //chamando a funçao
    criaCelula(arrayTarefas)

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
       return parseInt(valorB[0]) - parseInt(valorA[0])
    });
}


//função para criar celula inteira de tarefa
//estou usando os botoes dentro do foreach porque dai eu não preciso especificar qual item eu quero manipular
function criaCelula(arrayTarefas) {
    tbody.innerHTML = ""

    //o objeto e seu indice como parametro. cada objeto recebe um indeice
    arrayTarefas.forEach((objeto, index) => {
        let novaLinha = document.createElement("tr")
      
        // let btnConcluir = document.createElement("button");
        // btnConcluir.textContent = "Concluído"
        // let btnValor = document.createElement("button");
        // btnValor.textContent = "Valor"
        // let btnDuracao = document.createElement("button");
        // btnDuracao.textContent = "Duração"

        //usando o append direto, sem declarar uma variável para o valor 
        novaLinha.appendChild(criaElemento(objeto.descricao,"td"));
        novaLinha.appendChild(criaElemento(objeto.autor,"td"));
        novaLinha.appendChild(criaElemento(objeto.departamento,"td"));
        novaLinha.appendChild(criaElemento(objeto.importancia,"td"));

        let btnConcluir = criaElemento("Concluído", "button"); 
        let btnValor = criaElemento("Valor", "button");
        let btnDuracao = criaElemento("Duração", "button");       

        let celulaValor = criaElemento(objeto.valor, "td");
        let celulaDuracao = criaElemento(objeto.duracao, "td");
        novaLinha.appendChild(celulaValor);
        novaLinha.appendChild(celulaDuracao);

        novaLinha.appendChild(btnValor);
        novaLinha.appendChild(btnDuracao);
        novaLinha.appendChild(btnConcluir);
        tbody.appendChild(novaLinha);


        //botaão concluir
        btnConcluir.addEventListener("click", (evento)=>{
            evento.preventDefault();
            //são dois parents pois o tr>th>button
            evento.target.parentNode.remove();
        })

        //adicionar duração
    btnDuracao.addEventListener("click", (evento)=>{
        evento.preventDefault();
        let duracao = prompt("Insira uma duração: ")
        objeto.duracao = duracao;
        celulaDuracao.textContent = `Duração: ${duracao}`;

        console.log(arrayTarefas)
    })

        //adicionar valor
    btnValor.addEventListener("click", (evento)=>{
        evento.preventDefault();
        let valor = prompt("Insira um valor: ")
        objeto.valor = valor;
        celulaValor.textContent = `Valor: ${valor}`;

        console.log(arrayTarefas)
    })

})
console.log(arrayTarefas)
}

//função para criar nova coluna
function criaElemento(valor,tag) {
    let elemento = document.createElement(tag);
    elemento.textContent = valor;
    return elemento;
}

function criaApenasDescricao (arrayTarefas) {
    tbody.innerHTML = ""

    arrayTarefas.forEach((objeto, index) => {
        let novaLinha = document.createElement("tr")
        //usando o append direto, sem declarar uma variável para o valor 
        novaLinha.appendChild(criaElemento(objeto.descricao,"td"));
        novaLinha.appendChild(criaElemento(null,"td"));
        novaLinha.appendChild(criaElemento(null,"td"));
        novaLinha.appendChild(criaElemento(objeto.importancia,"td"));
        tbody.appendChild(novaLinha);
    })
}

//funçao para limpar o campo do formulario
function esvaziaCampos() {
    descricao.value = "";
    autor.value = "";
    departamento.value = "";
    importancia.value = "";
}