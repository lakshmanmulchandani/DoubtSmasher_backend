import { Schema, model } from 'mongoose';
// Use the reference to this model in other models
const topicSchema = new Schema({
  name: {
    type: 'string',
    required: true
  },
  description: String,
});

const Topic = model('Topic', topicSchema);

export default Topic;
