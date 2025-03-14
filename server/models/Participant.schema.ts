// server/models/Participant.schema.ts
import { defineMongooseModel } from '#nuxt/mongoose'
import mongoose from 'mongoose'

export default defineMongooseModel({
  name: 'Participant',
  schema: {
    // Informations réelles
    realName: String,
    discordId: String,
    minecraftUsername: String,
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/
    },
    age: {
      type: Number,
      min: 13
    },
    platform: {
      type: String,
      enum: ['twitch', 'youtube'],
      default: 'twitch'
    },
    channelName: String,
    
    // Informations RP
    rpName: String,
    rpAge: Number,
    rpStory: String,
    rpConnections: String,
    
    // Métadonnées
    registrationId: {
      type: String,
      default: function() {
        return 'BL-' + Math.floor(1000 + Math.random() * 9000);
      }
    }
  },
  schemaOptions: {
    timestamps: true  // This will automatically create createdAt and updatedAt fields
  }
})