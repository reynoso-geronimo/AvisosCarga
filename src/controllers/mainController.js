const db = require("../database/models")
const { validationResult } = require("express-validator");
module.exports = {
    index: async (req, res) => {
        const permisos = await db.Avisos.findAll()
        return res.render("index", { permisos: permisos })
    },
    history: async (req, res) => {
        const permisosBorrados = await db.Avisos.findAll({
            paranoid: false,
            where: { deletedAt: { [db.Sequelize.Op.ne]: null } }
        });
        return res.render("history", { permisos: permisosBorrados })
    },
    newForm: (req, res) => {
        return res.render("new")
    },
    newProcess: async (req, res) => {
        const errors = validationResult(req);
   
        if (!errors.isEmpty()) {
            return res.redirect("/nuevo")
        }
        const fileNames = Array.isArray(req.body.permiso)
            ? req.body.permiso
            : [req.body.permiso];
        const files = fileNames.map((fileName) => ({
            permiso: fileName,
            localidad: req.body.localidad,
            direccion: req.body.direccion,
            proximoAviso: req.body.proximoAviso
        })

        )

        try {
            await db.Avisos.bulkCreate(files)
            return res.redirect("/")
        } catch (error) {

        }
    },
    editForm: async (req, res) => {
        try {

            const permiso = await db.Avisos.findByPk(req.params.permiso)

            return res.render("edit", { permiso: permiso })
        } catch (error) {
            console.log(error);
        }
    },
    editProcess: async (req, res) => {
        try {
            await db.Avisos.update({ ...req.body, estado: null }, { where: { id: req.params.permiso } })
        } catch (error) {
            console.log(error);
        }
        return res.redirect("/")
    },


    delete: async (req, res) => {
        try {
            await db.Avisos.destroy({ where: { id: req.params.permiso } })
        } catch (error) {
            console.log(error);
        }
        return res.redirect("/")
    },
    restore: async (req, res) => {
        try {
            await db.Avisos.restore({ where: { id: req.params.permiso } })
        } catch (error) {
            console.log(error);
        }
        return res.redirect("/")
    },


}