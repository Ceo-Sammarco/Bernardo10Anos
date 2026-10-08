const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  const publicDir = path.resolve(__dirname, '../public');
  const photosDir = path.join(publicDir, 'photos');
  const audioDir = path.join(publicDir, 'audio');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(photosDir)) fs.mkdirSync(photosDir, { recursive: true });
  if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

  const svgPath = path.join(publicDir, 'icon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  console.log('Generating PWA icons...');
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'pwa-192x192.png'));
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-512x512.png'));
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(svgBuffer).resize(64, 64).png().toFile(path.join(publicDir, 'favicon.ico'));

  // Maskable icon with 15% safe padding
  const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#0a1128" />
    <g transform="translate(51, 51) scale(0.8)">
      ${svgBuffer.toString().replace(/<\?xml.*?\?>/i, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
    </g>
  </svg>`;
  await sharp(Buffer.from(maskableSvg)).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  console.log('Generating 8 placeholder photos...');
  const photoThemes = [
    {
      file: '01.webp',
      title: 'Sorriso de Campeão',
      year: '2016 - 2026',
      badge: '10 ANOS',
      bg1: '#1e3a8a',
      bg2: '#0f172a',
      accent: '#fbbf24',
      icon: '⭐',
      story: 'Dez anos iluminando nossas vidas com sua alegria única!'
    },
    {
      file: '02.webp',
      title: 'A Grande Aventura',
      year: 'Primeiros Passos',
      badge: 'CORAGEM',
      bg1: '#065f46',
      bg2: '#022c22',
      accent: '#34d399',
      icon: '🚀',
      story: 'Cada passo foi uma conquista cheia de determinação.'
    },
    {
      file: '03.webp',
      title: 'Craque dos Gramados',
      year: 'Futebol com Papai',
      badge: 'CAMISA 10',
      bg1: '#1e40af',
      bg2: '#172554',
      accent: '#60a5fa',
      icon: '⚽',
      story: 'Golaço de pura energia e amor pelo esporte!'
    },
    {
      file: '04.webp',
      title: 'O Pequeno Cientista',
      year: 'Curiosidade Sem Fim',
      badge: 'EXPLORADOR',
      bg1: '#4c1d95',
      bg2: '#2e1065',
      accent: '#c084fc',
      icon: '🪐',
      story: 'Sempre descobrindo os segredos do universo e das coisas.'
    },
    {
      file: '05.webp',
      title: 'Liberdade em Duas Rodas',
      year: 'Bicicleta sem Rodinha',
      badge: 'VITÓRIA',
      bg1: '#0284c7',
      bg2: '#082f49',
      accent: '#38bdf8',
      icon: '🚴',
      story: 'O vento no rosto e o orgulho brilhando nos olhos.'
    },
    {
      file: '06.webp',
      title: 'Abraço Protetor',
      year: 'Amor de Família',
      badge: 'MAMÃE E PAPAI',
      bg1: '#be185d',
      bg2: '#500724',
      accent: '#f472b6',
      icon: '❤️',
      story: 'O abraço mais apertado e sincero do mundo inteiro.'
    },
    {
      file: '07.webp',
      title: 'Mestre da Imaginação',
      year: 'Histórias &amp; Jogos',
      badge: 'CRIATIVIDADE',
      bg1: '#d97706',
      bg2: '#451a03',
      accent: '#fde047',
      icon: '🎮',
      story: 'Criando mundos novos e rindo a cada fase vencida.'
    },
    {
      file: '08.webp',
      title: 'Bernardo 10 Anos!',
      year: 'Hoje e Para Sempre',
      badge: 'FELIZ ANIVERSÁRIO',
      bg1: '#0369a1',
      bg2: '#0f172a',
      accent: '#f59e0b',
      icon: '🎂',
      story: 'Uma década de muito orgulho, amor e felicidade sem fim!'
    }
  ];

  for (const item of photoThemes) {
    const cardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
      <defs>
        <linearGradient id="g_${item.file}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${item.bg1}" />
          <stop offset="60%" stop-color="${item.bg2}" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
        <linearGradient id="glow_${item.file}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${item.accent}" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1080" height="1350" fill="url(#g_${item.file})" />

      <!-- Aesthetic background rings & patterns -->
      <circle cx="540" cy="560" r="380" fill="none" stroke="${item.accent}" stroke-width="2" opacity="0.15" />
      <circle cx="540" cy="560" r="280" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.1" stroke-dasharray="10 15" />
      <circle cx="540" cy="560" r="180" fill="none" stroke="${item.accent}" stroke-width="4" opacity="0.2" />

      <!-- Center Icon / Illustration Frame -->
      <rect x="360" y="380" width="360" height="360" rx="48" fill="rgba(255,255,255,0.05)" stroke="${item.accent}" stroke-width="3" />
      <text x="540" y="590" font-size="140" text-anchor="middle">${item.icon}</text>

      <!-- Badge -->
      <rect x="420" y="290" width="240" height="46" rx="23" fill="rgba(0,0,0,0.6)" stroke="${item.accent}" stroke-width="2" />
      <text x="540" y="320" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="${item.accent}" text-anchor="middle" letter-spacing="3">${item.badge}</text>

      <!-- Bottom Card Content Area -->
      <rect x="90" y="860" width="900" height="380" rx="36" fill="rgba(15,23,42,0.75)" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
      
      <!-- Title -->
      <text x="540" y="960" font-family="system-ui, sans-serif" font-size="52" font-weight="800" fill="#ffffff" text-anchor="middle">${item.title}</text>
      
      <!-- Year / Subtitle -->
      <text x="540" y="1030" font-family="system-ui, sans-serif" font-size="28" font-weight="600" fill="${item.accent}" text-anchor="middle">${item.year}</text>

      <!-- Story description -->
      <text x="540" y="1110" font-family="system-ui, sans-serif" font-size="26" font-weight="400" fill="#cbd5e1" text-anchor="middle">${item.story}</text>

      <!-- Bottom signature note -->
      <text x="540" y="1180" font-family="system-ui, sans-serif" font-size="20" font-style="italic" fill="#94a3b8" text-anchor="middle">Foto placeholder - Substitua pelo arquivo real em /public/photos/${item.file}</text>
    </svg>`;

    const dest = path.join(photosDir, item.file);
    await sharp(Buffer.from(cardSvg)).webp({ quality: 90 }).toFile(dest);
    console.log(`Created ${item.file}`);
  }

  // Also create placeholder JPEG files matching Bernardo's 54 photos list if missing
  const sampleBuf = fs.readFileSync(path.join(photosDir, '01.webp'));
  for (let i = 1; i <= 54; i++) {
    const filename = i <= 5 ? `${String(i).padStart(2, '0')}.jpeg` : `${String(i).padStart(2, '0')}.jpg`;
    const targetPath = path.join(photosDir, filename);
    if (!fs.existsSync(targetPath) || fs.statSync(targetPath).size === 0) {
      const themeIdx = ((i - 1) % photoThemes.length) + 1;
      const themeFile = path.join(photosDir, `${String(themeIdx).padStart(2, '0')}.webp`);
      const srcBuf = fs.existsSync(themeFile) ? fs.readFileSync(themeFile) : sampleBuf;
      await sharp(srcBuf).jpeg({ quality: 85 }).toFile(targetPath);
      console.log(`Prepared placeholder ${filename}`);
    }
  }

  // Create empty placeholder audio file if not exists
  const audioFile = path.join(audioDir, 'trilha.mp3');
  if (!fs.existsSync(audioFile)) {
    // Write a tiny valid MP3 or silent buffer so fetch returns 200
    fs.writeFileSync(audioFile, Buffer.alloc(1024));
    console.log('Created placeholder trilha.mp3');
  }

  console.log('Asset generation complete!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
