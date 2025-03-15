import ParticipantSchema from "../models/Participant.schema";

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
      
      // Validation de l'email (si présent dans formData)
      if (formData.email) {
        // Expression régulière pour la validation d'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          return createError({
            statusCode: 400,
            message: 'Format d\'email invalide'
          });
        }
      }
      
      // Utiliser le modèle Mongoose
      const Participant = ParticipantSchema;
      
      // Vérifier si l'utilisateur est déjà inscrit (par email, pseudo Minecraft ou ID Discord)
      const existingParticipant = await Participant.findOne({
        $or: [
          { email: formData.email },
          { minecraftUsername: formData.minecraftUsername },
          { discordId: formData.discordId }
        ]
      });
      
      if (existingParticipant) {
        return createError({
          statusCode: 409,
          message: 'Un utilisateur avec cet email, ce pseudo Minecraft ou cet ID Discord est déjà inscrit'
        });
      }
      
      // Créer un nouveau participant dans la base de données
      const participant = await Participant.create({
        ...formData
      });
      
      // Retourner une réponse avec le registrationId que nous utiliserons pour la redirection
      return {
        success: true,
        id: participant.registrationId,
        message: 'Inscription enregistrée avec succès',
        createdAt: participant.createdAt
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