import ParticipantSchema from "../models/Participant.schema";

// server/api/inscription.post.js
export default defineEventHandler(async (event) => {
    try {
      // Récupérer les données du formulaire
      const formData = await readBody(event);
      
      // Validation des données
      if (!formData.realName || !formData.discordId || !formData.minecraftUsername) {
        return createError({
          statusCode: 400,
          message: 'Informations manquantes'
        });
      }
      
      // Utiliser le modèle Mongoose
      // Dans Nuxt Mongoose, nous utilisons useModel pour accéder au modèle
      const Participant = ParticipantSchema();
      
      // Vérifier si l'utilisateur est déjà inscrit (par email ou pseudo minecraft)
      const existingParticipant = await ParticipantSchema.findOne({
        $or: [
          { email: formData.email },
          { minecraftUsername: formData.minecraftUsername }
        ]
      });
      
      if (existingParticipant) {
        return createError({
          statusCode: 409,
          message: 'Un utilisateur avec cet email ou ce pseudo Minecraft est déjà inscrit'
        });
      }
      
      // Créer un nouveau participant dans la base de données
      const participant = await ParticipantSchema.create({
        ...formData,
        status: 'accepted'  // Pour l'exemple, nous acceptons automatiquement l'inscription
      });
      
      // Retourner une réponse avec le registrationId que nous utiliserons pour la redirection
      return {
        success: true,
        id: participant.registrationId,
        message: 'Inscription enregistrée avec succès',
        createdAt: participant.createdAt,
        status: participant.status
      };
      
    } catch (error) {
      console.error('Erreur lors du traitement de l\'inscription:', error);
      
      // Gérer les erreurs et renvoyer une réponse appropriée
      return createError({
        statusCode: 500,
        message: 'Une erreur est survenue lors du traitement de votre inscription'
      });
    }
  });