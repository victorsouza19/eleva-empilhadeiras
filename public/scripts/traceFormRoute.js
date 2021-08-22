// definindo a rota do formulário se o user utilizar o cadastro já existente

document.getElementById('setFormAction').onclick = function() {
    document.getElementById('form').action = '/auth/osRegisterOnly';
}