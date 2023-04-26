const form = document.querySelector('#infos-prod');

const tabela = document.querySelector('#tbody');

let idx = form.idx.value;

// salvar no localStorage

const atualizarLocalStorage = (produtos) => {localStorage.setItem('produtos', JSON.stringify(produtos))}

//recuperar produtos

const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('produtos') || '[]' )

const salvarProduto = (e) =>{
   e.preventDefault();
   //Pegar os dados do Formulario
   const nome = form.nome.value;
   const preco = Number(form.preco.value);
   const prime = form.prime.checked;

   if (idx === 'novo') {
    const produtos = recuperarLocalStorage();
   produtos.push({id:produtos.length + 1, nome, preco, prime});
   atualizarLocalStorage(produtos);
   preencherTabela()
   form.reset()
   }else {
    let produto = {id: idx, nome, preco, prime}

    atualizarProduto(idx, produto);
    preencherTabela();
    form.reset();
    idx = 'novo';
   }

   
}

const preencherTabela = () => {
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const produto of produtos){
        tabela.innerHTML +=`
            <tr>
                <th scope="row">${produto.id}</th>
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td>${produto.prime ? "Sim" : "Não"}</td>
                <td>
                    <img type="button" width="40px" src="./img/delet.svg" onclick="removerProduto(${produto.id})">
                    <img type="button" width="40px" src="./img/editar.png" onclick="editarProduto(${produto.id})">
                </td>
            </tr>
        `;
    }
}

const removerProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id);
    if (indexProduto < 0 ) return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    alert('produto removido')
    preencherTabela()
}

const editarProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id);
    form.nome.value = produtos[indexProduto].nome;
    form.preco.value = produtos[indexProduto].preco;
    form.prime.checked = produtos[indexProduto].prime;
    idx = id;
}

atualizarProduto = (id, produto) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id);
    produtos[indexProduto] = produto;
    atualizarLocalStorage(produtos)
}


// Eventos
form.addEventListener('submit', salvarProduto);

document.addEventListener('DOMContentLoaded', preencherTabela);
