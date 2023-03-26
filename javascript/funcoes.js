function validatorEmail(email){
    let emailExpress = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailExpress.test(email);
}

function validatorSenha(password){
    let senhaExpress = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return senhaExpress.test(password);
}

function criarNovaConta(){
    if ( nome.addEventListener == true &&
        sobreNome.addEventListener == true &&
        email.addEventListener == true &&
        password.addEventListener == true ){
            alert(`Sua conta foi criada com sucesso ${nome.value}`);
    }else{
        alert(`Erro ao criar sua conta ${nome.value} ${sobreNome.value}, por favor revise!`)
    }
    window.location.reload(true);
}

function login(){
    if(localStorage.getItem("email") == JSON.parse(email.value) && localStorage.getItem("senha") == JSON.parse(password.value)){
        alert("Login Ok!");
        window.location.href='https:www.google.com.br';
    }else {
        alert("Senha invalida!");        
    }
}