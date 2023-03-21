const email = document.getElementById("inputEmail");
const senha = document.getElementById("inputPassword");

const smalEmail = document.getElementById("valEmail");
const smalSenha = document.getElementById("valSenha");
const smalBtn = document.getElementById("valBtn");

const btnSubmit = document.getElementById("btnSumit");
btnSubmit.style.backgroundColor= "gray";


const form = document.querySelector("form");

form.addEventListener("submit", (e)=>{   

    if (email.value == "" && senha.value == ""){        
        smalBtn.textContent="Você precisa preencher todos os campos!";
        smalBtn.style.color="red"; 

    }else if ( validatorEmail(email.value)===true && validatorSenha(senha.value)=== true){
    console.log(email.value);
    console.log(senha.value); 
    smalEmail.textContent="";
    smalSenha.textContent="";
    smalBtn.textContent="";
    btnSubmit.style.backgroundColor= "";
    }else{
        console.log("Requisição não atendida");
    }
    e.preventDefault();
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

function validatorEmail(validarEmail){
    let emailExpress = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailExpress.test(validarEmail);
}

senha.addEventListener("keyup",()=>{
    if(validatorSenha(senha.value)!==true){
        smalSenha.textContent = "O formato da senha deve ter de 6 até 16 caracteres, deve possuir !@#$%^&*4 ";
        smalSenha.style.color="red"; 
    }else{
        smalSenha.innerText = "Ok!";
        smalSenha.style.color="green";
        btnSubmit.style.backgroundColor= "";
    }
})

function validatorSenha(validarSenha){
    let senhaExpress = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return senhaExpress.test(validarSenha);
}

