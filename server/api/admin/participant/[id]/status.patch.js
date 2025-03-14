// server/api/admin/participant/[id]/status.patch.js
import ParticipantSchema from "~/server/models/Participant.schema";

export default defineEventHandler(async (event) => {
    try {
      // Cette route devrait être protégée par authentification dans un cas réel
      // TODO: Ajouter un middleware d'authentification
      
      // Récupérer l'ID du participant et les données à mettre à jour
      const id = event.context.params.id;
      const { status } = await readBody(event);
      
      // Vérifier que le statut est valide
      if (!status || !['pending', 'accepted', 'rejected'].includes(status)) {
        return createError({
          statusCode: 400,
          message: 'Statut invalide. Les statuts autorisés sont: pending, accepted, rejected'
        });
      }
      
      // Récupérer le participant depuis la base de données
      const Participant = ParticipantSchema('Participant');
      const participant = await Participant.findOne({ 
        $or: [
          { _id: id },
          { registrationId: id }
        ]
      });
      
      if (!participant) {
        return createError({
          statusCode: 404,
          message: 'Participant non trouvé'
        });
      }
      
      // Mettre à jour le statut
      participant.status = status;
      await participant.save();
      
      // Retourner le participant mis à jour
      return {
        success: true,
        message: `Statut du participant mis à jour avec succès en "${status}"`,
        participant: {
          id: participant._id,
          registrationId: participant.registrationId,
          rpName: participant.rpName,
          status: participant.status,
          updatedAt: participant.updatedAt
        }
      };
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut du participant:', error);
      
      return createError({
        statusCode: 500,
        message: 'Une erreur est survenue lors de la mise à jour du statut du participant'
      });
    }
  });