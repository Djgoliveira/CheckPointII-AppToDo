let email = document.getElementById("inputEmail");
let password = document.getElementById("inputPassword");
let smalEmail = document.getElementById("valEmail");
let smalSenha = document.getElementById("valSenha");
let smalBtn = document.getElementById("valBtn");
let btnSubmit = document.getElementById("btnSumit");
btnSubmit.style.backgroundColor= "gray";

let form = document.querySelector("form");

form.addEventListener("submit", ()=>{ 
    if (email.value == "" && password.value == ""){        
        smalBtn.textContent="Você precisa preencher todos os campos!";
        smalBtn.style.color="red";
    }else if ( validatorEmail(email.value)===true && validatorSenha(password.value)=== true){
    console.log(email.value);
    console.log(password.value); 
    smalEmail.textContent="";
    smalSenha.textContent="";
    smalBtn.textContent="";
    btnSubmit.style.backgroundColor= "";
    }else{
        console.log("Requisição não atendida");
    }
    
});

//função para validação do email ele buscar o input do email lá em cima e faz o teste na linha 4 depois vai para a linha 28 e se a função for igual ao input.value da ok senão da erro
email.addEventListener("keyup",()=>{
    if (validatorEmail(email.value)!==true){
        smalEmail.innerText = "Email Invalido, o formado do email deve ser: abc@abc.com";
        smalEmail.style.color="red";        
    }else {
        smalEmail.innerText = "Ok!";
        smalEmail.style.color="green";
        btnSubmit.style.backgroundColor= "";
    }
})

password.addEventListener("keyup",()=>{
    if(validatorSenha(password.value)!==true){
        smalSenha.textContent = "O formato da senha deve ter de 6 até 16 caracteres, deve possuir !@#$%^&*4 ";
        smalSenha.style.color="red"; 
    }else{
        smalSenha.innerText = "Ok!";
        smalSenha.style.color="green";
        btnSubmit.style.backgroundColor= "";
    }
})



