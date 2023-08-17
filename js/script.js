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
        valor: null, // Definindo o valor como nulo
        duracao: null, // Definindo a duração como nula
    };

    arrayTarefas.push(novaTarefa)
    //chamando a funçao
    criaCelula(arrayTarefas)

    //chamando a função
    esvaziaCampos();
})

const btnOrdenar = document.getElementById("btnOrdenar");

btnOrdenar.addEventListener("click", (evento) => {
    evento.preventDefault();
    ordenarPorImportancia(arrayTarefas);
    criaCelula(arrayTarefas);
});


function ordenarPorImportancia(array) {
    array.sort((a, b) => {
        return b.importancia - a.importancia;
    });
}

//função para criar celula inteira de tarefa
function criaCelula(arrayTarefas) {
    tbody.innerHTML = ""

    //o objeto e seu indice como parametro. cada objeto recebe um indeice
    arrayTarefas.forEach((objeto, index) => {
        let novaLinha = document.createElement("tr")
        // let btnExcluir = document.createElement("button");
        // btnExcluir.textContent = "Excluir"
        let btnConcluir = document.createElement("button");
        btnConcluir.textContent = "Concluído"
        let btnValor = document.createElement("button");
        btnValor.textContent = "Valor"
        let btnDuracao = document.createElement("button");
        btnDuracao.textContent = "Duração"

        //usando o append direto, sem declarar uma variável para o valor 
        novaLinha.appendChild(criaElemento(objeto.descricao,"td"));
        novaLinha.appendChild(criaElemento(objeto.autor,"td"));
        novaLinha.appendChild(criaElemento(objeto.departamento,"td"));
        novaLinha.appendChild(criaElemento(objeto.importancia,"td"));

           // Verificar se o objeto da tarefa já possui um valor para 'valor'
           if (objeto.valor) {
            // Criar uma célula adicional para exibir o valor
            let valorCelula = document.createElement("td");
            valorCelula.textContent = `Valor: ${objeto.valor}`;
            novaLinha.appendChild(valorCelula);
        }
        
        // Verificar se o objeto da tarefa já possui um valor para 'duracao'
        if (objeto.duracao) {
            // Criar uma célula adicional para exibir a duração
            let duracaoCelula = document.createElement("td");
            duracaoCelula.textContent = `Duração: ${objeto.duracao}`;
            novaLinha.appendChild(duracaoCelula);
        }
        // novaLinha.appendChild(criaElemento("Excluir","button"))
        // novaLinha.appendChild(btnExcluir);
        novaLinha.appendChild(btnValor);
        novaLinha.appendChild(btnDuracao);
        novaLinha.appendChild(btnConcluir);
        tbody.appendChild(novaLinha);


        // btnExcluir.addEventListener("click", (evento)=>{
        //     evento.preventDefault();
        //     arrayTarefas.splice(index, 1);
        //     // excluirTarefaArray(item)
        //     //são dois parents pois o tr>th>button
        //     evento.target.parentNode.remove();
        // })

        //botaão concluir
        btnConcluir.addEventListener("click", (evento)=>{
            evento.preventDefault();
            //são dois parents pois o tr>th>button
            evento.target.parentNode.remove();
        })

        //adicionar duração
        btnDuracao.addEventListener("click", (evento)=>{
            evento.preventDefault();
            let duracao = prompt("Insira um valor: ")

            let duracaoCelula = document.createElement("td");
            duracaoCelula.textContent = `Duração: ${duracao}`;
    
            // Inserir a nova célula de valor na mesma linha
            novaLinha.insertBefore(duracaoCelula, btnValor);
            // novaLinha.appendChild(criaElemento(objeto.valor, "td"));
            objeto.duracao = duracao;
            console.log(arrayTarefas)
        })

        //adicionar valor
        btnValor.addEventListener("click", (evento)=>{
            evento.preventDefault();
            let valor = prompt("Insira um valor: ")

            let valorCelula = document.createElement("td");
            valorCelula.textContent = `VALOR: ${valor}`;
    
            // Inserir a nova célula de valor na mesma linha
            novaLinha.insertBefore(valorCelula, btnValor);
            // novaLinha.appendChild(criaElemento(objeto.valor, "td"));

            // arrayTarefas.push(objeto.valor)
            objeto.valor = valor;
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