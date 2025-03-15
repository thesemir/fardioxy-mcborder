// server/api/auth/discord.ts
export default eventHandler(async (event) => {
    // Récupérer le state depuis l'URL
    const query = getQuery(event);
    
    // Préparer les paramètres d'autorisation de base avec le bon type
    const authParams: Record<string, string> = {
      // Vos autres paramètres d'autorisation peuvent être ici
    };
    
    // Ajouter le state uniquement s'il est présent dans l'URL et le convertir en string
    if (query.state) {
      authParams.state = String(query.state);
    }
    
    return defineOAuthDiscordEventHandler({
      config: {
        emailRequired: true,
        scope: ["guilds", "guilds.join"],
        authorizationParams: authParams
      },
      async onSuccess(event, { user, tokens }) {
        // Accéder à l'URL de la requête pour récupérer les paramètres
        const url = event.req.url || '';
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const state = urlParams.get('state') || '';  // Valeur par défaut si state n'existe pas
        await setUserSession(event, {
          user,
          loggedInAt: new Date(),
          secure : {
            tokens
          }
        });
        
        return sendRedirect(event, `/${state}`);
      },
      onError(event, error) {
        console.error('Erreur d\'authentification Discord:', error);
        return sendRedirect(event, '/login');
      },
    })(event);
  });