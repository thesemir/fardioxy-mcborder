// server/api/admin/participants.get.js
export default defineEventHandler(async (event) => {
    try {
      // Cette route devrait être protégée par authentification dans un cas réel
      // TODO: Ajouter un middleware d'authentification
      
      // Récupérer les participants depuis la base de données
      const Participant = useModel('Participant');
      
      // Récupérer tous les participants (avec pagination basique)
      const page = parseInt(getQuery(event).page) || 1;
      const limit = parseInt(getQuery(event).limit) || 10;
      const skip = (page - 1) * limit;
      
      // Requête avec projection pour exclure certains champs sensibles
      const participants = await Participant.find({})
        .select('-__v')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      const total = await Participant.countDocuments({});
      
      return {
        participants,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      };
      
    } catch (error) {
      console.error('Erreur lors de la récupération des participants:', error);
      
      return createError({
        statusCode: 500,
        message: 'Une erreur est survenue lors de la récupération des participants'
      });
    }
  });