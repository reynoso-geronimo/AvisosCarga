const fs = require('fs');
const path = require('path');
const db = require("../database/models")

const leerPermisos = () => JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../permisos.json"), "utf-8"))

const escribirPermisos = (permisos) => fs.writeFileSync(path.resolve(__dirname, "../../permisos.json"), JSON.stringify(permisos, null, 2))





module.exports = {
    index: async (req, res) => {
        // const permisos = leerPermisos().filter(permiso=>permiso.estado!="BAJA")
        // permisos.forEach(permiso => {
        //     permiso.proximoAviso= new Date(permiso.proximoAviso).toLocaleString("en-gb")
            
        // });
        const permisos = await db.Avisos.findAll()
        return res.render("index", { permisos: permisos })
    },
    baja: (req, res) => {
        const permisos = leerPermisos().filter(permiso=>permiso.estado=="BAJA")
        return res.render("baja", { permisos: permisos })
    },
    nuevo: (req, res) => {
        return res.render("nuevo")
    },
    agregar:async (req, res) => {
        // let nuevoPe = { ...req.body,proximoAviso:new Date(req.body.proximoAviso), ultimoAviso: null, estado: null }
        // let permisos = [...leerPermisos(), nuevoPe]

        // escribirPermisos(permisos)
        console.log(req.body)
        await db.Avisos.create(req.body)
        return res.redirect("/")
    },
    editarForm: (req, res) => {
        return res.render("editar", { permiso: leerPermisos().find(permiso => permiso.permiso == req.params.permiso) })
    },
    editar: (req, res) => {
        const permisos = leerPermisos()
        const permisoEliminar = permisos.find(permiso => permiso.permiso == req.params.permiso);
        permisoEliminar.permiso = req.body.permiso
        permisoEliminar.aduana = req.body.aduana
        permisoEliminar.localidad = req.body.localidad
        permisoEliminar.direccion = req.body.direccion
        permisoEliminar.proximoAviso = req.body.proximoAviso
        
        escribirPermisos(permisos)

        return res.redirect("/")
    },


    eliminar: (req, res) => {
        const permisos = leerPermisos()
        const permisoEliminar = permisos.find(permiso => permiso.permiso == req.params.permiso);
        permisoEliminar.estado = "BAJA"
        
        escribirPermisos(permisos)

        return res.redirect("/")
    },
    
    activar: (req, res) => {
        const permisos = leerPermisos()
        const permisoEliminar = permisos.find(permiso => permiso.permiso == req.params.permiso);
        permisoEliminar.estado = null
        
        escribirPermisos(permisos)

        return  res.redirect("/")
    },

    permisos: (req, res) => {
        const permisos = leerPermisos().filter(permiso=>permiso.estado!="BAJA")
         return res.send(permisos)
    },

}