<template>
    <div class="pt-20 min-h-screen relative bg-gray-900">
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
        <!-- Login Form -->
        <div v-if="!isAuthenticated" class="max-w-md mx-auto bg-gray-800/90 backdrop-blur-sm rounded-lg border-2 border-amber-600/50 p-8 login-container">
          <h2 class="text-3xl font-bold mb-6 text-amber-500 minecraft-font text-center">Zone d'Administration</h2>
          
          <form @submit.prevent="login" class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2 text-amber-200">Mot de passe d'administration</label>
              <input 
                type="password" 
                v-model="password"
                class="w-full bg-gray-900/80 border-2 border-amber-700/50 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500"
                placeholder="Mot de passe"
                required
              >
              <p v-if="loginError" class="mt-2 text-red-400 text-sm">{{ loginError }}</p>
            </div>
            
            <button 
              type="submit"
              class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors focus:outline-none"
            >
              Connexion
            </button>
          </form>
        </div>
        
        <!-- Admin Dashboard -->
        <div v-else class="admin-dashboard">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold text-amber-500 minecraft-font">Tableau de Bord</h2>
            <button 
              @click="logout"
              class="bg-gray-800 hover:bg-gray-700 text-amber-200 font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none border border-amber-700/30"
            >
              Déconnexion
            </button>
          </div>
          
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-amber-600/30 p-6">
              <h3 class="text-xl font-medium text-amber-300 mb-2">Total Inscrits</h3>
              <p class="text-3xl font-bold text-white">{{ stats.total || 0 }}</p>
            </div>
            
            <div class="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-green-600/30 p-6">
              <h3 class="text-xl font-medium text-green-300 mb-2">Acceptés</h3>
              <p class="text-3xl font-bold text-white">{{ stats.accepted || 0 }}</p>
            </div>
            
            <div class="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-red-600/30 p-6">
              <h3 class="text-xl font-medium text-red-300 mb-2">En attente</h3>
              <p class="text-3xl font-bold text-white">{{ stats.pending || 0 }}</p>
            </div>
          </div>
          
          <!-- Filters -->
          <div class="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-amber-600/30 p-4 mb-6">
            <div class="flex flex-wrap gap-4 items-center">
              <div class="flex-grow">
                <input 
                  type="text" 
                  v-model="searchTerm"
                  @input="debouncedSearch"
                  class="w-full bg-gray-900/80 border border-amber-700/50 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500"
                  placeholder="Rechercher par nom, email, discord..."
                >
              </div>
              
              <div class="flex items-center space-x-4">
                <label class="text-amber-200 text-sm font-medium">Statut:</label>
                <select 
                  v-model="statusFilter"
                  @change="fetchParticipants"
                  class="bg-gray-900/80 border border-amber-700/50 rounded-lg px-3 py-2 focus:border-amber-500 focus:outline-none text-white focus:ring-1 focus:ring-amber-500"
                >
                  <option value="">Tous</option>
                  <option value="pending">En attente</option>
                  <option value="accepted">Acceptés</option>
                  <option value="rejected">Refusés</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Participants Table -->
          <div class="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-amber-600/30 p-4 overflow-hidden mb-6">
            <div v-if="isLoading" class="flex justify-center items-center h-32">
              <div class="loader"></div>
            </div>
            
            <div v-else-if="participants.length === 0" class="text-center py-8 text-amber-200">
              Aucun participant trouvé avec ces critères.
            </div>
            
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-amber-600/20">
                <thead>
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">ID / Numéro</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">Nom RP</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">Minecraft</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">Discord</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">Statut</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-amber-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-gray-900/40 divide-y divide-amber-600/10">
                  <tr v-for="(participant, index) in participants" :key="participant._id" class="hover:bg-gray-800/60 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-200 font-mono">{{ participant.registrationId }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-100">{{ participant.rpName }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-100">{{ participant.minecraftUsername }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-100">{{ participant.discordId }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        class="px-2 py-1 text-xs font-medium rounded-full" 
                        :class="{
                          'bg-yellow-800/50 text-yellow-300': participant.status === 'pending',
                          'bg-green-800/50 text-green-300': participant.status === 'accepted',
                          'bg-red-800/50 text-red-300': participant.status === 'rejected'
                        }"
                      >
                        {{ getStatusLabel(participant.status) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-100">
                      <div class="flex space-x-2">
                        <button 
                          @click="showDetails(participant)"
                          class="bg-amber-700/50 hover:bg-amber-700 text-amber-100 px-2 py-1 rounded text-xs font-medium"
                        >
                          Détails
                        </button>
                        <button 
                          v-if="participant.status !== 'accepted'"
                          @click="updateStatus(participant._id, 'accepted')"
                          class="bg-green-700/50 hover:bg-green-700 text-green-100 px-2 py-1 rounded text-xs font-medium"
                        >
                          Accepter
                        </button>
                        <button 
                          v-if="participant.status !== 'rejected'"
                          @click="updateStatus(participant._id, 'rejected')"
                          class="bg-red-700/50 hover:bg-red-700 text-red-100 px-2 py-1 rounded text-xs font-medium"
                        >
                          Refuser
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <!-- Pagination -->
          <div v-if="pagination.pages > 1" class="flex justify-center space-x-2 mt-8">
            <button 
              v-for="page in pagination.pages" 
              :key="page"
              @click="changePage(page)"
              class="px-3 py-1 rounded text-sm font-medium transition-colors"
              :class="page === pagination.currentPage 
                ? 'bg-amber-600 text-white' 
                : 'bg-gray-800 text-amber-300 hover:bg-gray-700'"
            >
              {{ page }}
            </button>
          </div>
        </div>
        
        <!-- Participant Details Modal -->
        <div v-if="selectedParticipant" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="selectedParticipant = null"></div>
          <div class="bg-gray-800 border-2 border-amber-600/50 rounded-lg p-6 w-full max-w-3xl z-10 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-2xl font-bold text-amber-500">Détails du Participant</h3>
              <button @click="selectedParticipant = null" class="text-gray-400 hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-lg font-medium text-amber-400 mb-2 border-b border-amber-600/20 pb-1">Informations IRL</h4>
                <dl class="space-y-2">
                  <div>
                    <dt class="text-sm font-medium text-amber-300">Nom</dt>
                    <dd class="text-white">{{ selectedParticipant.realName }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-amber-300">Discord</dt>
                    <dd class="text-white">{{ selectedParticipant.discordId }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-amber-300">Email</dt>
                    <dd class="text-white">{{ selectedParticipant.email }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-amber-300">Âge</dt>
                    <dd class="text-white">{{ selectedParticipant.age }} ans</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-amber-300">Minecraft</dt>
                    <dd class="text-white">{{ selectedParticipant.minecraftUsername }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-amber-300">Plateforme</dt>
                    <dd class="text-white">{{ selectedParticipant.platform }}: {{ selectedParticipant.channelName }}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h4 class="text-lg font-medium text-amber-400 mb-2 border-b border-amber-600/20 pb-1">Informations RP</h4>
                <dl class="space-y-2">
                  <div>
                    <dt class="text-sm font-medium text-amber-300">Nom RP</dt>
                    <dd class="text-white">{{ selectedParticipant.rpName }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-amber-300">Âge RP</dt>
                    <dd class="text-white">{{ selectedParticipant.rpAge }} ans</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-amber-300">Histoire</dt>
                    <dd class="text-white text-sm bg-gray-900/50 p-3 rounded mt-1 max-h-40 overflow-y-auto">{{ selectedParticipant.rpStory }}</dd>
                  </div>
                  <div v-if="selectedParticipant.rpConnections">
                    <dt class="text-sm font-medium text-amber-300">Connexions</dt>
                    <dd class="text-white text-sm bg-gray-900/50 p-3 rounded mt-1 max-h-24 overflow-y-auto">{{ selectedParticipant.rpConnections }}</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div class="mt-6 border-t border-amber-600/20 pt-4">
              <h4 class="text-lg font-medium text-amber-400 mb-2">Métadonnées</h4>
              <dl class="grid grid-cols-2 gap-4">
                <div>
                  <dt class="text-sm font-medium text-amber-300">ID d'inscription</dt>
                  <dd class="text-white font-mono">{{ selectedParticipant.registrationId }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-amber-300">Date d'inscription</dt>
                  <dd class="text-white">{{ formatDate(selectedParticipant.createdAt) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-amber-300">Statut</dt>
                  <dd class="text-white">
                    <span 
                      class="px-2 py-1 text-xs font-medium rounded-full" 
                      :class="{
                        'bg-yellow-800/50 text-yellow-300': selectedParticipant.status === 'pending',
                        'bg-green-800/50 text-green-300': selectedParticipant.status === 'accepted',
                        'bg-red-800/50 text-red-300': selectedParticipant.status === 'rejected'
                      }"
                    >
                      {{ getStatusLabel(selectedParticipant.status) }}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
            
            <div class="mt-6 flex justify-end space-x-3">
              <button 
                v-if="selectedParticipant.status !== 'accepted'"
                @click="updateStatus(selectedParticipant._id, 'accepted')"
                class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                Accepter
              </button>
              <button 
                v-if="selectedParticipant.status !== 'rejected'"
                @click="updateStatus(selectedParticipant._id, 'rejected')"
                class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                Refuser
              </button>
              <button 
                v-if="selectedParticipant.status !== 'pending'"
                @click="updateStatus(selectedParticipant._id, 'pending')"
                class="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                Mettre en attente
              </button>
              <button 
                @click="selectedParticipant = null"
                class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  
  // États
  const isAuthenticated = ref(false);
  const password = ref('');
  const loginError = ref('');
  const adminPassword = 'borderland2025'; // Mot de passe simple pour cet exemple
  
  // Participants
  const participants = ref([]);
  const selectedParticipant = ref(null);
  const isLoading = ref(false);
  const searchTerm = ref('');
  const statusFilter = ref('');
  const searchTimeout = ref(null);
  
  // Pagination
  const pagination = ref({
    currentPage: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  
  // Statistiques
  const stats = ref({
    total: 0,
    accepted: 0,
    pending: 0,
    rejected: 0
  });
  
  // Fonctions d'authentification
  const login = () => {
    if (password.value === adminPassword) {
      isAuthenticated.value = true;
      localStorage.setItem('admin_authenticated', 'true');
      fetchParticipants();
      fetchStats();
    } else {
      loginError.value = 'Mot de passe incorrect';
    }
  };
  
  const logout = () => {
    isAuthenticated.value = false;
    localStorage.removeItem('admin_authenticated');
  };
  
  // Fonction pour récupérer les participants
  const fetchParticipants = async () => {
    try {
      isLoading.value = true;
      const query = {
        page: pagination.value.currentPage,
        limit: pagination.value.limit
      };
      
      if (searchTerm.value) {
        query.search = searchTerm.value;
      }
      
      if (statusFilter.value) {
        query.status = statusFilter.value;
      }
      
      const response = await $fetch('/api/admin/participants', {
        method: 'GET',
        query
      });
      
      participants.value = response.participants;
      pagination.value = response.pagination;
      
      isLoading.value = false;
    } catch (error) {
      console.error('Erreur lors de la récupération des participants:', error);
      isLoading.value = false;
    }
  };
  
  // Fonction pour récupérer les statistiques
  const fetchStats = async () => {
    try {
      const response = await $fetch('/api/admin/stats', {
        method: 'GET'
      });
      
      stats.value = response.stats;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
    }
  };
  
  // Fonction pour mettre à jour le statut d'un participant
  const updateStatus = async (id, status) => {
    try {
      await $fetch(`/api/admin/participant/${id}/status`, {
        method: 'PATCH',
        body: { status }
      });
      
      // Mettre à jour le participant sélectionné si nécessaire
      if (selectedParticipant.value && selectedParticipant.value._id === id) {
        selectedParticipant.value.status = status;
      }
      
      // Mettre à jour la liste des participants
      fetchParticipants();
      fetchStats();
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };
  
  // Fonctions utilitaires
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Accepté';
      case 'rejected': return 'Refusé';
      default: return status;
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const showDetails = (participant) => {
    selectedParticipant.value = { ...participant };
  };
  
  const changePage = (page) => {
    pagination.value.currentPage = page;
    fetchParticipants();
  };
  
  const debouncedSearch = () => {
    clearTimeout(searchTimeout.value);
    searchTimeout.value = setTimeout(() => {
      pagination.value.currentPage = 1;
      fetchParticipants();
    }, 300);
  };
  
  // Vérifier l'authentification au chargement
  onMounted(() => {
    const authenticated = localStorage.getItem('admin_authenticated');
    if (authenticated === 'true') {
      isAuthenticated.value = true;
      fetchParticipants();
      fetchStats();
    }
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
      linear-gradient(to right, rgba(245, 158, 11, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(245, 158, 11, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: gridMove 40s linear infinite;
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
    background: radial-gradient(circle at 50% 10%, rgba(245, 158, 11, 0.15), transparent 70%);
    animation: lightPulse 15s infinite;
    z-index: 1;
  }
  
  @keyframes lightPulse {
    0%, 100% {
      opacity: 0.15;
      transform: scale(1);
    }
    50% {
      opacity: 0.2;
      transform: scale(1.1);
    }
  }
  
  /* Animation du conteneur de login */
  .login-container {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease forwards;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Animation du dashboard */
  .admin-dashboard {
    opacity: 0;
    animation: fadeIn 0.6s ease forwards;
  }
  
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  
  /* Loader */
  .loader {
    border: 5px solid rgba(245, 158, 11, 0.2);
    border-radius: 50%;
    border-top: 5px solid rgba(245, 158, 11, 0.8);
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>