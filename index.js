
//associando elementos HTML a constantes js
const botaoAdicionar = document.getElementById("acao")
const itemAdicionado = document.getElementById("item")
const lista = document.getElementById("divLista")
const somaItens = document.getElementById("resultado")


//lista de objetos (produtos)
let listaDeItens = [];

//soma dos itens
let soma = 0;

//checagem localStorage
const itemStorage = localStorage.getItem("itens")
if (itemStorage != null) {
    listaDeItens = JSON.parse(itemStorage);
    for (let itemListado of listaDeItens) {
        const linhaInteira = listarItem(itemListado)
        linhaInteira.id = ('div' + itemListado.id)
        const itemAlinhado = document.getElementById('item' + itemListado.id)
        const x = document.getElementById('x' + itemListado.id)
        const check = document.getElementById('check' + itemListado.id)

        x.addEventListener("click", () => {

            listaDeItens = listaDeItens.filter(item => item.id != itemListado.id)
            const stringList = JSON.stringify(listaDeItens)
            localStorage.setItem("itens", stringList)
            linhaInteira.remove()

            let subtrator = itemListado.precoProduto;
            soma -= subtrator;
            somaItens.innerHTML = "R$ " + soma;

        })

        check.addEventListener("click", () => {

            if (itemListado.precoProduto == 0) {

                let preco = parseInt(prompt("Insira o preço do item selecionado:"));
                if (isNaN(preco)) {
                    return alert("Você não inseriu um valor numérico válido!")
                } else {
                    itemListado.precoProduto = preco;
                    const stringList = JSON.stringify(listaDeItens)
                    localStorage.setItem("itens", stringList)
                    soma += preco;
                    somaItens.innerHTML = "R$ " + soma;
                    itemAlinhado.style.textDecoration = "line-through"
                }
            } else {
                soma -= itemListado.precoProduto;
                itemListado.precoProduto = 0;
                linhaInteira.style.textDecoration = "none"
                somaItens.innerHTML = "R$ " + soma;
            }


        })

    }
}


//funções associadas à adição de um produto na lista
botaoAdicionar.addEventListener("click", () => {

    //teste de quantidade de caracteres no input
    if (itemAdicionado.value.length >= 2) {

        const itemListado =
        {
            id: listaDeItens.length + 1,
            nomeProduto: itemAdicionado.value,
            precoProduto: 0,
        }

        listaDeItens.push(itemListado);

        const stringList = JSON.stringify(listaDeItens)
        localStorage.setItem("itens", stringList)

        const linhaInteira = listarItem(itemListado)
        linhaInteira.id = ('div' + itemListado.id)
        const itemAlinhado = document.getElementById('item' + itemListado.id)
        const x = document.getElementById('x' + itemListado.id)
        const check = document.getElementById('check' + itemListado.id)


        //exclusão do produto e botões adjacentes ao clicar no botão x
        x.addEventListener("click", () => {


            listaDeItens = listaDeItens.filter(item => item.id != itemListado.id)
            const stringList = JSON.stringify(listaDeItens)
            localStorage.setItem("itens", stringList)
            linhaInteira.remove()

            let subtrator = itemListado.precoProduto;
            soma -= subtrator;
            somaItens.innerHTML = "R$ " + soma;

        })

        //ações associadas ao clique no checkbox
        check.addEventListener("click", () => {

            if (itemListado.precoProduto == 0) {

                let preco = parseInt(prompt("Insira o preço do item selecionado:"));
                if (isNaN(preco)) {
                    return alert("Você não inseriu um valor numérico válido!")
                } else {
                    itemListado.precoProduto = preco;
                    const stringList = JSON.stringify(listaDeItens)
                    localStorage.setItem("itens", stringList)
                    soma += preco;
                    somaItens.innerHTML = "R$ " + soma;
                    itemAlinhado.style.textDecoration = "line-through"
                }
            } else {
                soma -= itemListado.precoProduto;
                itemListado.precoProduto = 0;
                linhaInteira.style.textDecoration = "none"
                somaItens.innerHTML = "R$ " + soma;
            }


        })

        const listagem = document.getElementById("divLista");
        const gif = document.createElement("img");
        gif.src = "icons8-ok.gif"
        gif.style.width = "30px"
        gif.style.height = "30px"
        listagem.appendChild(gif);

        setTimeout(() => {
            gif.remove()
        }, 2500);

    } else {
        return alert("Você não inseriu um item com pelo menos 2 caracteres!")
    }

    itemAdicionado.value = "";


})


//função de criação do produto listado
function listarItem(itemAdicionado) {


    const listagem = document.getElementById("listaItens");
    const row = document.createElement("li");
    row.style.display = "flex"
    row.style.flexDirection = "row"
    row.style.justifyContent = "space-between"
    row.style.alignItems = "center"
    listagem.appendChild(row);

    const checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.style.textAlign = "center"
    checkbox.style.margin = "10px"
    checkbox.id = ('check' + itemAdicionado.id)
    row.appendChild(checkbox);

    const itemLinha = document.createElement("span");
    itemLinha.id = ('item' + itemAdicionado.id)
    itemLinha.innerText = itemAdicionado.nomeProduto
    row.appendChild(itemLinha);

    const excluir = document.createElement("button");
    excluir.innerText = "x"
    excluir.style.textAlign = "center"
    excluir.style.width = "fit-content"
    excluir.style.height = "fit-content"
    excluir.style.margin = "10px"
    excluir.style.paddingLeft = "5px"
    excluir.style.paddingRight = "5px"
    excluir.style.paddingTop = "1px"
    excluir.style.paddingBottom = "2px"
    excluir.id = ('x' + itemAdicionado.id)
    excluir.style.background = "#D2122E"
    excluir.style.color = "white"
    excluir.style.borderRadius = "5px"
    excluir.style.borderColor = "Black"
    excluir.style.borderWidth = "0.5px"
    excluir.style.boxShadow = "2px 4px 12px rgb(0 0 0 / 8%)"
    row.appendChild(excluir);

    return row
}