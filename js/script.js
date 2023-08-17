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
        importancia: importancia.value,
        valor : valor.value
    };

    arrayTarefas.push(novaTarefa)
    //chamando a funçao
    criaCelula(arrayTarefas)

    //chamando a função
    esvaziaCampos();
})

const btnOrdenar = document.getElementById("btnOrdenar");

btnOrdenar.addEventListener("click", () => {
    ordenarPorImportancia(arrayTarefas);
    criaCelula(arrayTarefas);
});


function ordenarPorImportancia(array) {
    array.sort((a, b) => {
        return a.importancia - b.importancia;
    });
}

//função para criar celula inteira de tarefa
function criaCelula(arrayTarefas) {
    tbody.innerHTML = ""

    //o objeto e seu indice como parametro. cada objeto recebe um indeice
    arrayTarefas.forEach((objeto, index) => {
        let novaLinha = document.createElement("tr")
        let btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir"
        let btnConcluir = document.createElement("button");
        btnConcluir.textContent = "Concluído"
        let btnValor = document.createElement("button");
        btnValor.textContent = "Valor"

        //usando o append direto, sem declarar uma variável para o valor 
        novaLinha.appendChild(criaElemento(objeto.descricao,"td"));
        novaLinha.appendChild(criaElemento(objeto.autor,"td"));
        novaLinha.appendChild(criaElemento(objeto.departamento,"td"));
        novaLinha.appendChild(criaElemento(objeto.importancia,"td"));
        // novaLinha.appendChild(criaElemento("Excluir","button"))
        novaLinha.appendChild(btnExcluir);
        novaLinha.appendChild(btnConcluir);
        novaLinha.appendChild(btnValor);
        tbody.appendChild(novaLinha);


        btnExcluir.addEventListener("click", (evento)=>{
            evento.preventDefault();
            arrayTarefas.splice(index, 1);
            // excluirTarefaArray(item)
            //são dois parents pois o tr>th>button
            evento.target.parentNode.remove();
        })
        btnConcluir.addEventListener("click", (evento)=>{
            evento.preventDefault();
            //são dois parents pois o tr>th>button
            evento.target.parentNode.remove();
        })

        //adicionar valor na tabela
        btnValor.addEventListener("click", (evento)=>{
            evento.preventDefault();
            valor = prompt("Insira um valor: ")
            objeto.valor = valor
            console.log(objeto.valor, index)
            novaLinha.appendChild(criaElemento(objeto.valor, "td"));

            // arrayTarefas.push(objeto.valor)
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

//funçao para limpar o campo do formulario
function esvaziaCampos() {
    descricao.value = "";
    autor.value = "";
    departamento.value = "";
    importancia.value = "";
}

function excluirTarefaArray (tarefa){
    const indexTarefa = arrayTarefas.indexOf(tarefa)
    array.splice(indexTarefa,1)
    criaCelula(arrayTarefas)
}