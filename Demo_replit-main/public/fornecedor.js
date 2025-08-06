async function cadastrarFornecedor(event) {
    event.preventDefault();

    let nome_cliente = document.getElementById("nome").value;

    const cliente = {
        nome: fornecedor-nome,
        cnpj: document.getElementById("fornecedor-cnpj")
        telefone: document.getElementById("fornecedor-telefone").value,
        email: document.getElementById("fornecedor-email").value,
        endereco: document.getElementById("endereco").value
    };

    try {
        const response = await fetch('/fornecedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fornecedor)
        });

        const result = await response.json();
        if (response.ok) {
            alert("Fornecedor cadastrado com sucesso!");
            document.getElementById("fornecedor-form").reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar fornecedor.");
    }
}
// Função para listar todos os clientes ou buscar clientes por CPF
async function listarFornecedor() {
    const cnpj = document.getElementById('cnpj').value.trim();  // Pega o valor do CPF digitado no input

    let url = '/fornecedor';  // URL padrão para todos os clientes

    if (cnpj) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?cnpj=${cnpj}`;
    }

    try {
        const response = await fetch(url);
        const fornecedor = await response.json();

        const tabela = document.getElementById('tabela-fornecedor');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (fornecedor.length === 0) {
            // Caso não encontre clientes, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="6">Nenhum cliente encontrado.</td></tr>';
        } else {
            fornecedor.forEach(fornecedor => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${fornecedor.id}</td>
                    <td>${fornecedor.nome}</td>
                    <td>${fornecedor.cnpj}</td>
                    <td>${fornecedor.email}</td>
                    <td>${fornecedor.telefone}</td>
                    <td>${fornecedor.endereco}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar fornecedor:', error);
    }
}
// Função para atualizar as informações do cliente
async function atualizarCliente() {
    const nome = document.getElementById('nome').value;
    const cnpj = document.getElementById('fornecedor-cnpj').value;
    const email = document.getElementById('fornecedor-email').value;
    const telefone = document.getElementById('fornecedor-telefone').value;
    const endereco = document.getElementById('fornecedor-endereco').value;

    const fornecedorAtualizado = {
        nome,
        email,
        telefone,
        endereco,
        cpf
    };

    try {
        const response = await fetch(`/clientes/cpf/${cpf}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteAtualizado)
        });

        if (response.ok) {
            alert('Cliente atualizado com sucesso!');
        } else {
            const errorMessage = await response.text();
            alert('Erro ao atualizar cliente: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        alert('Erro ao atualizar cliente.');
    }
}


async function limpaCliente() {
    document.getElementById('nome').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('endereco').value = '';

}