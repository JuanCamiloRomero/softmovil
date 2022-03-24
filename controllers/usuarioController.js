const Usuario = require('../models/Usuario')
const Cliente = require('../models/Cliente')
const Proveedor = require('../models/Proveedor')
const Producto = require('../models/Producto')

const bcrypt = require('bcrypt')
const BCRYPT_SALT_ROUNDS = 12

//Login
const login = (req,res)=>{
  return res.render('login')
}

//Login Process
async function loginProcess (req,res){
  let usuario = req.body.usuario
  let password = req.body.password

  const account = await Usuario.findOne({ "usuario_usuario": usuario })
  
  if (!account || password !== account.password_usuario) {
    console.error('Usuario no econtrado ')
    return res.status(500).render('login', {'message': 'Usuario no encontrado'})
  }else{
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
}

//Mostrar
const mostrar = (req, res)=>{
  const filterUsuario = req.query.search || null
  const typeFilter = req.query.type || null
  let filter = {}
  if(filterUsuario !== null){
    switch (typeFilter) {
      case 'cedula_usuario':
        filter = {cedula_usuario: filterUsuario}
        break
      case 'nombre_usuario':
        filter = {nombre_usuario: {'$regex': filterUsuario, '$options': 'i'}};
        break
      case 'email_usuario':
          filter = {email_usuario: {'$regex': filterUsuario, '$options': 'i'}};
          break
      default:
        break
    }
  }
  Usuario.find(filter, (error, usuarios)=>{
    if(error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al listar usuarios',
        detalles_error: error
      })
    }else{
      return res.status(200).render('usuarios', {usuarios: usuarios})
    }
  })
}

//Crear
const crear = (req,res)=>{
  let password = bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS)
  const usuario = new Usuario({
    cedula_usuario: req.body.cedula,
    nombre_usuario: req.body.nombre,
    email_usuario: req.body.email,
    password_usuario: password,
    usuario_usuario: req.body.usuario
  })
  usuario.save(function(error, usuario){
    if(error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear usuario',
        detalles_error: error
      })
    }
    res.status(201).redirect('/usuarios')
  })
}

//Editar
const editar = (req,res)=>{
  let id = req.body.id_editar
  let nombre = req.body.nombre_editar
  let cedula = req.body.cedula_editar
  let email = req.body.email_editar
  let usuario = req.body.usuario_editar
  let password = bcrypt.hashSync(req.body.password_editar, BCRYPT_SALT_ROUNDS)
  Usuario.findByIdAndUpdate(
    id,
    {
      cedula_usuario : cedula,
      nombre_usuario : nombre,
      email_usuario : email,
      usuario_usuario : usuario,
      password_usuario : password
    },
    (error, usuario)=>{
      if(error){
        console.error(error)
        return res.status(500).json({
          message: 'Error al editar el usuario',
          detalles_error: error
        })
      }
      res.redirect('/usuarios')
    }
  )
}

//Borrar
const borrar = (req,res)=>{
  let id = req.params.id
  Usuario.findByIdAndRemove(
    id,
      (error, usuario)=>{
      if(error){
        console.error(error)
        return res.status(500).json({
          message: 'Error al editar el usuario',
          detalles_error: error
        })
      }
      res.redirect('/usuarios')
  })
}

module.exports = {
  loginProcess,
  login,
  mostrar,
  crear,
  editar,
  borrar
}