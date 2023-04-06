const tarefasPendentes = document.querySelector("tarefas-pendentes");
const cards = document.getElementById("cards");
const submitTarefas = document.getElementById("submitTarefas");
      submitTarefas.disabled= true;
      submitTarefas.style.cursor = "not-allowed";
const alertTarefas = document.getElementById("novatarefasalert");
const novaTarefa = document.getElementById("novaTarefa");
const closeApp = document.getElementById("closeApp");

let jwt;
let nome;
let sobreNome;
onload = function(){

    console.log("A página carregou automáticamente.");
    jwt = sessionStorage.getItem("jwt");
    
    console.log(jwt);
   
    buscarCadastroAPI();
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
        cards.appendChild(novaDiv); 
    

       //cards.appendChild(tarefasPendentes);

})
