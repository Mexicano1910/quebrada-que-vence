// Injeta header e footer em todas as páginas (um único lugar para editar).
(function () {
  const Q = window.QV;
  const pagina = location.pathname.split("/").pop() || "index.html";

  const links = [
    ["index.html", "Início"],
    ["sobre.html", "Quem Somos"],
    ["projetos.html", "Projetos"],
    ["agenda.html", "Agenda"],
    ["contato.html", "Contato"],
  ];

  const itens = links
    .map(
      ([href, texto]) =>
        `<li class="nav-item"><a class="nav-link navbar-link ${
          pagina === href ? "active" : ""
        }" href="${href}">${texto}</a></li>`
    )
    .join("");

  const header = document.getElementById("site-header");
  if (header) {
    header.outerHTML = `
    <header class="header-qv">
      <div class="header-content">
        <a class="navbar-brand" href="index.html">
          <img src="img/logoQuebrada.png" alt="Logo Quebrada Que Vence" class="logo-header" />
        </a>
        <nav class="navbar navbar-expand-lg">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#menuPrincipal" aria-label="Abrir menu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="menuPrincipal">
            <ul class="navbar-nav ms-auto align-items-lg-center">${itens}</ul>
          </div>
        </nav>
      </div>
    </header>`;
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.outerHTML = `
    <footer class="footer">
      <div class="container footer-container">
        <div class="row gy-5">
          <div class="col-lg-4">
            <img src="img/logoQuebrada.png" alt="Projeto Quebrada Que Vence" class="footer-logo" />
            <p class="footer-description">O Projeto Quebrada Que Vence transforma vidas através da educação, esporte, cultura e ações sociais desde 2014.</p>
          </div>
          <div class="col-lg-2 col-md-4">
            <h5>Institucional</h5>
            <ul class="footer-links">
              <li><a href="index.html">Início</a></li>
              <li><a href="sobre.html">Quem Somos</a></li>
              <li><a href="projetos.html">Projetos</a></li>
              <li><a href="agenda.html">Agenda</a></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-4">
            <h5>Participe</h5>
            <ul class="footer-links">
              <li><a href="contato.html?tipo=voluntario">Seja Voluntário</a></li>
              <li><a href="contato.html?tipo=apoiador">Faça uma Doação</a></li>
              <li><a href="contato.html?tipo=empresa">Seja Parceiro</a></li>
              <li><a href="contato.html">Contato</a></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-4">
            <h5>Contato</h5>
            <ul class="footer-contact">
              <li>📍 <a href="https://maps.google.com/?q=${encodeURIComponent(Q.endereco)}" target="_blank" rel="noopener noreferrer">Sede do Projeto</a></li>
              <li>📱 <a href="https://wa.me/${Q.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li>✉️ <a href="mailto:${Q.email}">${Q.email}</a></li>
            </ul>
          </div>
        </div>
        <hr class="footer-divider" />
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} Projeto Quebrada Que Vence. Todos os direitos reservados.</p>
          <p>Desenvolvido por <strong>CODEMARQ</strong></p>
        </div>
      </div>
    </footer>`;
  }
})();
