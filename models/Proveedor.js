const mongoose = require('mongoose')
const Schema = mongoose.Schema

const proveedorSchema = new Schema({
  _id: Number,
  nit_proveedor: {
    type: Number,
    required: true,
    unique: 'El NIT no puede repetirse'
  },
  nombre_proveedor: String,
  direccion_proveedor: String,
  telefono_proveedor: String,
  }, {versionKey: false})

module.exports = mongoose.model('db_proveedores', proveedorSchema)