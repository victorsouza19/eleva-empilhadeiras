// setting the form route if the user uses an existing register
// definindo a rota do formulário se o user utilizar o cadastro já existente

function setFormAction(){
    document.getElementById('form').action = '/orders/register';
}

function setFormAction2(){
    document.getElementById('form').action = '/orders/customRegister';
}

// 1 só OS / 2 com o customer