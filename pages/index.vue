<template>
  <div class="pt-20 min-h-screen relative" ref="container">
    <!-- Fond animé interactif -->
    <div class="absolute inset-0 overflow-hidden z-0">
      <!-- Particules interactives -->
      <div class="particles-container absolute inset-0">
        <div v-for="i in particlesCount" :key="`particle-${i}`" 
             class="particle absolute rounded-full"
             :style="getParticleStyle(i)">
        </div>
      </div>
      
      <!-- Cartes flottantes en arrière-plan -->
      <div v-for="i in 80" :key="`card-bg-${i}`" 
           class="floating-card absolute transition-transform duration-500"
           :style="getCardStyle(i)"
           :class="[
             'playing-card',
             ['spade', 'heart', 'club', 'diamond'][Math.floor(Math.random() * 4)]
           ]">
        <div class="card-reflection absolute inset-0"></div>
      </div>
      
      <!-- Grille de fond -->
      <div class="grid-overlay absolute inset-0" :style="gridStyle"></div>
    </div>

    <!-- Hero Section -->
    <div class="relative h-[80vh] flex items-center justify-center z-10">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-7xl font-bold mb-6 minecraft-3d-text" :style="titleStyle">
          Bienvenue dans le <span class="text-glow">Borderland</span>
        </h1>
        <p class="text-2xl mb-8 text-amber-100 max-w-3xl mx-auto fade-in-up minecraft-3d-subtext" :style="subtitleStyle">
          Survivez aux jeux mortels, défiez votre destin, et prouvez votre valeur dans notre serveur Minecraft inspiré d'Alice in Borderland.
        </p>
        <NuxtLink 
          to="/inscription" 
          class="inline-block hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 relative overflow-hidden btn-3d"
          @mouseover="buttonHover = true"
          @mouseleave="buttonHover = false"
        >
          <span class="relative z-10">Rejoindre les jeux</span>
          <div class="button-glow absolute inset-0" :class="{ 'active': buttonHover }"></div>
        </NuxtLink>
        
        <!-- Bouton Info qui défile vers la section expérience -->
        <div class="mt-4">
          <button 
            class="info-button py-2 px-4 rounded text-amber-300 text-sm font-medium bg-gray-900/80 hover:bg-gray-800/90 transform transition-all duration-300 shadow-sm border border-amber-900/40 bounce-animation"
            @click="scrollToExperience"
          >
            <span class="flex items-center">
              <span class="mr-1">Plus d'informations</span>
              <span class="arrow-icon">↓</span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Experience Section -->
    <div id="experience-section" class="container mx-auto px-4 py-20 relative z-10">
      <h2 class="text-4xl font-bold mb-8 text-center text-amber-500 fade-in-up minecraft-font reveal-element">
        L'Expérience <span class="text-glow-soft">Alice in Borderland</span>
      </h2>
      <p class="text-xl text-center mb-12 text-amber-100 max-w-3xl mx-auto italic reveal-element">
        Entrez dans une aventure où chaque décision peut changer votre destin.
      </p>
      
      <div class="experience-container mb-16 reveal-element">
        <div class="bg-gray-800/80 border border-amber-600/40 rounded-lg p-8 backdrop-blur-sm hover-card transition-all duration-300 card-glassmorphism">
          <div class="card-symbols-bg"></div>
          
          <h3 class="text-2xl font-bold mb-4 text-amber-400 reveal-element">
            <span class="card-icon">🔥</span> Qu'est-ce que l'événement ?
          </h3>
          <p class="mb-6 text-amber-100 reveal-element">
            Inspiré de la série, ce jeu vous plonge dans une <em class="text-amber-300">réalité alternative</em> où seuls les plus stratégiques survivent. Dépassez-vous et relevez des <strong class="text-amber-200">défis extrêmes</strong>.
          </p>
          
          <h3 class="text-2xl font-bold mb-4 text-amber-400 reveal-element">
            <span class="card-icon">🎲</span> Les Règles du Jeu
          </h3>
          <ul class="mb-6 text-amber-100 space-y-2 reveal-element card-list">
            <li>Une carte vous sera attribuée à l'entrée, définissant le <strong class="text-amber-200">type d'épreuve</strong>.</li>
            <li>Chaque épreuve mettra à l'épreuve votre intelligence, votre audace et votre logique.</li>
            <li>Seuls les gagnants avancent… Les autres disparaissent.</li>
          </ul>
          
          <h3 class="text-2xl font-bold mb-4 text-amber-400 reveal-element">
            <span class="card-icon">⏳</span> Contre-la-montre
          </h3>
          <p class="mb-6 text-amber-100 reveal-element">
            Chaque jeu est une course contre le temps. Prenez les bonnes décisions rapidement, ou il sera trop tard.
          </p>
          
          <h3 class="text-2xl font-bold mb-4 text-amber-400 reveal-element">
            <span class="card-icon">🤝</span> Alliances et Trahisons
          </h3>
          <p class="mb-6 text-amber-100 reveal-element">
            Serez-vous un loup solitaire ou choisirez-vous la coopération ? Dans Borderland, la confiance est une denrée rare.
          </p>
          
          <p class="text-2xl text-center font-bold text-amber-500 mt-8 reveal-element countdown-text">
            Le jeu commence bientôt… Serez-vous prêt ?
          </p>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="bg-gray-900/90 py-6 border-t border-amber-600/30 relative z-10">
      <div class="card-glow-container"></div>
      <div class="container mx-auto px-4 text-center">
        <div class="flex justify-center space-x-8 mb-4">
          <a href="https://twitch.tv/fardioxy_" target="_blank" class="flex items-center text-purple-400 hover:text-purple-300 transition-colors social-link">
            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" />
            </svg>
            <span>fardioxy_</span>
          </a>
        </div>
        <p class="text-gray-400 text-sm">© 2025 SemirCorp - Tous droits réservés</p>
        <p class="text-gray-500 text-xs mt-2">Ce site ne collecte aucun cookie et respecte votre vie privée.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

