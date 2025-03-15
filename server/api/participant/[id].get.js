// server/api/participant/[id].get.js

import ParticipantSchema from "../../models/Participant.schema";
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification
    const session = await getUserSession(event);
    
    // Rediriger si non connecté
    if (!session || !session.user) {
      return createError({
        statusCode: 401,
        message: 'Non autorisé - Veuillez vous connecter'
      });
    }
    
    // Lire le JSON avec les IDs autorisés
    const allowedIdsPath = path.resolve(process.cwd(), 'data/allowed-ids.json');
    const fileContent = await fs.promises.readFile(allowedIdsPath, 'utf-8');
    const allowedIds = JSON.parse(fileContent).allowed_ids;
    
    // Vérifier si l'ID de l'utilisateur est dans la liste des ID autorisés
    if (!allowedIds.includes(session.user.id)) {
      return createError({
        statusCode: 403,
        message: 'Accès refusé - Vous n\'avez pas les permissions nécessaires'
      });
    }
    
    // Récupérer l'ID du participant depuis les paramètres de route
    const participantId = getRouterParam(event, 'id');
    
    if (!participantId) {
      return createError({
        statusCode: 400,
        message: 'ID de participant manquant'
      });
    }
    
    // Récupérer le participant par son ID
    const participant = await ParticipantSchema.findById(participantId);
    
    if (!participant) {
      return createError({
        statusCode: 404,
        message: 'Participant non trouvé'
      });
    }
    
    // Retourner les données du participant
    return {
      success: true,
      participant
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du participant:', error);
    
    return createError({
      statusCode: 500,
      message: 'Erreur lors de la récupération du participant: ' + error.message
    });
  }
});