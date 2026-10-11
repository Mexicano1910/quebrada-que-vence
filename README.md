# Quebrada Que Vence

Plataforma web do projeto social **Quebrada Que Vence**: o portal público é a porta de entrada para cadastros, CRM, dashboard, mapa por CEP, relatórios e comunicação por WhatsApp.

> Status: em desenvolvimento. Fase 1 (portal) e início da Fase 2 (cadastros) prontas.

## Estrutura

```text
QUEBRADA-QUE-VENCE
├── README.md
├── frontend/          # site público (HTML, CSS, JS)
│   ├── css/           # variables, base, layout, components, pages
│   ├── js/            # config, layout, eventos, agenda, cadastro, final
│   └── img/           # imagens e logo
├── api/               # Code.gs (Google Apps Script que grava no Sheets)
├── banco-de-dados/
├── crm/
├── dashboard/
└── documentos/
```

## Como rodar

1. Abra a pasta raiz no VS Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito em `frontend/index.html` > *Open with Live Server*.
   (O `.vscode/settings.json` já aponta o Live Server para `/frontend`.)

## Onde editar

| O que mudar | Arquivo |
|---|---|
| WhatsApp, e-mail, endereço, URL do Apps Script | `frontend/js/config.js` |
| Eventos da agenda | `frontend/js/eventos.js` |
| Menu e rodapé (todas as páginas) | `frontend/js/layout.js` |
| Cores e fontes | `frontend/css/variables.css` |

## Ligar o formulário à planilha (Fase 2)

1. Siga as instruções no topo de `api/Code.gs`.
2. Cole a URL gerada em `scriptUrl` no `config.js`.
3. Enquanto `scriptUrl` estiver vazio, o formulário funciona em **modo de teste** (guarda no navegador) e nada chega à planilha.

## LGPD

O formulário exige consentimento e informa o uso dos dados. Antes de publicar, crie uma página de política de privacidade e defina quem acessa a planilha (dados pessoais).

## Roadmap

- [x] Sprint 1: página final, contador, WhatsApp
- [x] Sprint 2: design system e componentes
- [x] Sprint 3: site institucional (início, quem somos, projetos, agenda, contato)
- [ ] Sprint 4: formulários inteligentes (formulário pronto, falta conectar ao Sheets)
- [ ] Sprint 5: CRM
- [ ] Sprint 6: dashboard
- [ ] Sprint 7: mapa dos cadastros
- [ ] Sprint 8: relatórios
- [ ] Sprint 9: publicação (+ política de privacidade)

## Desenvolvedor

Vinicius Marques — projeto desenvolvido para o Quebrada Que Vence.