// États et références
const container = ref(null)
const mousePosition = ref({ x: 0, y: 0 }) // Valeurs par défaut sécurisées pour SSR
const windowDimensions = ref({ width: 0, height: 0 })
const buttonHover = ref(false)
const cardPositions = ref(Array(80).fill().map(() => ({ x: 0, y: 0 })))
const particlesCount = ref(40)
const scrollY = ref(0)
const isReducedMotion = ref(false)
// Vérification de l'environnement côté client
const isBrowser = typeof window !== 'undefined'

// Fonction pour faire défiler jusqu'à la section expérience
const scrollToExperience = () => {
  if (!isBrowser) return
  
  const experienceSection = document.getElementById('experience-section')
  if (experienceSection) {
    experienceSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const checkReducedMotion = () => {
  if (!isBrowser) return
  
  if (window.matchMedia) {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    isReducedMotion.value = motionQuery.matches
    
    motionQuery.addEventListener('change', () => {
      isReducedMotion.value = motionQuery.matches
    })
  }
}

const getParticleStyle = (index) => {
  const size = Math.random() * 12 + 2
  const colors = ['#ffb700', '#ff9000', '#ff5e00', '#ffcc00', '#ffd700']
  const color = colors[Math.floor(Math.random() * colors.length)]
  const delay = Math.random() * 8
  const duration = Math.random() * 15 + 15
  const baseLeft = Math.random() * 100
  const baseTop = Math.random() * 100
  
  return {
    left: `${baseLeft}%`,
    top: `${baseTop}%`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    opacity: Math.random() * 0.7 + 0.2,
    filter: `blur(${Math.random() * 2}px)`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    transform: isReducedMotion.value ? 'none' : `translate3d(0, 0, 0) scale(${Math.random() * 0.5 + 0.5})`
  }
}

const getCardStyle = (index) => {
  // Création d'une grille virtuelle pour une distribution uniforme
  const gridCols = 10
  const gridRows = 8
  
  // Positionnement en grille
  const col = index % gridCols
  const row = Math.floor(index / gridCols) % gridRows
  
  // Position de base en pourcentage
  let baseLeft = (col / (gridCols - 1)) * 100
  let baseTop = (row / (gridRows - 1)) * 100
  
  // Ajouter une variation aléatoire pour éviter l'apparence de grille
  const variationFactor = 6
  baseLeft += (Math.random() - 0.5) * variationFactor * 2
  baseTop += (Math.random() - 0.5) * variationFactor * 2
  
  // Assurer que les cartes restent dans les limites de la page
  baseLeft = Math.max(2, Math.min(98, baseLeft))
  baseTop = Math.max(2, Math.min(300, baseTop))
  
  // Variations visuelles
  const rotation = Math.random() * 360
  const scale = Math.random() * 0.4 + 0.15
  const delay = Math.random() * 8
  const duration = Math.random() * 15 + 10
  const zIndex = Math.floor(Math.random() * 5) - 2
  const opacity = Math.random() * 0.35 + 0.05
  
  return {
    left: `${baseLeft}%`,
    top: `${baseTop}%`,
    transform: `rotate(${rotation}deg) scale(${scale})`,
    opacity: opacity,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    zIndex,
    filter: `drop-shadow(0 ${Math.random() * 5 + 2}px ${Math.random() * 5 + 1}px rgba(0,0,0,0.5))`
  }
}

// Styles calculés
const titleStyle = computed(() => {
  return {
    transform: 'perspective(800px) rotateX(10deg) translate3d(0, 0, 0) scale3d(1, 1, 1.2)'
  }
})

const subtitleStyle = computed(() => {
  return {
    transform: 'perspective(800px) rotateX(5deg) translate3d(0, 0, 0)'
  }
})

const gridStyle = computed(() => {
  return {
    backgroundPosition: '0 0',
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }
})

const updateWindowDimensions = () => {
  if (!isBrowser) return
  
  windowDimensions.value = {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

const handleScroll = () => {
  if (!isBrowser) return
  
  scrollY.value = window.scrollY
  
  // Effet de parallaxe sur le défilement
  const titleElement = document.querySelector('.minecraft-3d-text')
  const subtitleElement = document.querySelector('.minecraft-3d-subtext')
  
  if (titleElement && !isReducedMotion.value) {
    titleElement.style.transform = `perspective(800px) rotateX(10deg) translateY(${scrollY.value * 0.1}px) scale3d(1, 1, 1.2)`
  }
  
  if (subtitleElement && !isReducedMotion.value) {
    subtitleElement.style.transform = `perspective(800px) rotateX(5deg) translateY(${scrollY.value * 0.05}px)`
  }
  
  // Effet sur les cartes en fonction du défilement
  if (!isReducedMotion.value) {
    document.querySelectorAll('.floating-card').forEach((card, index) => {
      const direction = index % 2 === 0 ? 1 : -1
      const speed = (index % 5 + 1) * 0.02
      const horizontalFactor = ((index % 3) - 1) * 0.5
      const baseTransform = card.style.transform.split('translate')[0] || ''
      
      card.style.transform = `${baseTransform} translate(${scrollY.value * speed * horizontalFactor}px, ${scrollY.value * speed * direction}px)`
    })
  }
}

// Animation des éléments lors du défilement
const setupScrollAnimations = () => {
  if (!isBrowser) return
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        if (entry.target.classList.contains('reveal-element')) {
          const children = entry.target.querySelectorAll('.reveal-element');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, index * 100);
          });
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
  
  document.querySelectorAll('.experience-container, .reveal-element').forEach(element => {
    observer.observe(element);
  });
}

// Animation de décompte
const setupCountdownAnimation = () => {
  if (!isBrowser) return
  
  const countdownText = document.querySelector('.countdown-text');
  if (!countdownText) return;
  
  let dots = 0;
  setInterval(() => {
    dots = (dots + 1) % 4;
    countdownText.textContent = `Le jeu commence bientôt${'.'.repeat(dots)} Serez-vous prêt ?`;
  }, 500);
}

// Effets de carte avec CSS
const setupDynamicCardEffects = () => {
  if (!isBrowser) return
  
  const cards = document.querySelectorAll('.floating-card');
  
  cards.forEach(card => {
    // Effets de scintillement aléatoires
    setInterval(() => {
      const randomOpacity = Math.random() * 0.3 + 0.1;
      const randomRotation = (Math.random() - 0.5) * 10;
      
      card.style.opacity = randomOpacity.toString();
      
      const currentTransform = card.style.transform;
      const rotateMatch = currentTransform.match(/rotate\(([^)]+)\)/);
      
      if (rotateMatch) {
        const currentRotation = parseFloat(rotateMatch[1]);
        const newRotation = currentRotation + randomRotation;
        card.style.transform = currentTransform.replace(
          /rotate\([^)]+\)/, 
          `rotate(${newRotation}deg)`
        );
      }
    }, Math.random() * 5000 + 3000);
    
    // Effet de lueur pulsante
    const reflection = card.querySelector('.card-reflection');
    if (reflection) {
      setInterval(() => {
        reflection.style.opacity = (Math.random() * 0.3 + 0.1).toString();
      }, Math.random() * 2000 + 1000);
    }
  });
}

