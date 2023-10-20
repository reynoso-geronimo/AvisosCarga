const { Op } = require("sequelize");
const db = require("../database/models")
module.exports = {
  findFirstEligible: async (req, res) => {
    try {
      const currentDateAndTime = new Date();

      const foundFile = await db.Avisos.findOne({
        where: {[Op.or]: [
          {ultimoAviso: {[Op.lt]: currentDateAndTime}},
          {ultimoAviso: {[Op.is]: null}},
        ]}
      });

      if (foundFile) {

        const notice = new Date(foundFile.proximoAviso);
        
        const formattedNoticeDate = notice.toLocaleString(undefined, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        const formattedNoticeTime = notice.toLocaleString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'UTC'
        });
        const file = {
          id: foundFile.id,
          noticeDate: formattedNoticeDate,
          noticeTime: formattedNoticeTime,
          fileName: foundFile.permiso,
          customsCode: foundFile.permiso.substring(2, 5),
          city: foundFile.localidad,
          address: foundFile.direccion,

        }
        res.status(200).json({
          success: true,
          message: "Permiso encontrado",
          file: file
        });
      } else {

        res.status(200).json({
          success: false,
          message: "No se encontraron permisos para dar aviso."
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while processing the request.",
        error: error.message
      });
    }

  },
  setStatus: async (req, res) => {
    try {
      const permisoId = req.params.permiso;

      const updatedPermiso = await db.Avisos.update({ ...req.body,ultimoAviso:new Date() }, { where: { id: permisoId } });
      if (updatedPermiso[0] > 0) {

        res.status(200).json({ success: true, message: "Permiso actualizado con éxito" });
      } else {

        res.status(404).json({ success: false, message: "No se encontró el permiso con el ID proporcionado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
  }
}