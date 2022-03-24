const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clienteSchema = new Schema({
  _id: Number,
  cedula_cliente: {
    type: Number,
    required: true,
    unique: true
  },
  direccion_cliente: String,
  email_cliente: String,
  nombre_cliente: String,
  telefono_cliente: String
}, {versionKey: false})

module.exports = mongoose.model('db_clientes', clienteSchema)