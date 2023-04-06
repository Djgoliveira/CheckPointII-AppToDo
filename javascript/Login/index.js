// captura dos elementos 
let email = document.querySelector("#inputEmail");
let password = document.querySelector("#inputPassword");
let smalEmail = document.querySelector("#valEmail");
let smalSenha = document.querySelector("#valSenha");
let smalBtn = document.querySelector("#valBtn");
let btnSubmit = document.querySelector("#btnSubmit");

let nome;
let sobreNome;
nome = sessionStorage.getItem("nome");
sobreNome = sessionStorage.getItem("sobreNome");
// Desabilitando o botão de submit com id #btnSubmit
btnSubmit.disabled = true;
btnSubmit.style.backgroundColor = "gray";

// Evento para habilitar o botão de submit quando passar na verificação de email e manipulação do DOM
email.addEventListener("keyup", () => {
  if (validatorEmail(email.value) !== true) {
    smalEmail.innerText ="Email inválido. O formato do email deve ser: abc@abc.com";
    smalEmail.style.color = "red";
    btnSubmit.disabled = true;
  } else {
        smalEmail.innerText = "Ok"; 
        smalEmail.style.color = "green";     
        btnSubmit.disabled = false;           
  }
});

// Evento para habilitar o botão de submit quando quando passar na verificação de senha e manipulação do DOM
password.addEventListener("keyup", (e) => {
  if (password.value == "" || password.value == " " || e.key == " " ) {
    smalSenha.innerText ="O campo senha não pode ser vazio";
    smalSenha.style.color = "red";
    btnSubmit.disabled = true;
} else if (validatorSenha(password.value) == false) {
  smalSenha.innerText ="O campo senha precisa ter no máximo 10 caracteres";
  valSenha1.innerText ="O campo senha precisa ter caracteres especiais";
  valSenha2.innerText ="O campo senha precisa ter Letras Maiúsculas e Minúsculas";
  valSenha3.innerText ="O campo senha precisa ter Letras Números";
  valSenha4.innerText ="ex: 123@Senha";
  smalSenha.style.color = "red";
  valSenha1.style.color = "red";
  valSenha2.style.color = "red";
  valSenha3.style.color = "red";
  valSenha4.style.color = "red";
  btnSubmit.disabled = true;
  }else if (validatorSenha(password.value) == true){
    smalSenha.innerText ="Ok";
    smalSenha.style.color = "green"; 
    valSenha1.innerText ="";
    valSenha2.innerText ="";
    valSenha3.innerText ="";
    valSenha4.innerText ="";
    btnSubmit.disabled = false;
    btnSubmit.style.backgroundColor = "";
    btnSubmit.innerText ="Acessar";
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

    fetch(`${baseUrlApi()}/users/login`, configRequest)
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

