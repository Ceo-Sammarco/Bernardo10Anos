# Bernardo 10 Anos 🎂🚀

> Um presente especial e emocionante de aniversário de 10 anos para **Bernardo Sammarco Gangello**, criado com todo o amor por seu pai **Anselmo Sammarco Nunes** e sua mãe **Noely Oliveira Gangello**.

Este aplicativo foi construído para emocionar e divertir o Bernardo: funciona como um **Slideshow de Fotos Dinâmico**, **PWA (Progressive Web App)** 100% offline e **App Nativo Android via Capacitor**, com minijogo interativo, bolhas de conquistas, chuva de confetes e efeitos especiais.

---

## 🌟 Recursos Principais

- 📸 **Slideshow Inteligente e Dinâmico:**
  - 5 efeitos de transição suaves: Ken Burns (Zoom), Fade, Deslizar, Cubo 3D e Cortina (com alternância automática ou manual).
  - Barra de progresso no topo estilo Stories.
  - Navegação intuitiva por toque (lado direito avança, lado esquerdo volta, segurar pausa).
  - Suporte a gestos e modo tela cheia.
- 🎮 **Interações e Brincadeiras para o Bernardo:**
  - Toque nas fotos solta partículas flutuantes com física suave (estrelas ⭐, foguetes 🚀, bolas de futebol ⚽, raios ⚡, videogames 🎮).
  - Botão **"Surpresa!"**: sorteia uma foto aleatória com fanfarra de comemoração e chuva de confetes!
  - Contador interativo **"10 ANOS"**: ao tocar, o selo gira e revela mensagens carinhosas e divertidas sobre a sua década de vida.
  - **"Bolhas de Conquistas"**: cartões 3D giratórios com os grandes marcos do Bernardo (aprender a andar de bike sem rodinhas, primeiro gol, primeiro dia de escola, mestre dos games, etc.).
  - **Mini-jogo "Estoure os Balões"**: balões coloridos sobem pela tela com efeitos sonoros de estouro e uma grande celebração ao completar 10 balões estourados!
- 💌 **Mensagem Emocionante dos Pais:**
  - Carta carinhosa assinada por Anselmo e Noely com efeito de digitação suave em máquina de escrever.
- 🎵 **Áudio & Vibração Tátil (Haptics):**
  - Trilha sonora suave com botão de mudo. Sintetizador harmônico integrado com fallback suave caso o arquivo MP3 ainda não tenha sido colocado.
  - Efeitos sonoros reais gerados via Web Audio (estouro de balão, brilho de estrelas, fanfarra).
- 📴 **100% Offline & PWA:**
  - Service Worker com cache prévio de fotos, ícones e áudio.
  - Botão de instalação embutido no app (inclusive instruções guiadas para Safari iOS).
- 📱 **Pronto para Android (Capacitor):**
  - Identificador `com.nkoten.bernardo10`, modo imersivo e tela mantida ativa (*keep awake*).

---

## 🛠️ O que Você Precisa Fazer Manualmente

O projeto já está 100% funcional com 8 fotos e conteúdos demonstrativos de altíssima qualidade. Para personalizá-lo com suas fotos e músicas reais:

### 1. Adicionar as Fotos Reais do Bernardo
1. Salve as fotos reais em formato `.webp` ou `.jpg` na pasta:
   ```
   public/photos/
   ```
   *(Substitua `01.webp`, `02.webp`, etc., ou adicione fotos com novos nomes).*
2. Atualize o arquivo **`src/data/photos.json`** com os caminhos, legendas e anos correspondentes:
   ```json
   [
     {
       "src": "/photos/01.webp",
       "caption": "Nosso campeão iluminando nossas vidas!",
       "year": "2016 - 2026",
       "tag": "10 Anos"
     }
   ]
   ```

### 2. Personalizar Textos, Conquistas e a Carta dos Pais
Todo o conteúdo editável está centralizado em um único arquivo:
👉 **`src/data/content.ts`**
- Altere a carta dos pais (parágrafos carinhosos).
- Edite os marcos da vida do Bernardo em `achievements`.
- Edite as frases do botão de 10 anos em `quotes10Years`.

### 3. Adicionar a Música de Fundo (Opcional)
- Coloque o seu arquivo de áudio favorito em:
  ```
  public/audio/trilha.mp3
  ```
  *(Se você não colocar nenhuma música, o app tocará automaticamente uma melodia harmônica suave tipo caixinha de música).*

---

## 📲 Como Gerar o APK do Android

### Opção A: Pelo GitHub Actions (Sem precisar de Android Studio!)
O projeto inclui o fluxo automatizado em `.github/workflows/build-apk.yml`.
1. Faça o commit e suba as alterações para o seu repositório no GitHub (ramo `main`).
2. Acesse a aba **Actions** no seu repositório do GitHub.
3. Clique no workflow **"Build Android APK (Bernardo 10 Anos)"** e clique em **Run workflow**.
4. Quando a execução terminar (cerca de 2 a 3 minutos), clique na execução concluída.
5. Na seção **Artifacts**, baixe o arquivo **`app-debug.apk`**.
6. Envie o arquivo `.apk` para o celular (via WhatsApp, Google Drive, cabo ou e-mail) e toque nele para instalar!
   *(Se o Android perguntar, permita a instalação de fontes desconhecidas).*

### Opção B: Localmente no seu Computador
```bash
# 1. Instalar dependências
npm install

# 2. Gerar a compilação de produção
npm run build

# 3. Adicionar e sincronizar a plataforma Android do Capacitor
npx cap add android
npx cap sync android

# 4. Abrir no Android Studio
npx cap open android
```
No Android Studio, basta conectar o smartphone via USB e clicar no botão verde de **Run** (ou *Build > Build APK*).

---

## 💻 Como Rodar Localmente no Navegador

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Acesse no navegador:
http://localhost:3000
```

---

## 📦 Estrutura dos Arquivos

```
├── .github/workflows/
│   └── build-apk.yml          # Compilação automática do APK Android
├── public/
│   ├── audio/                 # trilha.mp3
│   ├── photos/                # 01.webp até 08.webp (suas fotos aqui)
│   ├── icon.svg               # Ícone vetorial do Bernardo 10
│   ├── pwa-192x192.png        # Ícone PWA
│   ├── pwa-512x512.png        # Ícone PWA alta resolução
│   └── apple-touch-icon.png   # Ícone para iOS
├── src/
│   ├── components/
│   │   ├── IntroScreen.tsx    # Tela de abertura com número 10 e confete
│   │   ├── Slideshow.tsx      # Slideshow principal com stories e controles
│   │   ├── ParentsLetter.tsx  # Carta com efeito máquina de escrever
│   │   ├── AchievementsGrid.tsx # Bolhas de conquistas (cards 3D)
│   │   ├── BalloonGame.tsx    # Minijogo de estourar balões
│   │   ├── GrandFinale.tsx    # Tela de encerramento com bolo e estatísticas
│   │   ├── Decorations.tsx    # Estrelas, foguetes e ambientação cósmica
│   │   ├── ParticleBurst.tsx  # Física de toque de emojis
│   │   └── PWAInstallButton.tsx # Botão de instalação do PWA
│   ├── data/
│   │   ├── photos.json        # Lista de fotos e legendas
│   │   └── content.ts         # Todos os textos editáveis
│   ├── lib/
│   │   ├── sound.ts           # Motor de som Web Audio & Haptics
│   │   └── utils.ts           # Utilitários de classes
│   └── App.tsx                # Roteador principal de telas
├── capacitor.config.json      # Configuração do Capacitor Android
└── vite.config.ts             # Configuração do Vite + PWA Service Worker
```
