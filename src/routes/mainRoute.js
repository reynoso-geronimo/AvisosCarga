const express = require('express');
const router = express.Router()
const mainController = require('../controllers/mainController.js');
const apiController = require('../controllers/apiController.js');

router.get("/", mainController.index);
router.get("/baja", mainController.baja);

router.get("/nuevo",mainController.nuevo)
router.post("/nuevo",mainController.agregar)
router.get("/editar/:permiso", mainController.editarForm);
router.post("/editar/:permiso", mainController.editar);
router.post("/eliminar/:permiso", mainController.eliminar);
router.post("/activar/:permiso", mainController.activar);


router.get("/permisos", mainController.permisos);


//api

router.get("/api/proximo", apiController.proximo)

module.exports = router