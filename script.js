const btnBuscar = document.getElementById('btnBuscar');
const cepInput = document.getElementById('cep');
const msg = document.getElementById('mensagem');

// Função principal de busca
async function buscarCEP() {
    const cep = cepInput.value.replace(/\D/g, '');
    msg.style.display = 'none';

    if (cep.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 dígitos.");
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            msg.style.display = 'block';
            limparCampos();
        } else {
            preencherCampos(data);
        }
    } catch (error) {
        console.error("Erro na busca:", error);
        alert("Não foi possível conectar ao serviço.");
    }
}

function preencherCampos(dados) {
    document.getElementById('logradouro').value = dados.logradouro;
    document.getElementById('bairro').value = dados.bairro;
    document.getElementById('localidade').value = `${dados.localidade} - ${dados.uf}`;
}

function limparCampos() {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('localidade').value = '';
}

// Evento de clique no botão
btnBuscar.addEventListener('click', buscarCEP);

// Atalho: Buscar ao apertar "Enter" no teclado
cepInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarCEP();
});

// Máscara visual do CEP (00000-000)
cepInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, '$1-$2');
    e.target.value = v;
});