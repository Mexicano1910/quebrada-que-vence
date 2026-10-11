// Página final: contagem regressiva e redirecionamento ao WhatsApp.
(function () {
  const contador = document.getElementById("contador");
  const botao = document.getElementById("btnWhatsapp");
  const barra = document.getElementById("barraProgresso");
  if (!contador || !botao || !barra) return;

  const Q = window.QV;
  const TOTAL = 10;
  let segundos = TOTAL;

  let nome = "";
  try { nome = sessionStorage.getItem("qv_nome") || ""; } catch {}
  const saudacao = document.getElementById("saudacao");
  if (saudacao && nome) saudacao.textContent = `Obrigado, ${nome}!`;

  const msg = "Olá! Acabei de me cadastrar no site do Quebrada Que Vence.";
  botao.href = `https://wa.me/${Q.whatsapp}?text=${encodeURIComponent(msg)}`;

  const timer = setInterval(() => {
    segundos--;
    barra.style.width = (segundos / TOTAL) * 100 + "%";
    contador.textContent = `Você será redirecionado para o WhatsApp em ${segundos} segundos...`;
    if (segundos <= 0) {
      clearInterval(timer);
      window.location.href = botao.href;
    }
  }, 1000);

  // Quem quiser ficar na página pode cancelar
  const cancelar = document.getElementById("btnCancelar");
  if (cancelar)
    cancelar.addEventListener("click", () => {
      clearInterval(timer);
      contador.textContent = "Redirecionamento cancelado. Use o botão abaixo quando quiser.";
      barra.parentElement.classList.add("d-none");
    });
})();
