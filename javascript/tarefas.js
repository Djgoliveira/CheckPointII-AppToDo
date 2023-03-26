const nomeTarefas = document.getElementById("nomeTarefas");
nomeTarefas.innerText = localStorage.nome;

const tarefasPendentes = document.querySelector("tarefas-pendentes");

const cards = document.getElementById("cards");

const submitTarefas = document.getElementById("submitTarefas");
const novaTarefa = document.getElementById("novaTarefa");
const closeApp = document.getElementById("closeApp");

closeApp.addEventListener('click', function(){
    let resposta = confirm(`Deseja realmente sair ${localStorage.nome} ?`);
    let sair = window.location.href='./index.html';
    if(resposta == true){
        return sair;
    }else {
        window.location.href='./tarefas.html';
    }
})

//salvar tarefas
submitTarefas.addEventListener("click", function(){
    const date = new Date();
    let timestamp = date.toLocaleDateString();

    localStorage.novaTarefa = novaTarefa.value;
    
    let novaDiv = document.createElement("li");
    novaDiv.classList.add("tarefa");

    novaDiv.innerHTML = `
                        <div class="not-done"></div>
                            <div class="descricao">
                            <p class="nome">${novaTarefa.value}</p>
                            <p class="timestamp">Criada em: ${timestamp}</p>
                        </div>
    `;
    cards.appendChild(novaDiv);    //cards.appendChild(tarefasPendentes);

})
