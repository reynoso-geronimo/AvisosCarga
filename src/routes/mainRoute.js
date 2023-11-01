const express = require('express');
const db = require("../database/models")
const router = express.Router()
const mainController = require('../controllers/mainController.js');
const apiController = require('../controllers/apiController.js');



// Esta parte se ajusta para enviar eventos SSE manualmente
router.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  
  // Escucha cambios en la base de datos y envía eventos SSE
  db.Avisos.addChangeListener((change) => {
  
    res.write("data: " + JSON.stringify({ event: "update", data: change }) + "\n\n");
    
  });
  
});




router.get("/", mainController.index);
router.get("/historial", mainController.history);


router.get("/nuevo",mainController.newForm)
router.post("/nuevo",mainController.newProcess)
router.get("/editar/:permiso", mainController.editForm);
router.post("/editar/:permiso", mainController.editProcess);
router.post("/eliminar/:permiso", mainController.delete);
router.get("/restore/:permiso", mainController.restore);


//api

router.get("/api/proximo", apiController.findFirstEligible)
router.post("/api/setstatus/:permiso", apiController.setStatus)

module.exports = router