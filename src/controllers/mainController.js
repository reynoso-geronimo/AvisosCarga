const db = require("../database/models")

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
    new: (req, res) => {
        return res.render("new")
    },
    agregar: async (req, res) => {

        try {
            await db.Avisos.create(req.body)
            return res.redirect("/")
        } catch (error) {

        }
    },
    editarForm: async (req, res) => {
        try {

            const permiso = await db.Avisos.findByPk(req.params.permiso)

            return res.render("editar", { permiso: permiso })
        } catch (error) {
            console.log(error);
        }
    },
    editar: async (req, res) => {
        try {
            await db.Avisos.update({ ...req.body }, { where: { id: req.params.permiso } })
        } catch (error) {
            console.log(error);
        }
        return res.redirect("/")
    },


    eliminar: async (req, res) => {
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