// Cycle de vie
onMounted(() => {
  if (!isBrowser) return
  
  checkReducedMotion()
  
  // Maintenant on peut utiliser window en toute sécurité
  mousePosition.value = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
  
  updateWindowDimensions()
  window.addEventListener('resize', updateWindowDimensions)
  window.addEventListener('scroll', handleScroll)
  
  setupScrollAnimations()
  setupCountdownAnimation()
  setupDynamicCardEffects()
})

onUnmounted(() => {
  if (!isBrowser) return
  
  window.removeEventListener('resize', updateWindowDimensions)
  window.removeEventListener('scroll', handleScroll)
})

// Surveiller les changements
watch(isReducedMotion, (newValue) => {
  // Actions pour réduction de mouvement
})
</script>

<style scoped>
/* Font Minecraft */
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

/* Variables CSS */
:root {
  --primary-color: #ffb700;
  --secondary-color: #ff9000;
  --accent-color: #ff5e00;
  --card-color: #ffcc00;
  --bg-dark: #0f0f0f;
  --bg-card: rgba(17, 17, 17, 0.8);
  --glow-intensity: 0.8;
}

/* Styles de base */
.minecraft-font {
  font-family: 'VT323', monospace;
  letter-spacing: 1px;
}

/* Mode réduction de mouvement */
.reduced-motion * {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}

