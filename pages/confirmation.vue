<template>
    <div class="pt-20 min-h-screen relative">
      <!-- Fond animé -->
      <div class="absolute inset-0 overflow-hidden z-0">
        <!-- Lignes de grille -->
        <div class="grid-overlay absolute inset-0"></div>
        
        <!-- Effet de lumière -->
        <div class="glitch-light"></div>
        
        <!-- Fond sombre -->
        <div class="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900"></div>
      </div>
  
      <div class="container mx-auto px-4 py-12 relative z-10">
        <div class="max-w-3xl mx-auto bg-gray-800/90 backdrop-blur-sm rounded-lg border-2 border-amber-600/50 p-8 confirmation-container">
          <!-- Icône de succès -->
          <div class="flex justify-center mb-6">
            <div class="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border-4 border-green-500">
              <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
  
          <h2 class="text-4xl font-bold mb-6 text-amber-500 minecraft-font text-center">Candidature Enregistrée!</h2>
          
          <div class="success-card p-6 bg-gray-900/80 rounded-lg border border-amber-600/30 mb-8">
            <p class="text-xl text-center text-amber-100 mb-4">
              Félicitations <span class="font-bold">{{ userName }}</span>, votre Visa pour le Borderland a été accepté!
            </p>
            
            <p class="text-amber-200 text-center mb-6">
              Votre numéro de participant est: <span class="font-mono bg-amber-800/30 px-3 py-1 rounded">{{ userId }}</span>
            </p>
            
            <div class="border-t border-amber-600/20 pt-6 mt-6">
              <p class="text-amber-100 mb-4">Prochaines étapes:</p>
              <ul class="list-disc pl-6 space-y-2 text-amber-200">
                <li>Rejoignez notre serveur Discord pour plus d'informations</li>
                <li>Surveillez votre email pour recevoir les détails de connexion</li>
                <li>Préparez-vous mentalement aux jeux qui vous attendent</li>
              </ul>
            </div>
          </div>
          
          <div class="countdown-timer text-center p-4 bg-amber-900/20 rounded-lg border border-amber-600/30">
            <p class="text-amber-200 mb-2">Les jeux commencent dans:</p>
            <div class="flex justify-center space-x-4">
              <div class="flex flex-col items-center">
                <span class="text-3xl font-bold text-amber-400">{{ days }}</span>
                <span class="text-amber-200 text-sm">Jours</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="text-3xl font-bold text-amber-400">{{ hours }}</span>
                <span class="text-amber-200 text-sm">Heures</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="text-3xl font-bold text-amber-400">{{ minutes }}</span>
                <span class="text-amber-200 text-sm">Minutes</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="text-3xl font-bold text-amber-400">{{ seconds }}</span>
                <span class="text-amber-200 text-sm">Secondes</span>
              </div>
            </div>
          </div>
          
          <div class="flex justify-center mt-8">
            <NuxtLink 
              to="/" 
              class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 relative overflow-hidden pulse-button"
            >
              <span class="relative z-10">Retour à l'accueil</span>
            </NuxtLink>
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
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  
  // Récupération des données de l'URL
  const userName = computed(() => route.query.nom || 'Participant');
  const userId = computed(() => route.query.id || 'BL-' + Math.floor(1000 + Math.random() * 9000));
  
  // Configuration du compte à rebours
  const targetDate = new Date();
  // Ajouter 7 jours à la date actuelle pour le compte à rebours
  targetDate.setDate(targetDate.getDate() + 7);
  
  const days = ref(0);
  const hours = ref(0);
  const minutes = ref(0);
  const seconds = ref(0);
  
  // Calcul du temps restant
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    
    days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000);
    
    if (distance < 0) {
      clearInterval(countdownTimer);
      days.value = 0;
      hours.value = 0;
      minutes.value = 0;
      seconds.value = 0;
    }
  };
  
  // Mise à jour du compte à rebours
  let countdownTimer;
  
  onMounted(() => {
    updateCountdown();
    countdownTimer = setInterval(updateCountdown, 1000);
    
    // Animation de la carte de confirmation
    const confirmationContainer = document.querySelector('.confirmation-container');
    setTimeout(() => {
      confirmationContainer.classList.add('visible');
    }, 300);
    
    // Nettoyage à la destruction du composant
    return () => {
      clearInterval(countdownTimer);
    };
  });
  </script>
  
  <style scoped>
  /* Font Minecraft */
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
  
  .minecraft-font {
    font-family: 'VT323', monospace;
    letter-spacing: 1px;
  }
  
  /* Animation du conteneur de confirmation */
  .confirmation-container {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .confirmation-container.visible {
    opacity: 1;
    transform: translateY(0);
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
  
  /* Animation de succès */
  .success-card {
    animation: successPulse 3s infinite alternate;
  }
  
  @keyframes successPulse {
    0% {
      box-shadow: 0 0 5px rgba(245, 158, 11, 0.2);
    }
    100% {
      box-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
    }
  }
  </style>