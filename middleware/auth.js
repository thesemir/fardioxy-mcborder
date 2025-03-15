// middleware/auth.js
export default defineNuxtRouteMiddleware(async (to, from) => {
    // Récupérer l'état de la session utilisateur
    const { loggedIn, user } = useUserSession();
    
    // Vérifier si l'utilisateur est authentifié
    if (!loggedIn.value) {
      // Récupérer la route actuelle pour la redirection après connexion
      const redirect = to.path === '/' ? 'dashboard' : to.path.replace('/', '');
      
      // Rediriger vers l'authentification Discord avec le paramètre de redirection
      return navigateTo(`/auth/discord?state=${redirect}`);
    }
    
    // Charger les IDs autorisés depuis le fichier JSON
    const { data: allowedIdsData } = await useFetch('/api/allowedIds');
    
    // Vérifier si les données ont été correctement chargées
    if (!allowedIdsData.value || !allowedIdsData.value.allowed_ids) {
      console.error('Erreur: Impossible de charger les IDs autorisés');
      return navigateTo('/access-denied');
    }
    
    // Vérifier si l'ID de l'utilisateur est dans la liste des IDs autorisés
    if (!allowedIdsData.value.allowed_ids.includes(user.value.id)) {
      console.warn(`Accès refusé pour l'utilisateur ${user.value.id}`);
      return navigateTo('/access-denied');
    }
    
    // Si tout est correct, continuer la navigation
    console.log(`Accès autorisé pour l'utilisateur ${user.value.id}`);
  });