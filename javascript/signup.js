let form = document.querySelector("form");
let nome = document.getElementById("nome");
let sobreNome = document.getElementById("sobreNome");
let email = document.getElementById("email");
let password = document.getElementById("password");
let repetirPassword = document.getElementById("repetirPassword");
let criarConta = document.getElementById("criarConta");
criarConta.style.background="gray";

form.addEventListener("submit", (e)=>{
    if (nome.value =="" || sobreNome.value =="" || email.value =="" || password.value =="" ||repetirPassword.value =="") {
        smallSubmit.textContent="Você precisa preencher todos os campos!";
        smallSubmit.style.color = "red";
    }else {
        e.defaultPrevented()
    }        
})

nome.addEventListener("keyup", ()=>{
    if(nome.value.length >2){
        smallNome.textContent="Ok!";
        smallNome.style.color="Green";
    }else{
        smallNome.textContent="Nome Inválido";
        smallNome.style.color="red";
    }
})

sobreNome.addEventListener("keyup", ()=>{
    if(sobreNome.value.length >=3){
        smallSobreNome.textContent="Ok!";
        smallSobreNome.style.color="Green";
    }else{
        smallSobreNome.textContent="Sobre Nome Inválido";
        smallSobreNome.style.color="red";
    }
})

email.addEventListener("keyup",()=>{
    if (validatorEmail(email.value)!==true){
        smallEmail.innerText = "Email Invalido, o formado do email deve ser: abc@abc.com";
        smallEmail.style.color="red";        
    }else {
        smallEmail.innerText = "Ok!";
        smallEmail.style.color="green";
    }
})

password.addEventListener("keyup",()=>{
    if(validatorSenha(password.value)!==true){
        smallPassword.textContent = "O formato da senha deve ter de 6 até 16 caracteres, deve possuir !@#$%^&*4 ";
        smallPassword.style.color="red"; 
    }else if(password.value !== repetirPassword.value){
    
        smallPassword.textContent = "O campo Senha é diferente do campo Repetir senha";
        smallPassword.style.color="red";     }
    else{
        smallPassword.innerText = "Ok!";
        smallPassword.style.color="green"; 
        smallRepetirPassword.innerText = "Ok!";
        smallRepetirPassword.style.color="green"; 
        
    }
})

repetirPassword.addEventListener("keyup",()=>{
    if(validatorSenha(repetirPassword.value)!==true){
        smallRepetirPassword.textContent = "O formato da senha deve ter de 6 até 16 caracteres, deve possuir !@#$%^&*4 ";
        smallRepetirPassword.style.color="red"; 
        
        
    }else if(repetirPassword.value !== password.value){
        
        smallRepetirPassword.textContent = "O campo Repetir senha é diferente do campo Senha";
        smallRepetirPassword.style.color="red"; 
    }else if(password.value === repetirPassword.value ||
    repetirPassword.value === password.value){
        smallRepetirPassword.innerText = "Ok!";
        smallRepetirPassword.style.color="green"; 
        smallPassword.innerText = "Ok!";
        smallPassword.style.color="green"; 
        criarConta.style.backgroundColor= "";
       
    }
})


/*
else if (senhaIguas(password, repetirPassword)===false){
    smallPassword="o Campo senha está diferente do campo Repetir senha";
} else if (senhaIguas(repetirPassword,password)===false){
    smallRepetirPassword="O campo Repetir senha está diferente do campo Senha";
} else if (senhaIguas(repetirPassword,password)===true){
    smallRepetirPassword="Senhas Ok!";
}
*/