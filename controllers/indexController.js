const Usuario = require('../models/Usuario')
const Cliente = require('../models/Cliente')
const Proveedor = require('../models/Proveedor')
const Producto = require('../models/Producto')

async function mostrar (req,res){
  const usuarios = await Usuario.countDocuments({})
  const clientes = await Cliente.countDocuments({})
  const proveedores = await Proveedor.countDocuments({})
  const productos = await Producto.countDocuments({})
  return res.status(200).render('index', {
    usuarios: usuarios,
    clientes: clientes,
    proveedores: proveedores,
    productos: productos,
  })
}

module.exports = {
  mostrar
}