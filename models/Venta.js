const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ventaSchema = new Schema({
  cedula_cliente: [{
    type: Number,
    ref: 'db_clientes'
  }],
  codigo_venta: Number,
  detalles_venta: [{}],
  total_venta: Number,
  iva_venta: Number,
  valor_total: Number
})

module.exports = mongoose.model('db_ventas', ventaSchema)