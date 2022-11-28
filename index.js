        
        //associando elementos HTML a constantes js
        const botaoAdicionar = document.getElementById("acao")
        const itemAdicionado = document.getElementById("item")
        const lista = document.getElementById("lista-de-itens")


        //lista de objetos (produtos)
        let listaDeItens = [];
        
        //checagem localStorage
        const itemStorage = localStorage.getItem("itens")
        if (itemStorage != null) {
            listaDeItens = JSON.parse(itemStorage);
            for (let itemListado of listaDeItens) {
                const retangulo = listarItem(itemListado)
                lista.prepend(retangulo)
                const x = criarBotãoExcluir()
                lista.prepend(x)

                x.addEventListener("click", () => {
                    
                    x.remove()
                    retangulo.remove()
                    check.remove()
                })
            }
        }


        //funções associadas à adição de um produto na lista
        botaoAdicionar.addEventListener("click", () => {
            
            //teste de quantidade de caracteres no input
            if (itemAdicionado.value.length >= 2)  {
        
                const itemListado =
                {
                    id: listaDeItens.length + 1,
                    nomeProduto: itemAdicionado.value,
                    precoProduto: 0,
                }

                listaDeItens.push(itemListado);
                const stringList = JSON.stringify(listaDeItens)
                localStorage.setItem("itens", stringList)
    
                const retangulo = listarItem(itemListado)
                retangulo.id = ('div' + itemListado.id)
                lista.prepend(retangulo)
                const x = criarBotãoExcluir()
                x.id = ('x' + itemListado.id)
                lista.prepend(x)
                const check = criarCheckBox()
                check.id = ('check' + itemListado.id)
                lista.prepend(check)
    
    
                //exclusão do produto e botões adjacentes ao clicar no botão x
                x.addEventListener("click", () => {

                    x.remove()
                    retangulo.remove()
                    check.remove()
                })
    
                //ações associadas ao clique no checkbox
                check.addEventListener("click", () => {
    
                    var preco = prompt("Insira o preço do item selecionado:");
                    if (isNaN(preco)) {
                        return alert("Você não inseriu um valor numérico válido!")
                    } else {
                        itemListado.precoProduto = preco;
                    }
                })

            } else {
                return alert("Você não inseriu um item com pelo menos 2 caracteres!")
             }

            
        })


        //função de criação do produto listado
        function listarItem(itemAdicionado) {

            const linha = document.createElement("div");
            linha.innerText = itemAdicionado.nomeProduto
            linha.style.textAlign = "center"
            linha.style.float = "under"
            linha.style.margin = "10px"
            return linha
        }

        //função de criação do botão excluir
        function criarBotãoExcluir() {

            const excluir = document.createElement("button");
            excluir.innerText = "X"
            excluir.style.textAlign = "center"
            excluir.style.width = "30px"
            excluir.style.height = "30px"
            excluir.style.float = "under"
            excluir.style.margin = "10px"
            return excluir
        }

        //função de criação do checkbox
        function criarCheckBox() {

            const excluir = document.createElement("INPUT");
            excluir.setAttribute("type", "checkbox");
            excluir.style.textAlign = "center"
            excluir.style.float = "under"
            excluir.style.margin = "10px"
            return excluir
        }