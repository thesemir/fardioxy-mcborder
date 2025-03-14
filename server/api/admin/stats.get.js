// server/api/admin/stats.get.js
import ParticipantSchema from "~/server/models/Participant.schema";

export default defineEventHandler(async (event) => {
    try {
      // Cette route devrait être protégée par authentification dans un cas réel
      // TODO: Ajouter un middleware d'authentification
      
      // Récupérer les statistiques depuis la base de données
      const Participant = ParticipantSchema('Participant');
      
      // Compter le nombre total de participants
      const total = await Participant.countDocuments({});
      
      // Compter le nombre de participants par statut
      const pending = await Participant.countDocuments({ status: 'pending' });
      const accepted = await Participant.countDocuments({ status: 'accepted' });
      const rejected = await Participant.countDocuments({ status: 'rejected' });
      
      return {
        stats: {
          total,
          pending,
          accepted,
          rejected
        }
      };
      
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      
      return createError({
        statusCode: 500,
        message: 'Une erreur est survenue lors de la récupération des statistiques'
      });
    }
  });