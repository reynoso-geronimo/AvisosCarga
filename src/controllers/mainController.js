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
        
       try {
        await db.Avisos.create(req.body)
        return res.redirect("/")
       } catch (error) {
        
       }
    },
    editarForm: async (req, res) => {
       try {
        const permiso = await db.Avisos.findByPk(req.params.permiso) 
        console.log(permiso)
        return res.render("editar", { permiso: permiso})
       } catch (error) {
        
       }
    },
    editar: (req, res) => {
        //TODO

        return res.redirect("/")
    },


    eliminar: (req, res) => {
        const permisos = leerPermisos()
        console.log(req.params.permiso)
        db.Avisos.destroy({where:{id:req.params.permiso}})

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