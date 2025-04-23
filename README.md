# 📱 PortfolioIHM

![Versão](https://img.shields.io/badge/versão-1.0.0-blue)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange)
![Plataforma](https://img.shields.io/badge/plataforma-iOS%20%7C%20Android-lightgrey)
![Framework](https://img.shields.io/badge/framework-Ionic%20%7C%20Angular-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)

**PortfolioIHM** é uma aplicação móvel desenvolvida com Ionic e Angular que apresenta um portfolio pessoal interativo. Criada como projeto da cadeira de Interação Homem-Máquina, esta aplicação demonstra um design responsivo em dispositivos móveis.
Com ele é possível ver as minhas informações pessoais, conquistas, gostos e explorar a terra natal de forma intuitiva e envolvente.

<div align="center">
  <img src="screenshots/app-showcase.png" alt="PortfolioIHM Showcase" width="800px">
</div>

## 📋 Índice

- [Características](#-características)
- [Screenshots](#-screenshots)
- [Instalação](#-instalação)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Contato](#-contato)

## ✨ Características

- **Design Intuitivo**: Interface de utilizador moderna e responsiva
- **Navegação por Tabs**: Acesso rápido às diferentes seções do portfolio
- **Animações Fluidas**: Transições suaves entre componentes
- **Modo Offline**: Funcionalidades principais disponíveis sem conexão à internet
- **Design Adaptativo**: Layout otimizado para diferentes tamanhos de ecrã

## 📸 Screenshots

### Página de Perfil

<div align="center">
  <img src="screenshots/perfilAbout.PNG" alt="Perfil - About" width="250px">
  <img src="screenshots/perfilEducacao.PNG" alt="Perfil - Experiência" width="250px">
  <img src="screenshots/perfilExperiencia.PNG" alt="Perfil - Educação" width="250px">
</div>

A página de perfil oferece uma visão completa das informações pessoais e profissionais, organizada em três seções principais através de um segmento de navegação:
- **Sobre**: Dados pessoais, competências e idiomas
- **Experiência**: Histórico profissional detalhado
- **Educação**: Formação acadêmica e certificações

### Página de Conquistas

<div align="center">
  <img src="screenshots/conquistas-cards.png" alt="Conquistas - Cards" width="250px">
  <img src="screenshots/conquistas-grid.png" alt="Conquistas - Grade" width="250px">
  <img src="screenshots/conquistas-detail.png" alt="Detalhe da Conquista" width="250px">
</div>

A seção de conquistas permite visualizar viagens e cursos concluídos, com:
- Alternância entre visualizações em cards ou grid
- Filtros para categorias específicas (viagens/cursos)
- Modal detalhado ao clicar em cada item

### Página Terra Natal

<div align="center">
  <img src="screenshots/terra-mapa.png" alt="Terra - Mapa" width="250px">
  <img src="screenshots/terra-pontos.png" alt="Terra - Pontos de Interesse" width="250px">
</div>

Exibição interativa da terra natal com:
- Mapa da região com marcadores importantes
- Lista de pontos de interesse por localidade
- Informações detalhadas sobre atrações locais

### Página de Gostos

<div align="center">
  <img src="screenshots/gostos-gastronomia.png" alt="Gostos - Gastronomia" width="250px">
  <img src="screenshots/gostos-desporto.png" alt="Gostos - Desporto" width="250px">
</div>

Apresentação de preferências pessoais organizadas por categorias:
- Convívio
- Gastronomia
- Desporto

### Página Explorar

<div align="center">
  <img src="screenshots/explorar-eventos.png" alt="Explorar - Eventos" width="250px">
  <img src="screenshots/explorar-filtro.png" alt="Explorar - Filtro" width="250px">
</div>

Descoberta de eventos e atividades regionais:
- Filtros por categoria
- Alternância entre visualizações
- Detalhes de cada evento

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/JotaBarbosaDev/PortfolioIHM

# Entre no diretório
cd PortfolioIHM

# Instale as dependências
npm install

# Execute o projeto localmente
ionic serve

# Para gerar APK/IPA
ionic capacitor build android
# ou
ionic capacitor build ios
```

## 💻 Tecnologias

- **Ionic Framework 7**: Interface mobile responsiva
- **Angular 16**: Framework front-end
- **TypeScript**: Linguagem de programação
- **Capacitor**: Builds nativas para iOS e Android
- **SCSS**: Estilização avançada
- **Animate.css**: Biblioteca de animações

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/         # Componentes reutilizáveis
│   ├── conquistas/         # Página de conquistas
│   ├── explorar/           # Página de exploração
│   ├── gostos/             # Página de gostos
│   ├── perfil/             # Página de perfil
│   ├── terra/              # Página sobre terra natal
│   └── tabs/               # Navegação principal
├── assets/
│   ├── icon/               # Ícones do aplicativo
│   └── images/             # Imagens utilizadas
└── theme/                  # Variáveis e temas
```

## 🔍 Funcionalidades

### Perfil Pessoal Interativo
- Visualização segmentada de informações
- Progress bars para as competências
- Bandeiras para idiomas

### Sistema de Conquistas
- Organização de conquistas pessoais e profissionais
- Indicadores visuais de progresso para cursos

### Exploração Regional
- Mapa interativo da terra natal
- Pontos de interesse categorizados

### Personalização de Gostos
- Interface organizada por categorias
- Cards para cada preferência

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 📬 Contato

### Email João Barbosa:
- Pessoal: jotambbarbosa@gmail.com
- Acadêmico: joao.barbosa@estg.pt

Link do projeto: [https://github.com/JotaBarbosaDev/PortfolioIHM](https://github.com/JotaBarbosaDev/PortfolioIHM)

---

<div align="center">
  <sub>Desenvolvido com ❤️ por João Barbosa</sub>
</div>
