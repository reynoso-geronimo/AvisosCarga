const express = require('express');
const router = express.Router()
const mainController = require('../controllers/mainController.js');

router.get("/", mainController.index);

router.get("/nuevo",mainController.nuevo)
router.post("/nuevo",mainController.agregar)

module.exports = router