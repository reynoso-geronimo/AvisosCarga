const express = require('express');
const router = express.Router()
const mainController = require('../controllers/mainController.js');

router.get("/", mainController.index);
router.get("/baja", mainController.baja);

router.get("/nuevo",mainController.nuevo)
router.post("/nuevo",mainController.agregar)
router.get("/editar/:permiso", mainController.editarForm);
router.post("/editar/:permiso", mainController.editar);
router.post("/eliminar/:permiso", mainController.eliminar);
router.post("/activar/:permiso", mainController.activar);


router.get("/permisos", mainController.permisos);

module.exports = router