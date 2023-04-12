const tarefasPendentes = document.querySelector("tarefas-pendentes");
const cards = document.getElementById("cards");
const submitTarefas = document.getElementById("submitTarefas");
      submitTarefas.disabled= true;
      submitTarefas.style.cursor = "not-allowed";
const alertTarefas = document.getElementById("novatarefasalert");
const novaTarefa = document.getElementById("novaTarefa");
const closeApp = document.getElementById("closeApp");
//let quantidadeTarefas = document.getElementById("skeleton");


let jwt;
let nome;
let sobreNome;

onload = function(){
    //skeleton
    renderizarSkeletons(3, ".tarefas-pendentes");
    renderizarSkeletons(2, ".tarefas-terminadas");

    console.log("A página carregou automáticamente.");
    jwt = sessionStorage.getItem("jwt");
    
    console.log(jwt);
   
    buscarCadastroAPI();
    buscarTarefasApi();
    
}

closeApp.addEventListener('click', function(){

    nome = sessionStorage.getItem("nome");
    sobreNome = sessionStorage.getItem("sobreNome");

    let resposta = confirm(`Deseja realmente sair ${nome} ${sobreNome} `);
    let sair = window.location.href='./index.html';
    if(resposta == true){
        return sair;
    }else {
        window.location.href='./tarefas.html';
    }
  })

novaTarefa.addEventListener('keyup', function(){
    if (novaTarefa.value.length == ' ' || novaTarefa.value == 0){
        alert("Campo tarefas não pode ser vazio");
        window.location.href ="tarefas.html";
    }else if(validarTextoTarefas(novaTarefa.value)!== true){
        alert("Campo tarefas só aceita textos, por favor revise");
        window.location.href ="tarefas.html";
    }else{
        normalizaStringUsandoTrim(novaTarefa.value);
        submitTarefas.disabled= false;
        submitTarefas.style.cursor = "";
        
        
    }
})


submitTarefas.addEventListener("click",async function(e){
    
    let novaTarefaValue = novaTarefa.value;

    if(validaTarefas(novaTarefaValue)){
        
        e.preventDefault();
        novaTarefaValue = normalizaStringUsandoTrim(novaTarefaValue);
    
    let tarefaJs = {
        description: "",
        completed: false
    }

    tarefaJs.description = novaTarefa.value;
//    tarefaJs.completed = 

    let tarefaJson = JSON.stringify(tarefaJs);
    console.log(tarefaJson);
    CadastrarTarefasApi(tarefaJson);

    }else {
        alert('Tarefa não cadastrada!');
    }
})



function renderizaTarefasUsuario(listaTarefas) {


    /// Remover os skeletons da tela
    removerSkeleton(".tarefas-pendentes");
    removerSkeleton(".tarefas-terminadas");


    listaTarefasGlobal = listaTarefas;

    //Elemento pai
    let tarefasPendentesDom = document.querySelector(".tarefas-pendentes");

    for (let tarefa of listaTarefas) {
        console.log(tarefa);

        if (tarefa.completed) {
            console.log("Tarefa concluída");
        } else {
            // Tarefas pendentes
            console.log("Tarefa pendente");

            // Criando um novo item <li>
            let li = document.createElement("li");
            li.classList.add("tarefa");

            li.innerHTML = `
                            <div class="not-done" id="${tarefa.id}" onclick="editarTarefa(${tarefa.id})"></div>
                            <div class="descricao">
                                <p class="nome">${tarefa.description}</p>
                                <p class="timestamp"><i class="far fa-calendar-alt"></i> ${tarefa.createdAt}</p>
                            </div>
                         `;

            tarefasPendentesDom.appendChild(li);
        }
    }
}
