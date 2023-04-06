function validatorEmail(email){
    let emailExpress = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailExpress.test(email);
}

function validatorSenha(password){
    let senhaExpress = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
    return senhaExpress.test(password);
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
    return nome.value !=="" && sobreNome.value !== "" && validatorEmail(email.value) !== "" && validatorSenha(password.value) !== "" ;
  }

  // Função apresentação para usuário formato alert caso API for true
function loginSucesso(token) {
    console.log(token);
    sessionStorage.setItem("jwt", token.jwt);
     alert(`Login efetuado com sucesso ! Seja bem Vindo`);
    window.location.href ="tarefas.html";
}  

// Função apresentação para usuário formato alert caso API for false
  function loginErro(erro) {
      console.log(erro);
      if (erro.status == 400) {
        alert("E-mail e/ou senha inválidos");      
      }else if(erro.status == 404){
        alert("Não foi encontrado seus dados na nossa base, cliquei em ok para ir para o cadastro"); 
        window.location.href ="signup.html";
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
  //localStorage.setItem("sobrenome", cadastroUsuarioJson.lastName);
  alert(`cadastro efetuado com sucesso ! Seja bem Vindo ${nome.value} ${sobreNome.value}`);
  window.location.href ="index.html";
}

// Função apresentação para usuário formato alert caso API for false
function cadastroErro(erro) {
    console.log(erro);
    if (erro.status == 400 || erro.status == 404) {
      alert("Erro ao efetuar o seu cadastro, por favor revise!");
      window.location.href ="signup.html";      
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


