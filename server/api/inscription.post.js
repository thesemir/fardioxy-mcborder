// server/api/inscription.post.js
export default defineEventHandler(async (event) => {
    try {
      // Récupérer les données du formulaire
      const formData = await readBody(event);
      
      // Validation des données (à personnaliser selon vos besoins)
      if (!formData.realName || !formData.discordId || !formData.minecraftUsername) {
        return createError({
          statusCode: 400,
          message: 'Informations manquantes'
        });
      }
      
      // Ici, vous pourriez enregistrer les données dans une base de données
      // Exemple avec MongoDB (nécessite le package @nuxt/mongodb):
      /*
      const { db } = useRuntimeConfig().mongodb;
      const collection = db.collection('participants');
      const result = await collection.insertOne({
        ...formData,
        createdAt: new Date(),
        status: 'pending'
      });
      const id = result.insertedId;
      */
      
      // Pour cet exemple, on simule un délai d'enregistrement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Générer un ID unique pour l'inscription
      const id = 'BL-' + Math.floor(1000 + Math.random() * 9000);
      
      // Retourner une réponse
      return {
        success: true,
        id: id,
        message: 'Inscription enregistrée avec succès',
        // Vous pouvez retourner d'autres données si nécessaire
        createdAt: new Date(),
        status: 'accepted'
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