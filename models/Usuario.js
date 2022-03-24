const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  cedula_usuario: Number,
  nombre_usuario: String,
  email_usuario: String,
  usuario_usuario: String,
  password_usuario: String
}, {versionKey: false})

module.exports = mongoose.model('db_usuarios', userSchema)