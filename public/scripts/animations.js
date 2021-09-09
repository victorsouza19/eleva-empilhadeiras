// Funções para setar os values e o active nos botões dos formulários
function toggleSelect(event) {

    // retirar a class .active(dos botoes)

    document.querySelectorAll('.button-select button')
    .forEach( button => button.classList.remove('active') ) /* para uma função unica, pode-se eliminar o () e {} */


    // inserir a class .active no botao
    const button =  event.currentTarget
    button.classList.add('active')

    // atualizar o input hidden com o valor selecionado
    const input = document.querySelector('[name="os_type"]')

    input.value = button.dataset.status;

    
}

function toggleSelectStatus(event) {

    document.querySelectorAll('.button-select-status button')
    .forEach( button => button.classList.remove('active') ) /* para uma função unica, pode-se eliminar o () e {} */


    const button =  event.currentTarget
    button.classList.add('active')

    const input = document.querySelector('[name="status"]')

    input.value = button.dataset.value
    
}
