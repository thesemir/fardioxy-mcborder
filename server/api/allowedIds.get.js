// server/api/allowedIds.get.js
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);
    
    // Rediriger si non connecté
    if (!session || !session.user) {
      return createError({
        statusCode: 401,
        message: 'Non autorisé - Veuillez vous connecter'
      });
    }
    // Chemin vers le fichier JSON des IDs autorisés
    const allowedIdsPath = path.resolve(process.cwd(), 'data/allowed-ids.json');
    
    // Lire le fichier
    const fileContent = await fs.promises.readFile(allowedIdsPath, 'utf-8');
    const allowedIds = JSON.parse(fileContent);
    
    // Retourner les données
    return allowedIds;
  } catch (error) {
    console.error('Erreur lors de la récupération des IDs autorisés:', error);
    
    return createError({
      statusCode: 500,
      message: 'Erreur lors de la récupération des IDs autorisés'
    });
  }
});