// server/api/admin/auth.post.js
import config from '../../config.json';

export default defineEventHandler(async (event) => {
  try {
    // Récupérer le mot de passe soumis
    const { password } = await readBody(event);
    
    // Vérifier si le mot de passe correspond
    if (!password || password !== config.adminPassword) {
      return {
        success: false,
        message: 'Authentification échouée'
      };
    }
    
    // Si le mot de passe est correct, retourner succès
    return {
      success: true,
      message: 'Authentification réussie'
    };
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    
    return {
      success: false,
      message: 'Une erreur est survenue lors de l\'authentification'
    };
  }
});