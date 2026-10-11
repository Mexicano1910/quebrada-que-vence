// Desenha os cards da agenda. Uso: <div id="lista-agenda" data-limite="3"></div>
(function () {
  const alvo = document.getElementById("lista-agenda");
  if (!alvo || !window.EVENTOS) return;

  const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  const hoje = new Date().toISOString().slice(0, 10);
  const limite = parseInt(alvo.dataset.limite || "0", 10);

  let lista = window.EVENTOS.filter((e) => e.data >= hoje).sort((a, b) =>
    a.data.localeCompare(b.data)
  );
  if (limite) lista = lista.slice(0, limite);

  if (!lista.length) {
    alvo.innerHTML = `<div class="col-12 text-center"><p class="section-description">Em breve novos eventos. Fale com a gente pelo WhatsApp para saber das próximas ações!</p></div>`;
    return;
  }

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  alvo.innerHTML = lista
    .map((e) => {
      const [, m, d] = e.data.split("-");
      return `
      <div class="col-lg-4 col-md-6">
        <div class="agenda-card">
          <div class="agenda-date">
            <span class="agenda-day">${d}</span>
            <span class="agenda-month">${meses[parseInt(m, 10) - 1]}</span>
          </div>
          <div class="agenda-content">
            <span class="agenda-location">📍 ${esc(e.local)}</span>
            <h3>${esc(e.titulo)}</h3>
            <p>${esc(e.descricao)}</p>
            <a href="contato.html?tipo=voluntario&evento=${encodeURIComponent(e.id)}" class="btn btn-success btn-qv w-100">Participar</a>
          </div>
        </div>
      </div>`;
    })
    .join("");
})();