/* Titre 3D */
.minecraft-3d-text {
  font-family: 'VT323', monospace;
  letter-spacing: 2px;
  color: var(--primary-color);
  text-shadow: 
    0 1px 0 #b78500,
    0 2px 0 #a07400, 
    0 3px 0 #896300, 
    0 4px 0 #725200, 
    0 5px 0 #5a4100, 
    0 6px 0 #433000,
    0 7px 0 #2c1f00,
    0 8px 7px rgba(0, 0, 0, 0.6);
  transform: perspective(800px) rotateX(10deg);
  transform-origin: center;
  transform-style: preserve-3d;
  position: relative;
  text-transform: uppercase;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), text-shadow 0.4s ease-out;
  will-change: transform;
}

.text-glow {
  position: relative;
  display: inline-block;
  color: #ffd700;
  animation: textGlow 3s ease-in-out infinite alternate;
  text-shadow: 
    0 1px 0 #b78500,
    0 2px 0 #a07400, 
    0 3px 0 #896300, 
    0 4px 0 #725200, 
    0 5px 0 #5a4100, 
    0 6px 0 #433000,
    0 7px 0 #2c1f00,
    0 0 10px rgba(255, 215, 0, 0.7),
    0 0 20px rgba(255, 215, 0, 0.4),
    0 8px 7px rgba(0, 0, 0, 0.6);
}

.text-glow-soft {
  position: relative;
  display: inline-block;
  animation: textGlowSoft 4s ease-in-out infinite alternate;
}

@keyframes textGlow {
  0%, 100% {
    text-shadow: 
      0 1px 0 #b78500,
      0 2px 0 #a07400, 
      0 3px 0 #896300, 
      0 4px 0 #725200, 
      0 5px 0 #5a4100, 
      0 6px 0 #433000,
      0 7px 0 #2c1f00,
      0 0 10px rgba(255, 215, 0, 0.7),
      0 0 20px rgba(255, 215, 0, 0.4),
      0 8px 7px rgba(0, 0, 0, 0.6);
    color: #ffd700;
  }
  50% {
    text-shadow: 
      0 1px 0 #b78500,
      0 2px 0 #a07400, 
      0 3px 0 #896300, 
      0 4px 0 #725200, 
      0 5px 0 #5a4100, 
      0 6px 0 #433000,
      0 7px 0 #2c1f00,
      0 0 15px rgba(255, 183, 0, 0.8),
      0 0 30px rgba(255, 183, 0, 0.6),
      0 8px 7px rgba(0, 0, 0, 0.6);
    color: #ffb700;
  }
}

@keyframes textGlowSoft {
  0%, 100% {
    text-shadow: 0 0 10px rgba(255, 183, 0, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 183, 0, 0.8);
  }
}

.minecraft-3d-text::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
  height: 10px;
  background: rgba(0, 0, 0, 0.4);
  filter: blur(14px);
  border-radius: 50%;
  z-index: -1;
  transform: scaleX(0.7);
  opacity: 0.8;
}

