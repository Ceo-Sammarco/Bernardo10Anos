/**
 * CONTEÚDO EDITÁVEL DO APP "BERNARDO 10 ANOS"
 * 
 * Você pode alterar livremente qualquer texto, frase ou conquista aqui
 * sem precisar mexer nos componentes visuais.
 */

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  age: string;
  description: string;
  backDetail: string;
  color: string;
}

export interface AppContent {
  childName: string;
  fullName: string;
  parents: {
    father: string;
    mother: string;
    signature: string;
  };
  intro: {
    badge: string;
    title: string;
    subtitle: string;
    buttonText: string;
  };
  letter: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    postscript: string;
  };
  funStats: {
    label: string;
    value: string;
    icon: string;
  }[];
  quotes10Years: string[];
  achievements: Achievement[];
  finale: {
    title: string;
    subtitle: string;
    wishes: string;
    restartBtn: string;
    surpriseBtn: string;
  };
}

export const content: AppContent = {
  childName: "Bernardo",
  fullName: "Bernardo Sammarco Gangello",
  parents: {
    father: "Anselmo Sammarco Nunes",
    mother: "Noely Oliveira Gangello",
    signature: "Com todo amor infinito do mundo, Papai Anselmo e Mamãe Noely ❤️",
  },
  intro: {
    badge: "10 ANOS DE PURA ALEGRIA",
    title: "Bernardo Sammarco Gangello",
    subtitle: "Uma década de sorrisos, descobertas e muito amor. Um presente especial de Papai Anselmo e Mamãe Noely.",
    buttonText: "Toque para Começar a Viagem 🚀",
  },
  letter: {
    title: "Para o Nosso Querido Bernardo",
    subtitle: "Uma carta do fundo do coração dos seus pais",
    paragraphs: [
      "Filho querido, parece que foi ontem que seguramos você no colo pela primeira vez, tão pequeno e indefeso, mas já dono do nosso amor mais absoluto.",
      "Hoje você completa 10 anos! Uma década inteira vendo você crescer, aprender, cair, levantar mais forte e nos ensinar o verdadeiro significado da felicidade.",
      "Temos um orgulho sem tamanho do menino inteligente, bondoso, leal, bem-humorado e carinhoso que você é com todos ao seu redor.",
      "Nunca perca essa curiosidade brilhante que faz seus olhos brilharem diante de uma nova descoberta, nem a leveza do seu riso contagiante.",
      "Que os seus próximos anos venham repletos de gols memoráveis, amigos leais, grandes aventuras e sonhos do tamanho do infinito.",
      "Lembre-se sempre: aconteça o que acontecer, em qualquer momento da vida, estaremos aqui de mãos dadas com você, torcendo e te aplaudindo de pé.",
    ],
    postscript: "Parabéns pelos seus 10 anos, nosso eterno garotão!",
  },
  funStats: [
    { label: "Dias de Amor", value: "3.652", icon: "☀️" },
    { label: "Horas de Alegria", value: "87.648", icon: "⭐" },
    { label: "Abraços Apertados", value: "Infinitos", icon: "🤗" },
    { label: "Sorrisos Compartilhados", value: "+10.000", icon: "😄" },
  ],
  quotes10Years: [
    "10 anos iluminando o mundo com seu sorriso contagiante! ✨",
    "Craque em campo, gênio nos games e campeão no nosso coração! ⚽🎮",
    "Sua imaginação não tem limites — o céu é só o ponto de partida! 🚀",
    "O melhor filho, amigo e companheiro de aventuras do universo! 🌟",
    "Que a sua vida continue sendo um jogo cheio de vitórias e celebração! 🏆",
    "10 anos de história linda... e o melhor ainda está por vir! 🎈",
  ],
  achievements: [
    {
      id: "ach-1",
      icon: "🚲",
      title: "Sem Rodinhas!",
      age: "4 Anos",
      description: "O dia em que você conquistou as duas rodas.",
      backDetail: "Um empurrãozinho de leve, o vento no rosto e você pedalou com equilíbrio perfeito e aquele sorriso inesquecível!",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "ach-2",
      icon: "⚽",
      title: "Golaço de Placa",
      age: "6 Anos",
      description: "A paixão pelo futebol e o primeiro chute no ângulo.",
      backDetail: "A camisa 10 pesou leve em você! Vibração pura, drible bonito e comemoração correndo com os braços abertos.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "ach-3",
      icon: "🎒",
      title: "Primeiro Dia de Aula",
      age: "Mochila Maior que Ele",
      description: "A coragem de quem entrou na escola pronto pra aprender.",
      backDetail: "Olhou pra trás, deu aquele tchau confiante com a mãozinha e fez novos amigos logo nos primeiros minutos.",
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "ach-4",
      icon: "🎮",
      title: "Mestre dos Games",
      age: "8 Anos",
      description: "Fases difíceis superadas com raciocínio rápido.",
      backDetail: "Estratégia, foco e aquela alegria genuína quando derrotou o chefão final e veio nos chamar pra ver a tela!",
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "ach-5",
      icon: "🪐",
      title: "Explorador das Estrelas",
      age: "9 Anos",
      description: "Fascinado pelo espaço, ciência e mistérios.",
      backDetail: "Perguntas que deixaram até o Papai e a Mamãe pensando! Curiosidade de quem nasceu pra voar bem alto.",
      color: "from-sky-500 to-blue-600",
    },
    {
      id: "ach-6",
      icon: "🎂",
      title: "Década de Ouro (10 Anos)",
      age: "Hoje!",
      description: "Dois dígitos de pura maturidade e companheirismo.",
      backDetail: "Oficialmente 10 anos! Um garoto com caráter de ouro, coração gigante e um futuro brilhante pela frente.",
      color: "from-yellow-400 to-amber-500",
    },
  ],
  finale: {
    title: "Feliz Aniversário, Bernardo! 🎂",
    subtitle: "10 Anos de Amor, Aventuras e Conquistas",
    wishes: "Que seu dia seja tão incrível quanto você é para todos nós!",
    restartBtn: "Rever o Slideshow ↺",
    surpriseBtn: "Sorteio Surpresa 🎁",
  },
};
