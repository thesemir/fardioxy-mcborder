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

    <div class="container mx-auto px-4 py-12 relative z-10">
      <div class="max-w-3xl mx-auto bg-gray-800/90 backdrop-blur-sm rounded-lg border-2 border-amber-600/50 p-8 form-container">
        <h2 class="text-4xl font-bold mb-6 text-amber-500 minecraft-font">Inscription aux Jeux</h2>
        <p class="mb-8 text-amber-100">Remplissez ce formulaire pour participer aux jeux mortels d'Alice in Borderland. Votre visa pour le Borderland dépend de ces informations.</p>

        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Informations Hors RP -->
          <div class="border-b-2 border-amber-600/30 pb-6 mb-6">
            <h3 class="text-2xl font-bold mb-4 text-amber-400">Informations Réelles</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2 text-amber-200">Nom complet</label>
                <input 
                  type="text" 
                  v-model="form.realName"
                  class="w-full bg-gray-900/80 border-2 border-amber-700/50 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium mb-2 text-amber-200">ID Discord</label>
                <input 
                  type="text" 
                  v-model="form.discordId"
                  class="w-full bg-gray-900/80 border-2 border-amber-700/50 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium mb-2 text-amber-200">Nom d'utilisateur Minecraft</label>
                <input 
                  type="text" 
                  v-model="form.minecraftUsername"
                  class="w-full bg-gray-900/80 border-2 border-amber-700/50 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium mb-2 text-amber-200">Email</label>
                <input 
                  type="email" 
                  v-model="form.email"
                  class="w-full bg-gray-900/80 border-2 border-amber-700/50 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium mb-2 text-amber-200">Âge</label>
                <input 
                  type="number" 
                  v-model="form.age"
                  class="w-full bg-gray-900/80 border-2 border-amber-700/50 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500"
                  required
                  min="13"
                >
              </div>

              <div class="space-y-4">
                <label class="block text-sm font-medium mb-2 text-amber-200">Plateforme de Stream</label>
                <div class="flex space-x-6">
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      v-model="form.platform" 
                      value="twitch"
                      class="form-radio text-amber-500"
                    >
                    <span class="text-amber-100">Twitch</span>
                  </label>
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      v-model="form.platform" 
                      value="youtube"
                      class="form-radio text-amber-500"
                    >
                    <span class="text-amber-100">YouTube</span>
                  </label>
                </div>
                <div class="flex space-x-2">
                  <input 
                    type="text" 
                    :value="platformUrl" 
                    class="w-1/2 bg-gray-900/80 border-2 border-amber-700/30 rounded-lg px-4 py-2 text-gray-500"
                    readonly
                  >
                  <input 
                    type="text" 
                    v-model="form.channelName"
                    class="w-1/2 bg-gray-900/80 border-2 border-amber-700/50 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500"
                    :placeholder="form.platform === 'youtube' ? 'Nom de chaîne' : 'Pseudo Twitch'"
                    required
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Informations RP -->
          <div class="space-y-4">
            <h3 class="text-2xl font-bold mb-4 text-amber-400">Informations Roleplay</h3>

            <div>
              <label class="block text-sm font-medium mb-2 text-amber-200">Pseudo RP</label>
              <input 
                type="text" 
                v-model="form.rpName"
                class="w-full bg-gray-900/80 border-2 border-amber-700/50 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500"
                required
              >
            </div>

            <div>
              <label class="block text-sm font-medium mb-2 text-amber-200">Âge RP</label>
              <input 
                type="number" 
                v-model="form.rpAge"
                class="w-full bg-gray-900/80 border-2 border-amber-700/50 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500"
                required
              >
            </div>

            <div>
              <label class="block text-sm font-medium mb-2 text-amber-200">Histoire du personnage</label>
              <textarea 
                v-model="form.rpStory"
                class="w-full bg-gray-900/80 border-2 border-amber-700/50 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500 h-32"
                required
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2 text-amber-200">Liens avec d'autres personnages</label>
              <textarea 
                v-model="form.rpConnections"
                class="w-full bg-gray-900/80 border-2 border-amber-700/50 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500 h-32"
                placeholder="ID Discord des joueurs (un par ligne)"
              ></textarea>
            </div>
          </div>

          <button 
            type="submit"
            class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 relative overflow-hidden pulse-button"
            :disabled="isSubmitting"
          >
            <span class="relative z-10" v-if="!isSubmitting">Soumettre ma candidature</span>
            <span class="relative z-10 flex items-center justify-center" v-else>
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement en cours...
            </span>
          </button>
          
          <div v-if="errorMessage" class="mt-4 p-3 bg-red-600/20 border border-red-500 rounded-lg text-red-200 text-center">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="bg-gray-900/90 py-6 border-t border-amber-600/30 relative z-10 mt-12">
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Vérification de l'environnement côté client
const isBrowser = typeof window !== 'undefined'

// États et références pour le formulaire
const container = ref(null)
const isSubmitting = ref(false)
const errorMessage = ref('')
const particlesCount = ref(40)
const windowDimensions = ref({ width: 0, height: 0 })
const scrollY = ref(0)
const isReducedMotion = ref(false)

// État du formulaire
const form = ref({
  realName: '',
  discordId: '',
  minecraftUsername: '',
  email: '',
  age: '',
  platform: 'twitch',
  channelName: '',
  rpName: '',
  rpAge: '',
  rpStory: '',
  rpConnections: ''
})