.minecraft-3d-subtext {
  font-family: 'VT323', monospace;
  font-size: 1.5rem;
  color: #fff;
  text-shadow: 
    2px 2px 0 #000,
    -2px -2px 0 #000, 
    2px -2px 0 #000, 
    -2px 2px 0 #000;
  transform: perspective(800px) rotateX(5deg);
  transform-origin: center;
  position: relative;
  letter-spacing: 1px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
}

/* Cartes flottantes */
.floating-card {
  width: 60px;
  height: 90px;
  border-radius: 5px;
  background-color: rgba(20, 20, 30, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: floatAdvanced 20s ease-in-out infinite;
  transform-style: preserve-3d;
  will-change: transform, opacity;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-reflection {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.1) 50%, 
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(45deg);
  animation: reflectionMove 10s ease-in-out infinite;
  opacity: 0.2;
  pointer-events: none;
}

@keyframes reflectionMove {
  0% {
    transform: rotate(45deg) translate(-100%, -100%);
  }
  50% {
    transform: rotate(45deg) translate(100%, 100%);
  }
  100% {
    transform: rotate(45deg) translate(-100%, -100%);
  }
}

/* Symboles de cartes */
.floating-card.spade::before,
.floating-card.heart::before,
.floating-card.club::before,
.floating-card.diamond::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  opacity: 0.8;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
  animation: symbolPulse 3s ease-in-out infinite alternate;
}

.floating-card.spade::before {
  content: '♠';
  color: white;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.floating-card.heart::before {
  content: '♥';
  color: #ff5555;
  text-shadow: 0 0 5px rgba(255, 100, 100, 0.5);
}

.floating-card.club::before {
  content: '♣';
  color: white;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.floating-card.diamond::before {
  content: '♦';
  color: #ff5555;
  text-shadow: 0 0 5px rgba(255, 100, 100, 0.5);
}

/* Animation des cartes */
@keyframes floatAdvanced {
  0% {
    transform: translateY(0) translateX(0) rotate(0) translateZ(0);
  }
  20% {
    transform: translateY(-15px) translateX(10px) rotate(5deg) translateZ(10px);
  }
  40% {
    transform: translateY(-5px) translateX(-15px) rotate(-3deg) translateZ(5px);
  }
  60% {
    transform: translateY(-25px) translateX(5px) rotate(2deg) translateZ(15px);
  }
  80% {
    transform: translateY(-10px) translateX(-5px) rotate(-1deg) translateZ(5px);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0) translateZ(0);
  }
}

/* Grille en arrière-plan */
.grid-overlay {
  background-image: 
    linear-gradient(to right, rgba(245, 158, 11, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(245, 158, 11, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: gridMove 30s linear infinite;
  transition: background-position 0.3s ease-out, transform 0.3s ease-out;
  will-change: background-position, transform;
  transform-style: preserve-3d;
}

@keyframes gridMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}

/* Animations des éléments */
.fade-in-up {
  animation: fadeInUp 1s ease forwards;
  opacity: 0;
}

.reveal-element {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-element.visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Bouton 3D */
.btn-3d {
  background: linear-gradient(to bottom, #ffb700, #ff9000);
  border: none;
  box-shadow: 
    0 4px 0 #b78500,
    0 5px 10px rgba(0, 0, 0, 0.3);
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-3d:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 6px 0 #b78500,
    0 8px 15px rgba(0, 0, 0, 0.3);
}

.btn-3d:active {
  transform: translateY(2px);
  box-shadow: 
    0 2px 0 #b78500,
    0 3px 5px rgba(0, 0, 0, 0.3);
}

.button-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255, 183, 0, 0.8), transparent 70%);
  filter: blur(15px);
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.button-glow.active {
  opacity: 0.8;
  animation: buttonGlowAnimation 1.5s infinite;
}

@keyframes buttonGlowAnimation {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.15);
  }
}

/* Effets de carte glassmorphism */
.card-glassmorphism {
  background: rgba(25, 25, 25, 0.6);
  backdrop-filter: blur(8px);
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 0 1px rgba(255, 183, 0, 0.2),
    inset 0 0 2px rgba(255, 183, 0, 0.4);
  border: 1px solid rgba(255, 183, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.card-glassmorphism::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transition: left 0.7s ease;
  z-index: -1;
}

.card-glassmorphism:hover::before {
  left: 100%;
}

.card-glassmorphism:hover {
  transform: translateY(-10px);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.4),
    0 0 10px rgba(255, 183, 0, 0.3),
    inset 0 0 3px rgba(255, 183, 0, 0.6);
  border-color: rgba(255, 183, 0, 0.4);
}

.card-symbols-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path fill="%23ffb700" opacity="0.03" d="M40 15c0-15 15-20 25-10 10 10 0 20-10 30-5 5-15 15-15 15s-10-10-15-15c-10-10-20-20-10-30 10-10 25-5 25 10z"/></svg>');
  opacity: 0.1;
  z-index: -1;
  animation: symbolsBgScroll 30s linear infinite;
}

