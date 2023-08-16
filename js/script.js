//capturando os valores dos inputs
const formulario = document.getElementById("formulario");
const descricao = document.getElementById("idDescricao");
const autor = document.getElementById("idAutor");
const departamento = document.getElementById("idDepartamento");
const importancia = document.getElementById("idImportancia");
const cabecalho = document.getElementById("cabecalho");
const tbody = document.getElementById("tbody");
const btnAddTarefa = document.querySelector("#btnAddTarefa")
let arrayTarefas = []

//escutador de eventos ao clicar no botao "adicionar"
btnAddTarefa.addEventListener("click",(evento)=>{
    evento.preventDefault();

    //criando novo objeto
    const novaTarefa = {
        descricao: descricao.value,
        autor: autor.value,
        departamento: departamento.value,
        importancia: importancia.value
    };

    arrayTarefas.push(novaTarefa)
    //chamando a funçao
    criaCelula(novaTarefa)

    console.log(arrayTarefas)

    //chamando a função
    esvaziaCampos();
})

//função para criar celula inteira de tarefa
function criaCelula(objeto) {
    let novaLinha = document.createElement("tr")
    let btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir"

    //usando o append direto, sem declarar uma variável para o valor 
    novaLinha.appendChild(criaElemento(objeto.descricao,"th"))
    novaLinha.appendChild(criaElemento(objeto.autor,"th"))
    novaLinha.appendChild(criaElemento(objeto.departamento,"th"))
    novaLinha.appendChild(criaElemento(objeto.importancia,"th"))
    // novaLinha.appendChild(criaElemento("Excluir","button"))
    novaLinha.appendChild(btnExcluir)
    tbody.appendChild(novaLinha)

    btnExcluir.addEventListener("click", (evento)=>{
        evento.preventDefault();
        //são dois parents pois o tr>th>button
        evento.target.parentNode.parentNode.remove();
    })

}

//função para criar nova coluna
function criaElemento(valor,tag) {
    let elemento = document.createElement(tag);
    elemento.textContent = valor;
    return elemento;
}

//funçao para limpar o campo do formulario
function esvaziaCampos() {
    descricao.value = ""
    autor.value = ""
    departamento.value = ""
    importancia.value = ""
}