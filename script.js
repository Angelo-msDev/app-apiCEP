const formularioCep = document.getElementById("cep-form");
const campoCep = document.getElementById("cep");
const textoStatus = document.getElementById("cep-status");
const areaResultado = document.getElementById("cep-result");
const btnShare = document.getElementById("btn-share"); // Seleciona o botão flutuante

let dadosGlobais = null; // Variável para armazenar os dados e compartilhar depois

function mostrarStatus(mensagem, tipo) {
  textoStatus.textContent = mensagem;
  textoStatus.classList.remove("ok", "error");
  if (tipo) {
    textoStatus.classList.add(tipo);
  }
}

function cepValido(cep) {
  return /^\d{8}$/.test(cep);
}

function limparResultado() {
  areaResultado.innerHTML = "";
  btnShare.style.display = "none"; // Esconde o botão ao limpar
}

function montarResultado(dados) {
  const pares = [
    ["CEP", dados.cep],
    ["Logradouro", dados.logradouro],
    ["Complemento", dados.complemento],
    ["Bairro", dados.bairro],
    ["Cidade", dados.localidade],
    ["UF", dados.uf],
    ["Estado", dados.estado],
    ["DDD", dados.ddd]
  ];

  let html = "<div class='result-grid'>";
  for (let i = 0; i < pares.length; i += 1) {
    const chave = pares[i][0];
    const valor = pares[i][1] && String(pares[i][1]).trim() ? pares[i][1] : "-";
    html += "<article class='result-item'>";
    html += `<div class='label'>${chave}</div>`;
    html += `<div class='value'>${valor}</div>`;
    html += "</article>";
  }
  html += "</div>";
  return html;
}

async function buscarCep(cep) {
  const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!resposta.ok) {
    if (resposta.status === 400) throw new Error("CEP em formato invalido.");
    throw new Error("Erro na requisicao.");
  }
  return resposta.json();
}

// EVENTO DE SUBMIT DO FORMULÁRIO
formularioCep.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const cepDigitado = campoCep.value.replace(/\D/g, "");
  limparResultado();

  if (!cepValido(cepDigitado)) {
    mostrarStatus("Digite um CEP com 8 numeros.", "error");
    if ("vibrate" in navigator) navigator.vibrate([100, 50, 100]); // Vibra no erro
    return;
  }

  mostrarStatus("Consultando CEP...", null);

  try {
    const dados = await buscarCep(cepDigitado);

    if (dados.erro) {
      mostrarStatus("CEP nao encontrado.", "error");
      if ("vibrate" in navigator) navigator.vibrate([100, 50, 100]); // Vibra no erro
      return;
    }

    mostrarStatus("Consulta feita com sucesso.", "ok");
    areaResultado.innerHTML = montarResultado(dados);
    
    // GUARDA OS DADOS E MOSTRA O BOTÃO DE COMPARTILHAR
    dadosGlobais = dados;
    if (navigator.share) {
      btnShare.style.display = "flex"; // Ativa o botão flutuante
    }

  } catch (erro) {
    mostrarStatus(erro.message || "Nao foi possivel consultar.", "error");
    if ("vibrate" in navigator) navigator.vibrate([100, 50, 100]);
  }
});

// EVENTO DE CLIQUE NO BOTÃO DE COMPARTILHAR
btnShare.addEventListener("click", async () => {
  if (dadosGlobais) {
    const textoParaCompartilhar = `📍 Endereço Encontrado:\n\n` +
      `CEP: ${dadosGlobais.cep}\n` +
      `Logradouro: ${dadosGlobais.logradouro}\n` +
      `Bairro: ${dadosGlobais.bairro}\n` +
      `Cidade: ${dadosGlobais.localidade} - ${dadosGlobais.uf}`;

    try {
      await navigator.share({
        title: 'Consulta de CEP - Angelo',
        text: textoParaCompartilhar,
        url: window.location.href
      });
    } catch (err) {
      console.log('Compartilhamento cancelado.');
    }
  }
});

campoCep.addEventListener("input", function () {
  campoCep.value = campoCep.value.replace(/\D/g, "");
});