@keyframes symbolsBgScroll {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 80px 80px;
  }
}

/* Icônes de cartes (sans glow) */
.card-icon {
  display: inline-block;
  color: white;
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.7);
  margin-right: 0.5rem;
  font-size: 1.3em;
  transform-origin: center;
}

/* Listes stylisées */
.card-list {
  list-style: none;
  padding-left: 1.5rem;
}

.card-list li {
  position: relative;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
}

.card-list li::before {
  content: '♦';
  position: absolute;
  left: -1rem;
  top: 0;
  color: rgba(255, 94, 0, 0.8);
  font-size: 1rem;
  animation: diamondPulse 3s ease-in-out infinite alternate;
}

@keyframes diamondPulse {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2) rotate(45deg);
    opacity: 1;
  }
}

/* Animation du texte de décompte */
.countdown-text {
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, #ffb700, #ff5e00, #ffb700);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  animation: textGradient 3s linear infinite;
}

@keyframes textGradient {
  to {
    background-position: 200% center;
  }
}

/* Effets de lien sociaux */
.social-link {
  position: relative;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(145, 70, 255, 0.1);
  z-index: -1;
  transform: scale(0);
  transition: transform 0.3s ease;
  border-radius: 0.5rem;
}

.social-link:hover::before {
  transform: scale(1);
}

.social-link:hover svg {
  transform: scale(1.2);
  filter: drop-shadow(0 0 3px rgba(145, 70, 255, 0.5));
}

.social-link svg {
  transition: all 0.3s ease;
}

/* Texte du logo */
.logo-text {
  background: linear-gradient(90deg, #ffb700, #ff5e00, #ffb700);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  animation: textGradient 5s linear infinite;
  letter-spacing: 1px;
}

/* Glow de carte dans le footer */
.card-glow-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.card-glow-container::before {
  content: '';
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255, 183, 0, 0.3), transparent 70%);
  filter: blur(20px);
  animation: footerGlow 10s ease-in-out infinite;
}

@keyframes footerGlow {
  0%, 100% {
    opacity: 0.3;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.5;
    transform: translateX(-50%) scale(1.5);
  }
}

/* Particules */
.particle {
  will-change: transform;
  animation: particleFloat 15s ease-in-out infinite alternate;
}

@keyframes particleFloat {
  0% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(30px) translateX(-20px);
  }
  66% {
    transform: translateY(-20px) translateX(30px);
  }
  100% {
    transform: translateY(10px) translateX(-10px);
  }
}

/* Styles pour le bouton info */
.info-button {
  position: relative;
  overflow: hidden;
  z-index: 10;
  font-size: 0.85rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.info-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 183, 0, 0.1), transparent);
  transition: 0.5s;
  z-index: -1;
}

.info-button:hover::before {
  left: 100%;
}

.arrow-icon {
  display: inline-block;
  transition: transform 0.3s ease;
  font-size: 0.75rem;
}

/* Animation de rebond subtile */
.bounce-animation {
  animation: subtleBounce 3s infinite;
}

@keyframes subtleBounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-2px);
  }
}

/* Effet de smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Media Queries pour Responsive Design */
@media (max-width: 768px) {
  .minecraft-3d-text {
    font-size: 2.5rem;
    text-shadow: 
      0 1px 0 #b78500,
      0 2px 0 #a07400, 
      0 3px 0 #896300, 
      0 4px 0 #725200;
  }
  
  .minecraft-3d-subtext {
    font-size: 1.2rem;
  }
  
  .particlesCount {
    max-width: 20;
  }
  
  /* Adaptation des cartes pour mobile */
  .floating-card {
    opacity: 0.1 !important;
    transform: scale(0.15) !important;
  }
  
  .floating-card:nth-child(odd) {
    display: none;
  }
  
  .floating-card {
    animation-duration: 30s !important;
  }
  
  .info-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
  
  .floating-card,
  .glitch-light {
    display: none !important;
  }
}
</style>