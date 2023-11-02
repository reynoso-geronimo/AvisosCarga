const { check } = require("express-validator");

const regex = /^(\d{2})(\d{3})([A-Za-z]{2}\d{2})(\d{6}[A-Za-z])$/;

module.exports = {
    fileValidation: [
        check('localidad').notEmpty().withMessage('Debes completar el campo de localidad').trim().escape(),
        check('direccion').notEmpty().withMessage('Debes completar el campo de direccion').trim().escape(),
        check('proximoAviso').notEmpty().withMessage('Debes completar el campo de aviso').trim().escape(),
        check('permiso')
            .custom((value, { req }) => {
               
                if (Array.isArray(value)) {
                  
                    return value.every(entry => entry.match(regex));
                } else if (typeof value === 'string') {
                   
                    return value.match(regex);
                }
                return false; 
            })
            .withMessage('El campo permiso debe cumplir con la expresión regular.')
    ]
};