// URL de la plateforme
const platformUrl = computed(() => {
  return form.value.platform === 'twitch' 
    ? 'https://www.twitch.tv/' 
    : 'https://www.youtube.com/@'
})

// Styles calculés pour la grille
const gridStyle = computed(() => {
  return {
    backgroundPosition: '0 0',
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }
})

// Fonction pour vérifier les préférences de mouvement réduit
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

// Fonction pour générer des styles de particules
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

// Fonction pour générer des styles de cartes flottantes
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

// Fonction pour mettre à jour les dimensions de la fenêtre
const updateWindowDimensions = () => {
  if (!isBrowser) return
  
  windowDimensions.value = {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

// Gestion du défilement
const handleScroll = () => {
  if (!isBrowser) return
  
  scrollY.value = window.scrollY
}

// Soumission du formulaire
const submitForm = async () => {
  try {
    // Afficher un indicateur de chargement
    isSubmitting.value = true;
    errorMessage.value = '';
    
    console.log("Envoi du formulaire à l'API...");
    
    // Appel à l'API Nuxt.js
    const response = await $fetch('/api/inscription', {
      method: 'POST',
      body: form.value
    });
    
    console.log("Réponse de l'API:", response);
    
    // Vérification du format de la réponse
    if (response && response.id) {
      console.log(`ID de confirmation reçu: ${response.id}`);
      
      // Essayons d'abord d'utiliser la navigation programmatique avec l'API Nuxt
      console.log(`Tentative de redirection vers: /confirmation/${response.id}`);
      
      // Version avec attente pour s'assurer que la promesse est résolue
      try {
        await navigateTo(`/confirmation/${response.id}`, { 
          replace: true
        });
      } catch (navError) {
        console.error("Erreur lors de la navigation:", navError);
        
        // Fallback: utiliser window.location directement
        console.log("Tentative avec window.location...");
        window.location.href = `/confirmation/${response.id}`;
      }
    } else if (response && response.success) {
      // Cas alternatif où l'ID serait renvoyé avec une structure différente
      console.log("Réponse de succès mais pas d'ID direct, recherche alternative...");
      
      // Si la réponse n'a pas d'ID direct mais a un registrationId
      if (response.registrationId) {
        console.log(`RegistrationID trouvé: ${response.registrationId}`);
        window.location.href = `/confirmation/${response.registrationId}`;
      } else {
        // Si la page de confirmation a besoin de paramètres de requête différents
        console.log("Tentative de redirection vers /confirmation avec ID en query param");
        window.location.href = `/confirmation?id=${response.id || response._id || ''}`;
      }
    } else {
      console.error("Réponse reçue mais pas d'ID:", response);
      throw new Error('ID de confirmation manquant dans la réponse');
    }
    
  } catch (error) {
    // Gérer les erreurs
    console.error('Erreur lors de la soumission:', error);
    
    if (error.response) {
      console.log("Détails de l'erreur:", error.response);
      
      if (error.response.status === 409) {
        errorMessage.value = "Un utilisateur avec cet email ou ce pseudo Minecraft est déjà inscrit.";
      } else {
        errorMessage.value = `Erreur (${error.response.status}): ${error.response.statusText || 'Erreur serveur'}`;
      }
    } else {
      errorMessage.value = "Une erreur est survenue. Veuillez réessayer.";
    }
    
    isSubmitting.value = false;
  }
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

// Fonction pour nettoyer les intervalles
const cleanupIntervals = () => {
  if (!isBrowser) return
  
  // Impossible de nettoyer tous les intervalles individuellement car ils ne sont pas stockés
  // En production, il faudrait stocker les références aux intervalles pour pouvoir les nettoyer correctement
}

// Cycle de vie
onMounted(() => {
  if (!isBrowser) return
  
  checkReducedMotion()
  
  // Maintenant on peut utiliser window en toute sécurité
  updateWindowDimensions()
  window.addEventListener('resize', updateWindowDimensions)
  window.addEventListener('scroll', handleScroll)
  
  // Animation du formulaire
  const formContainer = document.querySelector('.form-container');
  setTimeout(() => {
    formContainer?.classList.add('visible');
  }, 300);
  
  setupDynamicCardEffects()
})

onBeforeUnmount(() => {
  if (!isBrowser) return
  
  window.removeEventListener('resize', updateWindowDimensions)
  window.removeEventListener('scroll', handleScroll)
  cleanupIntervals()
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

/* Effet de smooth scroll */
html {
  scroll-behavior: smooth;
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

/* Animation du formulaire */
.form-container {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.form-container.visible {
  opacity: 1;
  transform: translateY(0);
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

/* Animation du bouton */
.pulse-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(245, 158, 11, 0.8), rgba(245, 158, 11, 0.2));
  z-index: 0;
  animation: pulseGlow 2s infinite;
}

@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

/* Style des boutons radio */
.form-radio {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #4B5563;
  border-radius: 50%;
  background-color: #1F2937;
  cursor: pointer;
}

.form-radio:checked {
  background-color: #F59E0B;
  border-color: #B45309;
}

.form-radio:focus {
  outline: none;
  border-color: #F59E0B;
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

@keyframes textGradient {
  to {
    background-position: 200% center;
  }
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

/* Media Queries pour Responsive Design */
@media (max-width: 768px) {
  .minecraft-font {
    font-size: 1.8rem;
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