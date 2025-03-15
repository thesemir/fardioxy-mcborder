<template>
    <div class="pt-20 min-h-screen relative">
      <!-- Fond animé interactif -->
      <div class="absolute inset-0 overflow-hidden z-0">
        <!-- Grille de fond -->
        <div class="grid-overlay absolute inset-0"></div>
        
        <!-- Effet de lumière -->
        <div class="glitch-light"></div>
        
        <!-- Fond sombre -->
        <div class="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900"></div>
      </div>
  
      <div class="container mx-auto px-4 py-12 relative z-10">
        <div class="max-w-6xl mx-auto">
          <!-- Navigation et titre -->
          <div class="mb-8 flex items-center">
            <NuxtLink 
              to="/dashboard" 
              class="flex items-center text-amber-400 hover:text-amber-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour au dashboard
            </NuxtLink>
          </div>
          
          <!-- Loading state -->
          <div v-if="isLoading" class="bg-gray-800/90 backdrop-blur-sm rounded-lg border-2 border-amber-600/50 p-8 text-center">
            <div class="inline-block animate-spin h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full mb-4"></div>
            <p class="text-amber-100 text-xl">Chargement des informations...</p>
          </div>
          
          <!-- Error state -->
          <div v-else-if="error" class="bg-gray-800/90 backdrop-blur-sm rounded-lg border-2 border-red-600/50 p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p class="text-red-100 text-xl mb-2">Une erreur est survenue</p>
            <p class="text-red-200">{{ error }}</p>
            <button 
              @click="loadParticipant" 
              class="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Réessayer
            </button>
          </div>
          
          <!-- Participant details -->
          <div v-else-if="participant" class="space-y-8">
            <!-- En-tête et infos principales -->
            <div class="bg-gray-800/90 backdrop-blur-sm rounded-lg border-2 border-amber-600/50 p-6">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <div class="flex items-center">
                    <h1 class="text-3xl font-bold text-amber-500 minecraft-font">{{ participant.realName }}</h1>
                    <span class="ml-3 px-3 py-1 bg-amber-600/20 border border-amber-600/40 rounded-full text-amber-300 text-sm font-mono">
                      {{ participant.registrationId }}
                    </span>
                  </div>
                  <p class="text-amber-100 mt-2 text-lg">
                    <span class="inline-block bg-amber-900/30 px-2 py-0.5 rounded mr-2 text-sm">
                      {{ participant.platform === 'twitch' ? 'Twitch' : 'YouTube' }}: {{ participant.channelName }}
                    </span>
                    <span class="text-amber-300/70 text-sm">
                      Inscrit le {{ formatDate(participant.createdAt) }}
                    </span>
                  </p>
                </div>
                
                <div class="flex mt-4 md:mt-0 space-x-2">
                  <button 
                    @click="copyInfo" 
                    class="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 text-amber-300 font-medium py-2 px-3 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copier les infos</span>
                  </button>
                </div>
              </div>
              
              <!-- Infos principales en grille -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 class="text-sm uppercase text-amber-500/70 font-medium mb-2">Informations personnelles</h3>
                  <ul class="space-y-3">
                    <li class="flex justify-between">
                      <span class="text-amber-200/80">Nom</span>
                      <span class="text-white font-medium">{{ participant.realName }}</span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-amber-200/80">Âge</span>
                      <span class="text-white font-medium">{{ participant.age }} ans</span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-amber-200/80">Email</span>
                      <span class="text-white font-medium">{{ participant.email }}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 class="text-sm uppercase text-amber-500/70 font-medium mb-2">Informations gaming</h3>
                  <ul class="space-y-3">
                    <li class="flex justify-between">
                      <span class="text-amber-200/80">Minecraft</span>
                      <span class="text-white font-medium">{{ participant.minecraftUsername }}</span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-amber-200/80">Discord ID</span>
                      <span class="text-white font-medium">{{ participant.discordId }}</span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-amber-200/80">Plateforme</span>
                      <span :class="participant.platform === 'twitch' ? 'bg-purple-900/50 text-purple-200' : 'bg-red-900/50 text-red-200'" class="px-2 py-0.5 text-xs rounded">
                        {{ participant.platform === 'twitch' ? 'Twitch' : 'YouTube' }}
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 class="text-sm uppercase text-amber-500/70 font-medium mb-2">Informations RP</h3>
                  <ul class="space-y-3">
                    <li class="flex justify-between">
                      <span class="text-amber-200/80">Nom RP</span>
                      <span class="text-white font-medium">{{ participant.rpName }}</span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-amber-200/80">Âge RP</span>
                      <span class="text-white font-medium">{{ participant.rpAge }} ans</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Histoire RP -->
            <div class="bg-gray-800/90 backdrop-blur-sm rounded-lg border-2 border-amber-600/50 p-6">
              <h2 class="text-2xl font-bold text-amber-500 minecraft-font mb-4">Histoire du personnage</h2>
              <div class="bg-gray-900/80 rounded-lg p-4 border border-amber-700/30">
                <p class="text-amber-100 whitespace-pre-line">{{ participant.rpStory || 'Aucune histoire spécifiée.' }}</p>
              </div>
            </div>
            
            <!-- Connexions RP -->
            <div class="bg-gray-800/90 backdrop-blur-sm rounded-lg border-2 border-amber-600/50 p-6">
              <h2 class="text-2xl font-bold text-amber-500 minecraft-font mb-4">Connections avec d'autres personnages</h2>
              <div class="bg-gray-900/80 rounded-lg p-4 border border-amber-700/30">
                <p class="text-amber-100 whitespace-pre-line">{{ participant.rpConnections || 'Aucune connexion spécifiée.' }}</p>
              </div>
            </div>
            
            <!-- Boutons d'action -->
            <div class="flex justify-end space-x-4">
              <button 
                @click="approveParticipant"
                class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Approuver la candidature
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  // Configuration de la page
  definePageMeta({
    middleware: ['auth'] // Appliquer le middleware d'authentification
  });
  
  // Récupération de l'ID du participant depuis l'URL
  const route = useRoute();
  const router = useRouter();
  const participantId = route.params.id;
  
  // États
  const participant = ref(null);
  const isLoading = ref(true);
  const error = ref(null);
  const copySuccess = ref(false);
  
  // Chargement des données du participant
  const loadParticipant = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Appel à l'API pour récupérer les détails du participant
      const response = await $fetch(`/api/participant/${participantId}`);
      
      if (response.success) {
        participant.value = response.participant;
      } else {
        error.value = response.message || 'Une erreur est survenue lors de la récupération des données';
      }
    } catch (err) {
      console.error('Erreur lors de la récupération du participant:', err);
      error.value = err.message || 'Une erreur est survenue lors de la connexion au serveur';
    } finally {
      isLoading.value = false;
    }
  };
  
  // Formatage de la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Copie des informations principales
  const copyInfo = () => {
    if (!participant.value) return;
    
    const info = `
  Informations joueur - Alice in Borderland MC
  -------------------------------------
  ID: ${participant.value.registrationId}
  Nom: ${participant.value.realName}
  Minecraft: ${participant.value.minecraftUsername}
  Discord: ${participant.value.discordId}
  Email: ${participant.value.email}
  Plateforme: ${participant.value.platform}
  Pseudo: ${participant.value.channelName}
  -------------------------------------
    `;
    
    navigator.clipboard.writeText(info)
      .then(() => {
        copySuccess.value = true;
        setTimeout(() => {
          copySuccess.value = false;
        }, 2000);
      })
      .catch(err => {
        console.error('Erreur lors de la copie:', err);
      });
  };
  
  // Approuver la candidature
  const approveParticipant = async () => {
    try {
      const response = await $fetch(`/api/participant/${participantId}/approve`, {
        method: 'POST'
      });
      
      if (response.success) {
        // Redirection vers le dashboard avec un message de succès
        router.push('/dashboard?message=Candidature approuvée avec succès');
      } else {
        error.value = response.message || 'Une erreur est survenue lors de l\'approbation';
      }
    } catch (err) {
      console.error('Erreur lors de l\'approbation:', err);
      error.value = err.message || 'Une erreur est survenue lors de la connexion au serveur';
    }
  };
  
  // Chargement initial des données
  onMounted(() => {
    loadParticipant();
  });
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
  </style>