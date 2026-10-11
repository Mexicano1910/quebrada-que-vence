// Formulário de cadastro: máscaras, CEP automático (ViaCEP), validação e envio.
(function () {
  const form = document.getElementById("form-cadastro");
  if (!form) return;

  const Q = window.QV;
  const $ = (n) => form.elements[n];
  const aviso = document.getElementById("form-aviso");
  const botao = document.getElementById("btn-enviar");

  // Pré-seleciona tipo e evento pela URL (?tipo=voluntario&evento=...)
  const params = new URLSearchParams(location.search);
  const tipo = params.get("tipo");
  if (tipo && $("tipo")) $("tipo").value = tipo;
  if ($("evento")) $("evento").value = params.get("evento") || "";

  const soDigitos = (v) => v.replace(/\D/g, "");

  $("whatsapp").addEventListener("input", (e) => {
    let v = soDigitos(e.target.value).slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, v.length - 4)}-${v.slice(-4)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    e.target.value = v;
  });

  $("cep").addEventListener("input", (e) => {
    let v = soDigitos(e.target.value).slice(0, 8);
    if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5);
    e.target.value = v;
    if (v.length === 9) buscarCep(soDigitos(v));
  });

  async function buscarCep(cep) {
    try {
      const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const d = await r.json();
      if (d.erro) return mostrar("CEP não encontrado. Confira os números.", "warning");
      $("bairro").value = d.bairro || "";
      $("cidade").value = d.localidade || "";
      $("uf").value = d.uf || "";
      aviso.className = "d-none";
    } catch {
      /* sem internet: a pessoa pode preencher manualmente */
    }
  }

  function mostrar(msg, tipo) {
    aviso.textContent = msg;
    aviso.className = `alert alert-${tipo} mt-3`;
  }

  function coletar() {
    const lista = (nome) =>
      [...form.querySelectorAll(`[name="${nome}"]:checked`)].map((i) => i.value).join(", ");
    return {
      dataCadastro: new Date().toISOString(),
      tipo: $("tipo").value,
      nome: $("nome").value.trim(),
      whatsapp: soDigitos($("whatsapp").value),
      email: $("email").value.trim(),
      cep: soDigitos($("cep").value),
      bairro: $("bairro").value.trim(),
      cidade: $("cidade").value.trim(),
      uf: $("uf").value.trim(),
      empresa: $("empresa").value.trim(),
      disponibilidade: lista("disponibilidade"),
      interesses: lista("interesses"),
      evento: $("evento").value,
      mensagem: $("mensagem").value.trim(),
      lgpd: $("lgpd").checked ? "sim" : "nao",
      origem: "site",
      status: "Novo",
    };
  }

  // Mostra o campo "empresa" só para empresas parceiras
  const blocoEmpresa = document.getElementById("bloco-empresa");
  function ajustarTipo() {
    blocoEmpresa.classList.toggle("d-none", $("tipo").value !== "empresa");
  }
  $("tipo").addEventListener("change", ajustarTipo);
  ajustarTipo();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return mostrar("Preencha os campos obrigatórios marcados em vermelho.", "danger");
    }
    const dados = coletar();
    if (dados.whatsapp.length < 10) return mostrar("Informe um WhatsApp válido com DDD.", "danger");
    if (dados.cep.length !== 8) return mostrar("Informe um CEP válido com 8 números.", "danger");

    botao.disabled = true;
    botao.textContent = "Enviando...";

    try {
      if (Q.scriptUrl) {
        // text/plain evita o preflight CORS do Apps Script
        await fetch(Q.scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(dados),
        });
      } else {
        // Modo de teste: guarda no navegador até o Apps Script ser configurado
        const antigos = JSON.parse(localStorage.getItem("qv_cadastros") || "[]");
        antigos.push(dados);
        localStorage.setItem("qv_cadastros", JSON.stringify(antigos));
      }
      sessionStorage.setItem("qv_nome", dados.nome.split(" ")[0]);
      location.href = "pagFinal.html";
    } catch (err) {
      botao.disabled = false;
      botao.textContent = "Enviar cadastro";
      mostrar("Não foi possível enviar agora. Tente de novo ou fale pelo WhatsApp.", "danger");
    }
  });
})();
