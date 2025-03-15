export default defineNuxtRouteMiddleware(async (to, from) => {
    // Récupérer l'état de la session utilisateur
    const { loggedIn, user } = useUserSession();

    // Vérifier si l'utilisateur est authentifié après la récupération
    if (!loggedIn.value) {
        return navigateTo(`/auth/discord?state=dashboard`);
    }

    // Lire le JSON avec les IDs autorisés depuis le dossier 'data'
    const allowedIds = await $fetch('../data/allowed-ids.json').then(response => response.json());

    // Vérifier si l'ID de l'utilisateur est dans la liste des ID autorisés
    if (!allowedIds.allowed_ids.includes(user.value.id)) {
        return navigateTo(`/`);
    }
});
