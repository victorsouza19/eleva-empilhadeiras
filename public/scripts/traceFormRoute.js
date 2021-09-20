// setting the form route if the user uses an existing register
// definindo a rota do formulário se o user utilizar o cadastro já existente

function setFormAction(){
    document.getElementById('form').action = '/auth/osRegisterOnly';
}

function setFormAction2(){
    document.getElementById('form').action = '/auth/notOsRegisterOnly';
}


// document.getElementById('setFormAction').onclick = function() {
//     document.getElementById('form').action = '/auth/osRegisterOnly';
// }

// document.getElementById('setCreate').onclick = function() {
//     document.getElementById('form').action = '/auth/notOsRegisterOnly';
// }
