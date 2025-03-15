<template>
    <div class="pt-20 min-h-screen relative">
      <!-- Fond animé interactif -->
      <div class="absolute inset-0 overflow-hidden z-0">
        <!-- Grille de fond -->
        <div class="grid-overlay absolute inset-0"></div>
        
        <!-- Effet de lumière rouge -->
        <div class="glitch-light-red"></div>
        
        <!-- Fond sombre -->
        <div class="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900"></div>
      </div>
  
      <div class="container mx-auto px-4 py-12 relative z-10">
        <div class="max-w-3xl mx-auto bg-gray-800/90 backdrop-blur-sm rounded-lg border-2 border-red-600/50 p-8 text-center">
          <div class="flex justify-center mb-6">
            <div class="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center border-4 border-red-500">
              <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
          </div>
          
          <h2 class="text-4xl font-bold mb-6 text-red-500 minecraft-font">Accès Refusé</h2>
          
          <div class="access-denied-card p-6 bg-gray-900/80 rounded-lg border border-red-600/30 mb-8">
            <p class="text-xl text-center text-red-100 mb-4">
              Vous n'avez pas les permissions nécessaires pour accéder à cette section.
            </p>
            
            <p class="text-red-200 text-center mb-6">
              Seuls les administrateurs autorisés peuvent accéder au tableau de bord.
            </p>
            
            <div class="border-t border-red-600/20 pt-6 mt-6">
              <p class="text-red-100 mb-4">Raisons possibles:</p>
              <ul class="list-disc pl-6 space-y-2 text-red-200 text-left">
                <li>Votre compte Discord n'est pas dans la liste des administrateurs</li>
                <li>Vous devez vous connecter avec un compte Discord différent</li>
                <li>Une erreur s'est produite lors de la vérification de vos permissions</li>
              </ul>
            </div>
          </div>
          
          <div class="flex justify-center mt-8 space-x-4">
            <NuxtLink 
              to="/" 
              class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <span class="relative z-10">Retour à l'accueil</span>
            </NuxtLink>
            
            <a 
              href="/auth/discord?state=dashboard" 
              class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <span class="relative z-10">Se reconnecter</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Script spécifique à la page d'accès refusé
  </script>
  
  <style scoped>
  /* Font Minecraft */
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
  
  .minecraft-font {
    font-family: 'VT323', monospace;
    letter-spacing: 1px;
  }
  
  /* Grille en arrière-plan */
  .grid-overlay {
    background-image: 
      linear-gradient(to right, rgba(239, 68, 68, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 1px, transparent 1px);
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
  
  /* Effet de lumière rouge */
  .glitch-light-red {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.3), transparent 60%);
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
  
  /* Animation de la carte d'accès refusé */
  .access-denied-card {
    animation: accessDeniedPulse 3s infinite alternate;
  }
  
  @keyframes accessDeniedPulse {
    0% {
      box-shadow: 0 0 5px rgba(239, 68, 68, 0.2);
    }
    100% {
      box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
    }
  }
  </style>