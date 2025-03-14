// server/api/participants/[id].get.js
import ParticipantSchema from "~/server/models/Participant.schema";

export default defineEventHandler(async (event) => {
    try {
      const id = event.context.params.id;
      
      if (!id) {
        return createError({
          statusCode: 400,
          message: 'ID de participant manquant'
        });
      }
      
      // Récupérer le participant depuis la base de données
      const Participant = ParticipantSchema('Participant');
      const participant = await Participant.findOne({
        $or: [
          { _id: id },
          { registrationId: id }
        ]
      }).select('-__v');
      
      if (!participant) {
        return createError({
          statusCode: 404,
          message: 'Participant non trouvé'
        });
      }
      
      // Convertir l'objet Mongoose en objet JavaScript simple
      const participantObj = participant.toObject();
      
      return {
        participant: participantObj
      };
      
    } catch (error) {
      console.error('Erreur lors de la récupération du participant:', error);
      
      return createError({
        statusCode: 500,
        message: 'Une erreur est survenue lors de la récupération du participant'
      });
    }
  });