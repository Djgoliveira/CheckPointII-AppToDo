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