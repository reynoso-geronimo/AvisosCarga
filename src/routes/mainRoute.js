const express = require('express');
const router = express.Router()
const mainController = require('../controllers/mainController.js');
const apiController = require('../controllers/apiController.js');

router.get("/", mainController.index);
router.get("/historial", mainController.history);


router.get("/nuevo",mainController.new)
router.post("/nuevo",mainController.agregar)
router.get("/editar/:permiso", mainController.editarForm);
router.post("/editar/:permiso", mainController.editar);
router.post("/eliminar/:permiso", mainController.eliminar);
router.get("/restore/:permiso", mainController.restore);





//api

router.get("/api/proximo", apiController.findFirstEligible)
router.post("/api/setstatus/:permiso", apiController.setStatus)

module.exports = router