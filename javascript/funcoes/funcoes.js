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
    sessionStorage.setItem("jwt", token.jwt)
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

  // Função apresentação para usuário formato alert caso API for true
function cadastroSucesso(token, objetoCadastroUsuarioJson) {
    console.log(token);
    console.log(objetoCadastroUsuarioJson);
    sessionStorage.setItem("jwt", token.jwt);
    sessionStorage.setItem("firtname", objetoCadastroUsuarioJson.firstName);
    sessionStorage.setItem("lastname", objetoCadastroUsuarioJson.lastName);
    alert(`cadastro efetuado com sucesso ! Seja bem Vindo ${objetoCadastroUsuarioJson.firstName} ${objetoCadastroUsuarioJson.lastName}`);
    window.location.href ="index.html";
  
  }
  
  // Função apresentação para usuário formato alert caso API for false
  function cadastroErro(erro,token) {
      console.log(erro);
      console.log(token);
      if (erro.status == 400 || erro.status == 404) {
        alert("Erro ao efetuar o seu cadastro, por favor revise!");
        window.location.href ="signup.html";      
      }
        
      
  }
  
  

function criarNovaConta(){
    if ( localStorage.nome == nome.value &&
        localStorage.sobreNome == sobreNome.value &&
       localStorage.email ==  email.value &&
        localStorage.password ==password.value ){
            alert(`Sua conta foi criada com sucesso ${nome.value}`);
    }else{
        alert(`Erro ao criar sua conta ${nome.value} ${sobreNome.value}, por favor revise!`)
    }
    //window.location.reload(true);
}

function verificarCadastro(){
    if(email.value != localStorage.email){
        window.location.href='./signup.html';
        alert("Não encontramos seu cadastro, clique em Ok para se cadastrar!");
    }else{
        login();
    }    
}

function login(){
    if(email.value == localStorage.email && password.value == localStorage.password){
        window.location.href='./tarefas.html';
        alert(`Login Ok, seja Bem vindo ${localStorage.nome}`);
    }else {
        window.location.href='./index.html';   
        alert("Senha invalida!");             
    }
}