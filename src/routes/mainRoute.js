const express = require('express');
const db = require("../database/models")
const router = express.Router()
const mainController = require('../controllers/mainController.js');
const apiController = require('../controllers/apiController.js');

function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(facts)}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

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