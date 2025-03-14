// models/Participant.js
export default defineMongooseModel('Participant', {
    schema: {
      // Informations réelles
      realName: {
        type: String,
        required: true,
      },
      discordId: {
        type: String,
        required: true,
      },
      minecraftUsername: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
      },
      age: {
        type: Number,
        required: true,
        min: 13,
      },
      platform: {
        type: String,
        enum: ['twitch', 'youtube'],
        default: 'twitch',
      },
      channelName: {
        type: String,
        required: false,
      },
      
      // Informations RP
      rpName: {
        type: String,
        required: true,
      },
      rpAge: {
        type: Number,
        required: true,
      },
      rpStory: {
        type: String,
        required: true,
      },
      rpConnections: {
        type: String,
        required: false,
      },
      
      // Métadonnées
      registrationId: {
        type: String,
        default: () => 'BL-' + Math.floor(1000 + Math.random() * 9000),
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    options: {
      timestamps: true,
    },
  })