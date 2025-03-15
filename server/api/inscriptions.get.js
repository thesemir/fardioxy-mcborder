import ParticipantSchema from "../models/Participant.schema";

export default defineEventHandler(async (event) => {
  // Vérifier si la méthode est GET
  if (event.req.method === 'GET') {
    // Récupérer toutes les inscriptions
    const participants = await ParticipantSchema.find();

    // Retourner les données sans transformation
    return {
      success: true,
      participants,
    };
  }
  // Si la méthode n'est pas GET, ne rien faire
});
