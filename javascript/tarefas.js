const nomeTarefas = document.getElementById("nomeTarefas");
nomeTarefas.innerText = localStorage.nome;

const closeApp = document.getElementById("closeApp");
closeApp.addEventListener('click', function(){
    window.location.href='./index.html';
    alert(`Deseja realmente sair  ${nomeTarefas} ?`)
})
