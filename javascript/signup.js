let form = document.querySelector("form");
let nome = document.getElementById("nome");
let sobreNome = document.getElementById("sobreNome");
let email = document.getElementById("email");
let password = document.getElementById("password");
let repetirPassword = document.getElementById("repetirPassword");
let criarConta = document.getElementById("criarConta");
criarConta.style.background="gray";

//VALIDACOES DO FORM

form.addEventListener("submit", ()=>{
    if (nome.value =="" || sobreNome.value =="" || email.value =="" || password.value =="" ||repetirPassword.value =="") {
        smallSubmit.textContent="Você precisa preencher todos os campos!";
        smallSubmit.style.color = "red";
        return false;
    }else {
        return true;
    }  
})

nome.addEventListener("keyup", ()=>{
    if(nome.value.length >2){
        smallNome.textContent="Ok!";
        smallNome.style.color="Green";
        return true;
    }else{
        smallNome.textContent="Nome Inválido";
        smallNome.style.color="red";
        return false;
    }
})

sobreNome.addEventListener("keyup", ()=>{
    if(sobreNome.value.length >=3){
        smallSobreNome.textContent="Ok!";
        smallSobreNome.style.color="Green";
        return true;
    }else{
        smallSobreNome.textContent="Sobre Nome Inválido";
        smallSobreNome.style.color="red";
        return false;
    }
})

email.addEventListener("keyup",()=>{
    if (validatorEmail(email.value)!==true){
        smallEmail.innerText = "Email Invalido, o formado do email deve ser: abc@abc.com";
        smallEmail.style.color="red"; 
        return false;     
    }else {
        smallEmail.innerText = "Ok!";
        smallEmail.style.color="green";
        return true; 
    }
})

password.addEventListener("keyup",()=>{
    if(validatorSenha(password.value)!==true){
        smallPassword.textContent = "O formato da senha deve ter de 6 até 16 caracteres, deve possuir !@#$%^&*4 ";
        smallPassword.style.color="red"; 
        return false;

    }else if(password.value !== repetirPassword.value){    
        smallPassword.textContent = "O campo Senha é diferente do campo Repetir senha";
        smallPassword.style.color="red";
        return false;
            
    }    else{
        smallPassword.innerText = "Ok!";
        smallPassword.style.color="green"; 
        smallRepetirPassword.innerText = "Ok!";
        smallRepetirPassword.style.color="green"; 
        return true;
    }
})

repetirPassword.addEventListener("keyup",()=>{
    if(validatorSenha(repetirPassword.value)!==true){
        smallRepetirPassword.textContent = "O formato da senha deve ter de 6 até 16 caracteres, deve possuir !@#$%^&*4 ";
        smallRepetirPassword.style.color="red"; 
        return false;
        
        
    }else if(repetirPassword.value !== password.value){        
        smallRepetirPassword.textContent = "O campo Repetir senha é diferente do campo Senha";
        smallRepetirPassword.style.color="red";
        return false; 
    }else if(
        password.value === repetirPassword.value ||
    repetirPassword.value === password.value){
        smallRepetirPassword.innerText = "Ok!";
        smallRepetirPassword.style.color="green"; 
        smallPassword.innerText = "Ok!";
        smallPassword.style.color="green"; 
        criarConta.style.backgroundColor= "";
        return true;
    }
})

//CAPTURAR OS DADOS E SALVAR NO LOCALSTORAGE
form.addEventListener("submit", function(){
  localStorage.setItem("nome", JSON.stringify(nome.value));
  localStorage.setItem("sobreNome", JSON.stringify(sobreNome.value));
  localStorage.setItem("email", JSON.stringify(email.value));
  localStorage.setItem("password", JSON.stringify(password.value));  
  //criarNovaConta();
});

//CAPTURAR OS DADOS E SALVAR NO LOCALSTORAGE
document.addEventListener("DOMContentLoaded", function(){
    
    var formulario = localStorage.getItem("formulario");
    if(formulario){ // verifico se o localStorage existe

        var form = document.body.querySelector("form");
  
        formulario = JSON.parse(formulario);
        for(var dados in formulario){
            
        }
    }
});