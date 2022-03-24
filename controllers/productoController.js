const Producto = require('../models/Producto')
const csv = require('csvtojson')
//Mostrar
const mostrar = (req, res)=>{
  let filterProducto = req.query.search || null
  let typeFilter = req.query.type || null
  let filter = {}
  if(filterProducto !== null){
    switch (typeFilter) {
      case 'nombre_producto':
        filter = {nombre_producto: {'$regex': filterProducto, '$options': 'i'}};
        break
      case 'codigo_producto':
        filter = {codigo_producto: filterProducto}
        break
      default:
        break
    }
  }
  Producto.find(filter)
    .populate('proveedor')
    .exec(function (error, productos) {
      if(error){
        console.error(error)
        return res.status(500).json({
          message: 'Error al listar productos',
          detalles_error: error
        })
      }else{
        return res.status(200).render('productos', {productos: productos})
      }
    })
}

//Crear
const crear = (req,res)=>{
  let producto = new Producto({
    codigo_producto: req.body.codigo,
    nombre_producto: req.body.nombre,
    proveedor: req.body.proveedor,
    precio_compra: req.body.precio_compra,
    iva_compra: req.body.iva_compra,
    precio_venta: req.body.precio_venta
  })
  producto.save(function(error, producto){
    if(error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear producto',
        detalles_error: error
      })
    }
    res.status(201).redirect('/productos')
  })
}

//CSV
const importCSV = (req,res)=>{
  let temp ;  
  csv()  
  .fromFile(req.file.path)  
  .then((jsonObj)=>{  
      //console.log(jsonObj);  
      for(let x=0;x<jsonObj;x++){  
          temp = parseFloat(jsonObj[x].codigo_producto)  
          jsonObj[x].codigo_producto = temp;  
          temp = parseFloat(jsonObj[x].proveedor)  
          jsonObj[x].proveedor = temp;    
      } 
      Producto.insertMany(jsonObj,(err,data)=>{  
        if(err){  
            console.log(err);  
        }else{  
            res.redirect('/productos');  
        }  
      });  
    });   
}

//Editar
const editar = (req,res)=>{
  let id = req.body.id_editar
  let codigo = req.body.codigo_editar
  let nombre = req.body.nombre_editar
  let proveedor = req.body.proveedor_editar
  let precio_compra = req.body.precio_compra_editar
  let iva = req.body.iva_editar
  let precio_venta = req.body.precio_venta_editar
  Producto.findByIdAndUpdate(
    id,
    {
      codigo_producto: codigo,
      nombre_producto: nombre,
      proveedor: proveedor,
      precio_compra: precio_compra,
      iva_compra: iva,
      precio_venta: precio_venta
    },
    (error, producto)=> {
      if(error){
        console.error(error)
        return res.status(500).json({
          message: 'Error al editar el producto',
          detalles_error: error
        })
      }
      res.redirect('/productos')
  })
}

//Borrar
const borrar = (req,res)=>{
  let id = req.params.id
  Producto.findByIdAndRemove(
    id,
      (error, producto)=>{
      if(error){
        console.error(error)
        return res.status(500).json({
          message: 'Error al editar el producto',
          detalles_error: error
        })
      }
      res.redirect('/productos')
  })
}

//Return JSON
const json = (req, res)=>{
  let filterProdcuto = req.query.search || null
  let filter = {}
  if(filterProdcuto !== null){
    filter = {codigo_producto: filterProdcuto}
  }
  Producto.find(filter, (error, productos)=>{
    if(error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al listar productos',
        detalles_error: error
      })
    }else{
      return res.status(200).json({productos: productos})
    }
  })
}

module.exports = {
  mostrar,
  crear,
  importCSV,
  editar,
  borrar,
  json
}