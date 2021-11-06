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

function toggleSelectOsType(event) {

    // retirar a class .active(dos botoes)

    document.querySelectorAll('.ostype-select button')
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

function toggleSelectEquipment(event) {

    document.querySelectorAll('.type-select button')
    .forEach( button => button.classList.remove('active') ) /* para uma função unica, pode-se eliminar o () e {} */


    const button =  event.currentTarget
    button.classList.add('active')

    const input = document.querySelector('[name="provider_type"]')

    input.value = button.dataset.type
    
}


function toggleSelectOSequipment(event) {
    document.querySelectorAll('.equipment-select button')
    .forEach( button => button.classList.remove('active') )
    
    const button =  event.currentTarget
    button.classList.add('active')

    const input = document.querySelector('[name="equipment_situation"]')

    input.value = button.dataset.type

    if (input.value == 'new') {
        document.getElementById('newEquipment').style.display = "block";
        document.getElementById('oldEquipment').style.display = "none";

        document.getElementById('made').required = true;
        document.getElementById('model').required = true;
        document.getElementById('price').required = true;
        document.getElementById('equipment_type').required = true;

        document.getElementById('provider').removeAttribute("required");
        document.getElementById('equipments').removeAttribute("required");
    
    } else if (input.value == 'old') {
        document.getElementById('oldEquipment').style.display = "block";
        document.getElementById('newEquipment').style.display = "none";

        document.getElementById('made').removeAttribute("required");
        document.getElementById('model').removeAttribute("required");
        document.getElementById('price').removeAttribute("required");
        document.getElementById('equipment_type').removeAttribute("required");

        document.getElementById('provider').required = true;
        document.getElementById('equipments').required = true;
    }
    

}

function setProvider(s1){
    let valor = document.getElementById(s1);
    console.log(valor.value);

    let terceiro = document.getElementsByClassName('provider-Terceiro');
    let eleva = document.getElementsByClassName('provider-Eleva');
    let def = document.getElementById('default-equipment');


    if(valor.value == "Eleva"){
        for(i = 0; i < terceiro.length; i++){
            terceiro[i].style.display = 'none';
        };

        for(i = 0; i < eleva.length; i++){
            eleva[i].style.display = 'block';
        };

        def.selected = true;
        def.hidden = true;
        def.disabled = true;

    } else if (valor.value =="Terceiro"){
        for(i = 0; i < eleva.length; i++){
            eleva[i].style.display = 'none';
        };

        for(i = 0; i < terceiro.length; i++){
            terceiro[i].style.display = 'block';
        };

        def.selected = true;
        def.hidden = true;
        def.disabled = true;
    };

};

function addEquipmentField() {

    //pegar o container de fotos #images
    const container = document.querySelector('#images')

    //pegar o container para duplicar .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload')

    //realizar o clone da última imagem adicionada.
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)

    // não adicionar ao container quando o campo estiver vazio
    const input = newFieldContainer.children[0]

        if(input.value == "") { 
        return
        }


    //limpar o campo antes de adicionar
    input.value =  ""

    //adicionar o clone ao container de #images
    container.appendChild(newFieldContainer)


}


// adicionar o botao de deletar campo de equipamentos
function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length <= 1) {
        //limpar o valor do campo
        span.parentNode.children[0].value = ""

        return
    }

    //deletar o campo
    span.parentNode.remove();
}


