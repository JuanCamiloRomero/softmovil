const express = require('express')

const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({  
  destination:(req,file,cb)=>{  
      cb(null,'./public/uploads');  
  },  
  filename:(req,file,cb)=>{  
      cb(null,file.originalname);  
  }  
});  

const uploads = multer({storage:storage});

const router = express.Router()

const clienteController = require('../controllers/clienteController')
const usuarioController = require('../controllers/usuarioController')
const proveedorController = require('../controllers/proveedorController')
const productoController = require('../controllers/productoController')
const ventaController = require('../controllers/ventaController')
const reporteController = require('../controllers/reporteController')
const indexController = require('../controllers/indexController')

//Ruta inicial - Login
router.get('/', usuarioController.login)
router.post('/', usuarioController.loginProcess)

//Ruta index
router.get('/index', indexController.mostrar)

//Ruta usuarios
router.get('/usuarios', usuarioController.mostrar)
router.post('/usuarios/crear', usuarioController.crear)
router.post('/usuarios/editar', usuarioController.editar)
router.get('/usuarios/borrar/:id', usuarioController.borrar)

//Ruta clientes
router.get('/clientes', clienteController.mostrar)
router.post('/clientes', clienteController.json)
router.post('/clientes/crear', clienteController.crear)
router.post('/clientes/editar', clienteController.editar)
router.get('/clientes/borrar/:id', clienteController.borrar)


//Ruta proveedores
router.get('/proveedores', proveedorController.mostrar)
router.post('/proveedores/crear', proveedorController.crear)
router.post('/proveedores/editar', proveedorController.editar)
router.get('/proveedores/borrar/:id', proveedorController.borrar)

//Ruta productos
router.get('/productos', productoController.mostrar)
router.post('/productos', productoController.json)
router.post('/productos/crear', uploads.single('CSV'), productoController.importCSV)
router.post('/productos/editar', productoController.editar)
router.get('/productos/borrar/:id', productoController.borrar)

//Ruta Ventas
router.get('/ventas', ventaController.mostrar)
router.post('/ventas/crear', ventaController.crear)

//Ruta Reportes
router.get('/reportesTotal', reporteController.mostrarTotal)

module.exports = router