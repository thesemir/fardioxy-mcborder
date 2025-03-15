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
          <!-- En-tête du Dashboard -->
          <div class="bg-gray-800/90 backdrop-blur-sm rounded-lg border-2 border-amber-600/50 p-6 mb-8">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 class="text-3xl font-bold text-amber-500 minecraft-font">Dashboard Admin</h1>
                <p class="text-amber-100 mt-2">Gestion des participants à Alice in Borderland</p>
              </div>
              
              <div class="mt-4 md:mt-0 flex flex-col items-end">
                <div class="flex items-center space-x-3 mb-2">
                  <div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    <img v-if="user && user.avatar" :src="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`" alt="Avatar" class="w-full h-full object-cover" />
                    <span v-else class="text-amber-500 text-xl">{{ getUserInitials() }}</span>
                  </div>
                  <div>
                    <p class="text-amber-100 font-medium">{{ user ? user.username : 'Chargement...' }}</p>
                    <p class="text-xs text-amber-300/70">Admin</p>
                  </div>
                </div>
                <button @click="logout" class="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
          
          <!-- Statistiques -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="stats-card bg-gray-800/80 backdrop-blur-sm rounded-lg border border-amber-600/40 p-5">
              <h3 class="text-amber-400 text-lg font-medium mb-2">Total Participants</h3>
              <div class="flex items-baseline">
                <span class="text-4xl font-bold text-white">{{ participants.length }}</span>
                <span class="ml-2 text-amber-300 text-sm">inscrits</span>
              </div>
            </div>
            
            <div class="stats-card bg-gray-800/80 backdrop-blur-sm rounded-lg border border-amber-600/40 p-5">
              <h3 class="text-amber-400 text-lg font-medium mb-2">Âge Moyen</h3>
              <div class="flex items-baseline">
                <span class="text-4xl font-bold text-white">{{ averageAge }}</span>
                <span class="ml-2 text-amber-300 text-sm">ans</span>
              </div>
            </div>
            
            <div class="stats-card bg-gray-800/80 backdrop-blur-sm rounded-lg border border-amber-600/40 p-5">
              <h3 class="text-amber-400 text-lg font-medium mb-2">Plateforme</h3>
              <div class="flex flex-col">
                <div class="flex items-center justify-between">
                  <span class="text-white">Twitch</span>
                  <span class="text-amber-300">{{ twitchCount }} ({{ twitchPercentage }}%)</span>
                </div>
                <div class="flex items-center justify-between mt-1">
                  <span class="text-white">YouTube</span>
                  <span class="text-amber-300">{{ youtubeCount }} ({{ youtubePercentage }}%)</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Tableau des participants -->
          <div class="bg-gray-800/90 backdrop-blur-sm rounded-lg border-2 border-amber-600/50 p-6 mb-8">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 class="text-2xl font-bold text-amber-500 minecraft-font">Liste des Participants</h2>
              
              <div class="mt-4 md:mt-0 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <div class="relative">
                  <input 
                    type="text" 
                    v-model="searchQuery"
                    placeholder="Rechercher..."
                    class="bg-gray-900/80 border border-amber-700/50 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 pl-9"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-2 top-2.5 text-amber-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-amber-600/20">
                <thead>
                  <tr>
                    <th @click="sortBy('registrationId')" class="px-4 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700/30">
                      <div class="flex items-center">
                        ID
                        <span v-if="sortColumn === 'registrationId'" class="ml-1">
                          {{ sortDirection === 'asc' ? '↑' : '↓' }}
                        </span>
                      </div>
                    </th>
                    <th @click="sortBy('realName')" class="px-4 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700/30">
                      <div class="flex items-center">
                        Nom
                        <span v-if="sortColumn === 'realName'" class="ml-1">
                          {{ sortDirection === 'asc' ? '↑' : '↓' }}
                        </span>
                      </div>
                    </th>
                    <th @click="sortBy('minecraftUsername')" class="px-4 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700/30">
                      <div class="flex items-center">
                        Minecraft
                        <span v-if="sortColumn === 'minecraftUsername'" class="ml-1">
                          {{ sortDirection === 'asc' ? '↑' : '↓' }}
                        </span>
                      </div>
                    </th>
                    <th @click="sortBy('discordId')" class="px-4 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700/30">
                      <div class="flex items-center">
                        Discord ID
                        <span v-if="sortColumn === 'discordId'" class="ml-1">
                          {{ sortDirection === 'asc' ? '↑' : '↓' }}
                        </span>
                      </div>
                    </th>
                    <th @click="sortBy('platform')" class="px-4 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700/30">
                      <div class="flex items-center">
                        Plateforme
                        <span v-if="sortColumn === 'platform'" class="ml-1">
                          {{ sortDirection === 'asc' ? '↑' : '↓' }}
                        </span>
                      </div>
                    </th>
                    <th @click="sortBy('createdAt')" class="px-4 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700/30">
                      <div class="flex items-center">
                        Date
                        <span v-if="sortColumn === 'createdAt'" class="ml-1">
                          {{ sortDirection === 'asc' ? '↑' : '↓' }}
                        </span>
                      </div>
                    </th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-amber-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-gray-800/50 divide-y divide-amber-600/10">
                  <tr v-for="participant in filteredParticipants" :key="participant._id" class="hover:bg-gray-700/30 transition-colors">
                    <td class="px-4 py-4 whitespace-nowrap text-sm font-mono text-amber-400">
                      {{ participant.registrationId }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-white">
                      {{ participant.realName }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-amber-100">
                      {{ participant.minecraftUsername }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-amber-100">
                      {{ participant.discordId }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm">
                      <span :class="participant.platform === 'twitch' ? 'bg-purple-900/50 text-purple-200' : 'bg-red-900/50 text-red-200'" class="px-2 py-1 text-xs rounded">
                        {{ participant.platform === 'twitch' ? 'Twitch' : 'YouTube' }}
                      </span>
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                      {{ formatDate(participant.createdAt) }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <NuxtLink :to="`/dashboard/participant/${participant._id}`" class="text-amber-500 hover:text-amber-400 transition-colors mr-3">
                        Détails
                      </NuxtLink>
                    </td>
                  </tr>
                  <tr v-if="filteredParticipants.length === 0">
                    <td colspan="7" class="px-4 py-8 text-center text-gray-400">
                      <div v-if="isLoading">
                        <div class="inline-block animate-spin h-6 w-6 border-2 border-amber-500 border-t-transparent rounded-full mr-2"></div>
                        Chargement des participants...
                      </div>
                      <div v-else>
                        Aucun participant trouvé.
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  // Configuration de la page
  definePageMeta({
    middleware: ['auth'] // Appliquer le middleware uniquement à la page du tableau de bord
  });
  
  // États
  const participants = ref([]);
  const isLoading = ref(true);
  const searchQuery = ref('');
  const sortColumn = ref('createdAt');
  const sortDirection = ref('desc');
  const { loggedIn, user , clear } = useUserSession();
  
  // Récupération des données
  onMounted(async () => {
    try {
      const { participants: fetchedParticipants, success } = await $fetch('/api/inscriptions');
      if (success) {
        participants.value = fetchedParticipants;
      } else {
        console.error('Erreur lors de la récupération des participants');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des participants:', error);
    } finally {
      isLoading.value = false;
    }
  });
  
  // Fonction pour obtenir les initiales de l'utilisateur
  const getUserInitials = () => {
    if (!user.value || !user.value.username) return '?';
    return user.value.username.substring(0, 2).toUpperCase();
  };
  
  // Fonction de déconnexion
  const logout = async () => {
    await clear()
    navigateTo('/');
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
  
  // Fonction de tri
  const sortBy = (column) => {
    if (sortColumn.value === column) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.value = column;
      sortDirection.value = 'asc';
    }
  };
  
  // Participants filtrés et triés
  const filteredParticipants = computed(() => {
    // Filtrage
    let filtered = [...participants.value];
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(p => 
        (p.realName && p.realName.toLowerCase().includes(query)) ||
        (p.minecraftUsername && p.minecraftUsername.toLowerCase().includes(query)) ||
        (p.email && p.email.toLowerCase().includes(query)) ||
        (p.discordId && p.discordId.includes(query)) ||
        (p.registrationId && p.registrationId.toLowerCase().includes(query))
      );
    }
    
    // Tri
    filtered.sort((a, b) => {
      let valA = a[sortColumn.value];
      let valB = b[sortColumn.value];
      
      // Pour les dates
      if (sortColumn.value === 'createdAt') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } 
      // Pour les chaînes de caractères
      else if (typeof valA === 'string' && typeof valB === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      
      if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1;
      return 0;
    });
    
    return filtered;
  });
  
  // Statistiques
  const averageAge = computed(() => {
    if (participants.value.length === 0) return 0;
    const sum = participants.value.reduce((acc, p) => acc + (parseInt(p.age) || 0), 0);
    return Math.round(sum / participants.value.length);
  });
  
  const twitchCount = computed(() => {
    return participants.value.filter(p => p.platform === 'twitch').length;
  });
  
  const youtubeCount = computed(() => {
    return participants.value.filter(p => p.platform === 'youtube').length;
  });
  
  const twitchPercentage = computed(() => {
    if (participants.value.length === 0) return 0;
    return Math.round((twitchCount.value / participants.value.length) * 100);
  });
  
  const youtubePercentage = computed(() => {
    if (participants.value.length === 0) return 0;
    return Math.round((youtubeCount.value / participants.value.length) * 100);
  });
  </script>
  
  <style scoped>
  /* Font Minecraft */
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
  
  .minecraft-font {
    font-family: 'VT323', monospace;
    letter-spacing: 1px;
  }
  
  /* Styles pour les cartes de statistiques */
  .stats-card {
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .stats-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    border-color: rgba(245, 158, 11, 0.6);
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