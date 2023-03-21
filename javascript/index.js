const validarEmail = document.getElementById("inputEmail");
const validarSenha = document.getElementById("inputPassword");

const valEmail = document.getElementById("valEmail");
const valSenha = document.getElementById("valSenha");


const btnSubmit = document.getElementById("btnSumit");
btnSubmit.style.backgroundColor= "gray";


validarEmail.addEventListener("keyup",function(){
    if (validarEmail.value.length > 4){
        valEmail.innerText = "Ok!";
        valEmail.style.color="green";
    }else {
        valEmail.innerText = "Email Invalido";
        valEmail.style.color="red";
    }
})

