const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productoSchema = new Schema({
  codigo_producto: Number,
  nombre_producto: String,
  proveedor: [{
    type: Number,
    ref: 'db_proveedores'
  }],
  precio_compra: String,
  iva_compra: String,
  precio_venta: String
}, {versionKey: false})

module.exports = mongoose.model('db_productos', productoSchema)