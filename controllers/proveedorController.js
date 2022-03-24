const Proveedor = require('../models/Proveedor')

//Mostrar
const mostrar = (req, res)=>{
  let filterProveedor = req.query.search || null
  let typeFilter = req.query.type || null
  let filter = {}
  if(filterProveedor !== null){
    switch (typeFilter) {
      case 'nit_proveedor':
        filter = {nit_proveedor: filterProveedor}
        break
      case 'nombre_proveedor':
        filter = {nombre_proveedor: {'$regex': filterProveedor, '$options': 'i'}};
        break
      case 'telefono_proveedor':
          filter = {telefono_proveedor: {'$regex': filterProveedor}};
          break
      default:
        break
    }
  }
  Proveedor.find(filter, (error, proveedores)=>{
    if(error){
      return res.status(500).json({
        message: 'Error al listar proveedores'
      })
    }else{
      return res.status(200).render('proveedores', {proveedores: proveedores})
    }
  })
}

//Crear
const crear = (req,res)=>{
  let proveedor = new Proveedor({
    _id: req.body.nit,
    nit_proveedor: req.body.nit,
    nombre_proveedor: req.body.nombre,
    direccion_proveedor: req.body.direccion,
    telefono_proveedor: req.body.telefono
  })
  proveedor.save(function(error, proveedor){
    if(error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear proveedor',
        detalles_error: error
      })
    }
    res.status(201).redirect('/proveedores')
  })
}

//Editar
const editar = (req,res)=>{
  let id = req.body.id_editar
  let nombre = req.body.nombre_editar
  let nit = req.body.nit_editar
  let direccion = req.body.direccion_editar
  let telefono = req.body.telefono_editar
  Proveedor.findByIdAndUpdate(
    id,
    {
      nit_proveedor: nit,
      nombre_proveedor: nombre,
      direccion_proveedor: direccion,
      telefono_proveedor: telefono
    },
    (error, proveedor)=> {
      if(error){
        console.log(error)
        return res.status(500).json({
          message: 'Error al editar el proveedor'
        })
      }
      res.redirect('/proveedores')
  })
}

//Borrar
const borrar = (req,res)=>{
  let id = req.params.id
  Proveedor.findByIdAndRemove(
    id,
      (error, proveedor)=>{
      if(error){
        return res.status(500).json({
          message: 'Error al editar el proveedor'
        })
      }
      res.redirect('/proveedores')
  })
}

module.exports = {
  mostrar,
  crear,
  editar,
  borrar
}