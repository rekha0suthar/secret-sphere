import { Schema, model } from 'mongoose';

const secretSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Secret = model('Secret', secretSchema);

export default Secret;
