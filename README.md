# 📍 BuscaCEP Pro - Progressive Web App

Uma aplicação web de alta performance desenvolvida para consulta de endereços brasileiros. Este projeto evoluiu de uma ferramenta simples para um **PWA completo**, integrando APIs de hardware e seguindo as melhores práticas de UX (User Experience) e acessibilidade.

---

## 🚀 Demonstração
![Video](video_demonstração.mp4)
Acesse a versão final: [https://app-api-cep.vercel.app/](https://app-api-cep.vercel.app/)

---

## ✨ Funcionalidades Avançadas

* **📦 PWA (Progressive Web App):** Instalável em Android, iOS e Desktop, com suporte offline via Service Workers.
* **📍 Geolocalização Reversa:** Obtém o CEP automaticamente através do GPS do dispositivo (via API Nominatim/OpenStreetMap).
* **📤 Web Share API:** Compartilhamento nativo do endereço encontrado para WhatsApp, E-mail e outros apps através de um botão flutuante (FAB).
* **📳 Feedback Tátil (Vibration API):** Alertas físicos (vibração) no dispositivo para erros de validação ou CEP não encontrado.
* **📱 Design Responsivo:** Interface moderna adaptada para todos os tamanhos de tela com foco em usabilidade mobile.

---

## 📊 Auditoria de Qualidade

Abaixo estão os índices de qualidade atingidos pelo projeto:

### Lighthouse (Google Chrome)
O Lighthouse avalia Performance, Acessibilidade, Melhores Práticas e SEO.
![Resultado Lighthouse](Resultados_(png)/ResultadoLighthouse.png)

### PWABuilder Score
Avaliação da conformidade do Manifesto e Service Worker para publicação em lojas (Google Play/App Store).
![Resultado PWABuilder](Resultados_(png)/ResultadoPWABuilder.png)

---

## 📂 Estrutura do Projeto

Entenda a função de cada arquivo neste repositório:

| Arquivo | Descrição |
| :--- | :--- |
| `index.html` | Estrutura principal e ponto de montagem do DOM. |
| `style.css` | Estilização utilizando variáveis, Grid e Flexbox. |
| `script.js` | Lógica de consumo da API ViaCEP, Geolocalização, Share e Vibração. |
| `manifest.json` | Metadados do PWA (ícones, cores de tema e modo de exibição). |
| `sw.js` | Service Worker responsável pelo cache e funcionamento offline. |
| `icon-192.png / icon-512.png` | Ícones do aplicativo em diferentes resoluções. |
| `screenshot-desktop.png / screenshot-mobile.png` | Capturas de tela para a vitrine de instalação do PWA. |

---

## 🛠️ Tecnologias & APIs

* **Linguagens:** HTML5, CSS3, JavaScript (ES6+).
* **Consumo de Dados:** [ViaCEP API](https://viacep.com.br/) e [Nominatim API](https://nominatim.org/).
* **Hardware & Web APIs:** Geolocation API, Vibration API, Web Share API e Service Workers.
* **Hospedagem:** Vercel.

---

## 🧑‍💻 Autor

Desenvolvido por **Angelo**, Técnico em Redes de Computadores e estudante de Análise e Desenvolvimento de Sistemas (ADS) na **FacSenac-PE**. Residente no programa **Embarque Digital** (Porto Digital).

---

## 📦 Como rodar o projeto localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/Angelo-msDev/app-apiCEP.git](https://github.com/Angelo-msDev/app-apiCEP.git)
