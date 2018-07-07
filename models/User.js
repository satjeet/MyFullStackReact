const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// o podria usar const {Schema}=mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

//si ya existe, no la sobreescrbira, y si no existe, la creara
mongoose.model('users', userSchema);
