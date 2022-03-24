const Venta = require('../models/Venta')

const mostrar = (req,res)=>{
  let filter = {};
  Venta.find(filter, {codigo_venta: 1})
    .sort({codigo_venta: -1})
    .limit(1)
    .exec(function (error, ventas) {
      if(error){
        console.error(error)
        return res.status(500).json({
          message: 'Error al listar ventas',
          detalles_error: error
        })
      }else{
        console.log(ventas)
        return res.status(200).render('ventas', {ventas: ventas})
      }
    })
}

const crear = (req,res)=>{
  const codigo_venta = req.body.codigoVenta
  const cedula_cliente = req.body.cedulaCliente
  const iva_venta = req.body.ivaVenta
  const total_venta = req.body.totalVenta
  const valor_venta = req.body.valorVenta

  const codp1 = req.body.codp1
  const canp1 = req.body.canp1
  const valp1 = req.body.valp1
  
  const codp2 = req.body.codp2
  const canp2 = req.body.canp2
  const valp2 = req.body.valp2

  const codp3 = req.body.codp3
  const canp3 = req.body.canp3
  const valp3 = req.body.valp3
  
  let venta = new Venta({
    cedula_cliente: cedula_cliente,
    codigo_venta: codigo_venta,
    detalles_venta: [
      {
        codigo_producto: codp1,
        cantidad_producto: canp1,
        total_venta: valp1,
        valor_iva: valp1,
        valor_total: valp1,
      },
      {
        codigo_producto: codp2,
        cantidad_producto: canp2,
        total_venta: valp2,
        valor_iva: valp2,
        valor_total: valp2,
      },
      {
        codigo_producto: codp3,
        cantidad_producto: canp3,
        total_venta: valp3,
        valor_iva: valp3,
        valor_total: valp3,
      }
    ],
    total_venta: total_venta,
    iva_venta: iva_venta,
    valor_total: valor_venta
  })
  venta.save(function(error, ventas){
    if(error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear ventas',
        detalles_error: error
      })
    }
    res.status(201).redirect('/ventas')
  })

}

module.exports = {
  mostrar,
  crear
}