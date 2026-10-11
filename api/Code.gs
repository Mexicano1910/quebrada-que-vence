/**
 * Quebrada Que Vence — receptor de cadastros (Google Apps Script)
 *
 * COMO PUBLICAR
 * 1. Crie uma planilha no Google Sheets (ex.: "QQV - Cadastros").
 * 2. Menu Extensões > Apps Script. Cole este código e salve.
 * 3. Implantar > Nova implantação > Tipo: App da Web
 *    - Executar como: Eu
 *    - Quem tem acesso: Qualquer pessoa
 * 4. Copie a URL gerada e cole em frontend/js/config.js (campo scriptUrl).
 *
 * Os cabeçalhos da aba "Cadastros" são criados automaticamente na 1ª vez.
 */

const ABA = "Cadastros";
const COLUNAS = [
  "dataCadastro", "tipo", "nome", "whatsapp", "email",
  "cep", "bairro", "cidade", "uf", "empresa",
  "disponibilidade", "interesses", "evento", "mensagem",
  "lgpd", "origem", "status",
];

function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);

    // Exige consentimento e campos mínimos
    if (dados.lgpd !== "sim" || !dados.nome || !dados.whatsapp) {
      return resposta({ ok: false, erro: "dados_invalidos" });
    }

    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    let aba = planilha.getSheetByName(ABA);
    if (!aba) {
      aba = planilha.insertSheet(ABA);
      aba.appendRow(COLUNAS);
      aba.setFrozenRows(1);
    }

    // Evita fórmulas maliciosas ao abrir no Sheets (prefixa com apóstrofo)
    const limpar = (v) => {
      const s = String(v == null ? "" : v).slice(0, 1000);
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    };

    aba.appendRow(COLUNAS.map((c) => limpar(dados[c])));
    return resposta({ ok: true });
  } catch (err) {
    return resposta({ ok: false, erro: String(err) });
  }
}

function doGet() {
  return resposta({ ok: true, servico: "Quebrada Que Vence" });
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
