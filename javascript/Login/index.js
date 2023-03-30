// captura dos elementos 

let email = document.querySelector("#inputEmail");
let password = document.querySelector("#inputPassword");
let smalEmail = document.querySelector("#valEmail");
let smalSenha = document.querySelector("#valSenha");
let smalBtn = document.querySelector("#valBtn");
let btnSubmit = document.querySelector("#btnSubmit");

// Desabilitando o botão de submit com id #btnSubmit
btnSubmit.disabled = true;

// Função que valida o email
function validaEmail(email) {
  const emailValicao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailValicao.test(email);
}

// Função que valida a senha opcional já que e tela de login
function validaSenha(password) {
  const senhaValidacao = /^(?=.*\d)(?=.*[!@#$%^&])(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
  return senhaValidacao.test(password);
}

// Função para normalizar a string 
function normalizaStringUsandoTrim(string) {
  return string.trim();
}

// Função para validar o login
function validaLogin() {
  return validaEmail(email.value) && validaSenha(password.value);
}

// Evento para habilitar o botão de submit quando passar na verificação de email e manipulação do DOM
email.addEventListener("keyup", () => {
  if (validaEmail(email.value) !== true) {
    smalEmail.innerText =
      "Email inválido. O formato do email deve ser: abc@abc.com";
    smalEmail.style.color = "red";
    btnSubmit.disabled = true;
  } else {
    smalEmail.innerText = "Ok!";
    smalEmail.style.color = "green";
    if (validaSenha(password.value) === true) {
      btnSubmit.disabled = false;
    }
  }
});

// Evento para habilitar o botão de submit quando quando passar na verificação de senha e manipulação do DOM
password.addEventListener("keyup", () => {
  if (validaSenha(password.value) !== true) {
    smalSenha.innerText =
      "Senha inválida. O formato da senha deve ter de 6 até 16 caracteres, deve possuir !@#$%^&*";
    smalSenha.style.color = "red";
    btnSubmit.disabled = true;
  } else {
    smalSenha.innerText = "Ok!";
    smalSenha.style.color = "green";
    if (validaEmail(email.value) === true) {
      btnSubmit.disabled = false;
    }
  }
});

// Pega os eventos e faz as requisições de login para validação com API.
btnSubmit.addEventListener("click", async (evento) => {
  const emailValue = email.value;
  const passwordValue = password.value;

  evento.preventDefault();

  if (validaLogin(emailValue, passwordValue)) {
    const emailLogin = normalizaStringUsandoTrim(emailValue);
    const passwordLogin = normalizaStringUsandoTrim(passwordValue);

    const usuarioJs = {
      email: emailLogin,
      password: passwordLogin,
    };

    const configRequest = {
      method: "POST",
      body: JSON.stringify(usuarioJs),
      headers: { "Content-Type": "application/json" },
    };

    fetch(`https://todo-api.ctd.academy/v1/users/login`, configRequest)
      .then((resposta) => {
        if (resposta.status === 201) {
          return resposta.json();
        } else {
          throw resposta;
        }
      })
      .then((data) => {
        loginSucesso(data);
      })
      .catch((erro) => {
        loginErro(erro);
      });
  }
});

// Função apresentação para usuário formato alert caso API for true
function loginSucesso(token) {
  console.log(token);
  alert("Sucesso no Login");
}

// Função apresentação para usuário formato alert caso API for false
function loginErro(erro) {
    console.log(erro);
    if (erro.status == 400 || erro.status == 404) {
        alert("E-mail e/ou senha inválidos");
    }
}
