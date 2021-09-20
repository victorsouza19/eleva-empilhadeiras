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

function toggleSelectEquipment(event) {

    document.querySelectorAll('.type-select button')
    .forEach( button => button.classList.remove('active') ) /* para uma função unica, pode-se eliminar o () e {} */


    const button =  event.currentTarget
    button.classList.add('active')

    const input = document.querySelector('[name="equipment_type"]')

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
    
    } else if (input.value == 'old') {
        document.getElementById('oldEquipment').style.display = "block";
        document.getElementById('newEquipment').style.display = "none";
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


