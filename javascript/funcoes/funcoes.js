function validatorEmail(email) {
  let emailExpress = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailExpress.test(email);
}

function validatorSenha(password) {
  let senhaExpress = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
  return senhaExpress.test(password);
}

function validarTextoTarefas(tarefas) {
  let tarefaExpress = /[a-zA-Z\u00C0-\u00FF ]+/i;
  return tarefaExpress.test(tarefas);
}

// Função para normalizar a string 
function normalizaStringUsandoTrim(string) {
  return string.trim();
}

// Função para validar o login
function validaLogin() {
  return validatorEmail(email.value) !== "" && validatorSenha(password.value) !== "";
}

function validaCadastro() {
  return nome.value !== "" && sobreNome.value !== "" && validatorEmail(email.value) !== "" && validatorSenha(password.value) !== "";
}

function validaTarefas() {
  return novaTarefa.value !== "";
}

// Função apresentação para usuário formato alert caso API for true
function loginSucesso(token) {
  console.log(token);
  sessionStorage.setItem("jwt", token.jwt);
  nome = sessionStorage.getItem("nome");
  alert(`Login efetuado com sucesso ! Seja bem Vindo ${nome} ${sobreNome}`);
  window.location.href = "tarefas.html";
}

// Função apresentação para usuário formato alert caso API for false
function loginErro(erro) {
  console.log(erro);
  if (erro.status == 400) {
    alert("E-mail e/ou senha inválidos");
    window.location.href = "index.html";
  } else if (erro.status == 404) {
    alert("Não foi encontrado seus dados na nossa base, cliquei em ok para ir para o cadastro");
    window.location.href = "signup.html";
  }
}


async function cadastroAPI(cadastroUsuarioJson) {
  ///Async/Await

  let configRequest = {
    method: "POST",
    body: cadastroUsuarioJson,
    headers: { "Content-Type": "application/json" },
  }

  try { //Tentar executar uma ação/fluxo
    let respostaApi = await fetch(`https://todo-api.ctd.academy/v1/users`, configRequest);
    if (respostaApi.status == 201 || respostaApi.status == 200) {
      let dados = await respostaApi.json();
      cadastroSucesso(dados);
    } else {
      throw respostaApi;
    }
  } catch (error) {
    //Exceção
    cadastroErro(error);

  }
}

// Função apresentação para usuário formato alert caso API for true
function cadastroSucesso(usuario) {
  console.log(usuario);
  localStorage.setItem("jwt", usuario.jwt);
  localStorage.setItem("nome", nome.value);
  localStorage.setItem("sobreNome", sobreNome.value);
  alert(`cadastro efetuado com sucesso ! Seja bem Vindo ${nome.value} ${sobreNome.value}`);
  window.location.href = "index.html";
}

// Função apresentação para usuário formato alert caso API for false
function cadastroErro(erro) {
  console.log(erro);
  if (erro.status == 400 || erro.status == 404) {
    alert("Erro ao efetuar o seu cadastro, por favor revise!");
    window.location.href = "signup.html";
  }
}

async function buscarCadastroAPI() {
  ///Async/Await 
  let configRequest = {
    headers: {
      'Authorization': jwt

    }
  }

  try { //não usamos a função de capturar o caminho relativo pois estava dando erro ai colocamos o caminho direto
    let respostaApi = await fetch(`https://todo-api.ctd.academy/v1/users/getMe`, configRequest);
    if (respostaApi.status == 201 || respostaApi.status == 200) {
      let dados = await respostaApi.json();
      renderizaNomeUsuario(dados);
    } else {
      throw respostaApi;
    }
  } catch (error) {
    //Exceção
    console.log(error);
  }
}

function renderizaNomeUsuario(usuario) {
  const nomeTarefas = document.getElementById("nomeTarefas");
  nomeTarefas.innerText = `${usuario.firstName} ${usuario.lastName}`;
  sessionStorage.setItem("nome", usuario.firstName);
  sessionStorage.setItem("sobreNome", usuario.lastName);
}

async function CadastrarTarefasApi(tarefaJson) {
  ///Async/Await
  let configRequest = {
    method: "POST",
    body: tarefaJson,
    headers: {
      'Authorization': jwt,
      "Content-Type": "application/json"
    }
  }

  try { //Tentar executar uma ação/fluxo
    let respostaApi = await fetch(`https://todo-api.ctd.academy/v1/tasks`, configRequest);
    if (respostaApi.status == 201 || respostaApi.status == 200) {
      let dados = await respostaApi.json();
      cadastraTarefasUsuario(normalizaStringUsandoTrim(dados.description));
      removerSkeleton();
    } else {
      throw respostaApi;
    }
  } catch (error) {
    //Exceção
    console.log(error);
  }
}

function cadastraTarefasUsuario(tarefa) {
  console.log(tarefa);
  localStorage.setItem("jwt", tarefa.jwt);
  //localStorage.setItem("cadastroTarefa", tarefa.description);
  alert(`Tarefa Cadastrada com sucesso !`);
  window.location.href = "tarefas.html";
}

