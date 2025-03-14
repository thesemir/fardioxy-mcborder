<template>
  <div class="min-h-screen relative">
    <!-- Fond animé pour tout le site -->
    <div class="fixed inset-0 overflow-hidden z-0">
      <!-- Lignes de grille -->
      <div class="grid-overlay absolute inset-0"></div>
      
      <!-- Effet de lumière -->
      <div class="glitch-light"></div>
      
      <!-- Fond sombre -->
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900"></div>
    </div>

    <!-- Navigation -->
    <nav class="bg-gray-900/80 backdrop-blur-md border-b border-amber-600/30 fixed w-full z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-xl md:text-2xl font-bold text-amber-500 minecraft-font">Alice in Borderland MC</h1>
          
          <!-- Menu pour mobile -->
          <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-amber-100 focus:outline-none transition-transform duration-300" :class="{'rotate-90': isMenuOpen}">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <!-- Menu pour desktop -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/" class="hover:text-amber-500 transition-colors text-amber-100 hover:scale-105 transform duration-200">Accueil</NuxtLink>
            <NuxtLink to="/inscription" class="hover:text-amber-500 transition-colors text-amber-100 hover:scale-105 transform duration-200">Inscription</NuxtLink>
            <a 
              href="https://discord.com/invite/T8YMdyJBc8" 
              target="_blank" 
              class="flex items-center space-x-1 text-amber-100 hover:text-amber-500 transition-colors hover:scale-105 transform duration-200"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span>Discord</span>
            </a>
          </div>
        </div>
        
        <!-- Menu mobile déroulant avec animation -->
        <transition
          name="menu-transition"
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform -translate-y-10 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-10 opacity-0"
        >
          <div v-if="isMenuOpen" class="md:hidden pt-4 pb-2 space-y-3">
            <NuxtLink to="/" class="block py-2 hover:text-amber-500 transition-colors text-amber-100 menu-item">Accueil</NuxtLink>
            <NuxtLink to="/inscription" class="block py-2 hover:text-amber-500 transition-colors text-amber-100 menu-item">Inscription</NuxtLink>
            <a 
              href="https://discord.com/invite/T8YMdyJBc8" 
              target="_blank" 
              class="flex items-center space-x-1 py-2 text-amber-100 hover:text-amber-500 transition-colors menu-item"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span>Discord</span>
            </a>
          </div>
        </transition>
      </div>
    </nav>

    <!-- Main Content avec padding-top pour la navbar fixe -->
    <div class="pt-16">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
// État pour le menu mobile
const isMenuOpen = ref(false);

// Importer useRoute pour accéder à l'objet route
const route = useRoute();

// Fermer le menu mobile lors d'un changement de route
watch(() => route.path, () => {
  isMenuOpen.value = false;
});
</script>

<style>
/* Font Minecraft */
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

body {
  background-color: #111827; /* gray-900 */
  margin: 0;
  padding: 0;
}

.minecraft-font {
  font-family: 'VT323', monospace;
  letter-spacing: 1px;
}

/* Grille en arrière-plan */
.grid-overlay {
  background-image: 
    linear-gradient(to right, rgba(245, 158, 11, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(245, 158, 11, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}

/* Effet de lumière */
.glitch-light {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.3), transparent 60%);
  animation: lightPulse 8s infinite;
  z-index: 1;
}

@keyframes lightPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

/* Animation pour les cartes (conservée au cas où) */
@keyframes cardFloat {
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-10px) rotate(1deg);
  }
}

/* Ajustements responsives supplémentaires */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Animation des éléments du menu mobile */
.menu-item {
  animation: fadeInSlideDown 0.4s ease forwards;
  opacity: 0;
  transform: translateY(-10px);
}

.menu-item:nth-child(1) {
  animation-delay: 0.1s;
}

.menu-item:nth-child(2) {
  animation-delay: 0.2s;
}

.menu-item:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes fadeInSlideDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet hover sur les liens */
.menu-item {
  position: relative;
}

.menu-item::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #F59E0B; /* amber-500 */
  transition: width 0.3s ease;
}

.menu-item:hover::after {
  width: 100%;
}
</style>