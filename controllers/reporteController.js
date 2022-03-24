const Venta = require('../models/Venta')
const Cliente = require('../models/Cliente')

const mostrarTotal = (req,res)=>{
  const filterUsuario = req.query.search || null
  let filter = {};
  if(filterUsuario !== null){
    filter = {'cedula_cliente': filterUsuario}
  }
  Venta.find(filter)
    .sort({codigo_venta: -1})
    .populate('cedula_cliente')
    .exec(function (error, ventas) {
      if(error){
        console.error(error)
        return res.status(500).json({
          message: 'Error al listar ventas',
          detalles_error: error
        })
      }else{
        return res.status(200).render('reporteTotal', {ventas: ventas})
      }
    })
}

module.exports = {
  mostrarTotal
}