async function buscarTarefasApi() {

  let configRequest = {
    headers: {
      'Authorization': jwt,
    }
  }

  try { //Tentar executar uma ação/fluxo
    let respostaApi = await fetch(`https://todo-api.ctd.academy/v1/tasks`, configRequest);
    if (respostaApi.status == 201 || respostaApi.status == 200) {
      let dados = await respostaApi.json();
      setTimeout(() => {
        renderizaTarefasUsuario(dados);
    }, 1500);
    } else {
      throw respostaApi;
    }
  } catch (error) {
    //Exceção
    console.log(error);
  }
}

function renderizaTarefasUsuario(tarefasUsuario) {

  let tarefasTerminadas = document.querySelector(".tarefas-terminadas");

  for (const tarefa of tarefasUsuario) {
    console.log(tarefa.description);

    if (tarefa.completed) {
      const date = new Date();
      let timestamp = date.toLocaleDateString();
      let novaDiv = document.createElement("li");
      novaDiv.classList.add("tarefa");

      novaDiv.innerHTML = `   <div class ="done"></div>
                              <div class="descricao">
                              <p class="nome">${tarefa.description}</p>
                              <div>
                              <button><i id="${tarefa.id}" class="fas fa-undo-alt change"></i><button>
                              <button><i id="${tarefa.id}" class="far fa-trash-alt"></i></button>
                              </div>
                              </div>                              
                              <p class="timestamp">Criada em: ${timestamp}</p>
                          </div>
      `;
      tarefasTerminadas.appendChild(novaDiv);
    } else {
      const date = new Date();
      let timestamp = date.toLocaleDateString();
      let novaDiv = document.createElement("li");
      novaDiv.classList.add("tarefa");

      novaDiv.innerHTML = `
                              <div id="${tarefa.id}" class="not-done" onclick="editarTarefasUsuario(${tarefa.id})"></div>
                              <div class="descricao">
                              <p class="nome">${tarefa.description}</p>
                              <p class="timestamp">Criada em: ${timestamp}</p>
                          </div>
      `;
      cards.appendChild(novaDiv);
    }

  }

}

async function editarTarefasUsuario(idTarefa) {

  console.log(idTarefa);
  //Define um objeto JS para o usuário
  let tarefaJs = {
    completed: false
  }

  let tarefaJson = JSON.stringify(tarefaJs);

  let configRequest = {
    method: "PUT",
    body: tarefaJson,
    headers: {
      'id': idTarefa,
      'Authorization': jwt,
      "Content-Type": "application/json"
    }
  }

  try { //Tentar executar uma ação/fluxo
    let respostaApi = await fetch(`https://todo-api.ctd.academy/v1/tasks/${idTarefa}`, configRequest);
    if (respostaApi.status == 201 || respostaApi.status == 200) {
      let dados = await respostaApi.json();

      editarTarefas(dados);
    } else {
      throw respostaApi;
    }
  } catch (error) {
    //Exceção
    console.log(error);
  }

}

function editarTarefas(idTarefa) {
  console.log(idTarefa);
  if (idTarefa.completed == false) {
    idTarefa.completed == true;
    alert('Tarefa Editada');
  } else if (idTarefa.completed == true) {
    idTarefa.completed = false;
    alert('Tarefa Editada');
  } else {
    alert('Erro ao Editar Tarefa');
  }
}

function mostrarSpinner() {
  // Selecionamos o corpo. Isso nos ajudará a incorporar nosso spinner
  // dentro de nosso HTML.
  const body = document.querySelector("body");

  // Selecionamos o formulário de registro para poder ocultá-lo durante o carregamento
  const form = document.querySelector("form");

  // Criamos nosso spinner
  const spinnerContainer = document.createElement("div");
  const spinner = document.createElement("div");
  const ingressar = document.getElementById("ingressar");
  ingressar.classList.add("hidden");

  // Atribuímos os IDs a cada novo elemento, para poder manipular
  // seus estilos
  spinnerContainer.setAttribute("id", "container-load");
  spinner.setAttribute("id", "load");

  // Ocultamos o formulário de registro
  form.classList.add("hidden");


  // Adicionamos o Spinner ao nosso HTML.
  spinnerContainer.appendChild(spinner);
  body.appendChild(spinnerContainer);

  return;
}

function ocultarSpinner() {
  // Selecionamos o corpo para poder remover o spinner do HTML.
  const body = document.querySelector("body");

  // Selecionamos o formulário de registro para poder mostrar-lo novamente
  const form = document.querySelector("form");

  // Selecionamos o spinner
  const spinnerContainer = document.querySelector("#conteiner-load");

  // Removemos o spinner do HTML
  body.removeChild(spinnerContainer);

  // Removemos a classe que oculta o formulário
  form.classList.remove("hidden");
  return;
}
