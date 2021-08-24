function mostrar() {
    console.log(JSON.stringify(items));
    
    var conteudo = "<table cellspacing='0' cellpadding='4' border='1'>" +"<tr><td>Código</td>" +"<td>Descrição</td>" +"<td>Preço</td></tr>";
    
    for (var i in items) {
        conteudo += "<tr><td><button onclick='remover(" + i + ")'><image src='deletar.png' height='12px'></button> " 
        + items[i].responsible 
        + "</td><td> " 
        + items[i].status 
        + "</td><td align='right'>" 
        + items[i].os_type 
        + "</td></tr>";
    }
    
    conteudo += "</table>";
    tabela.innerHTML = conteudo;
}