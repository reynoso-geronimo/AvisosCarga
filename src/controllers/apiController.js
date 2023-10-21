const { Op } = require("sequelize");
const db = require("../database/models")
module.exports = {
  findFirstEligible: async (req, res) => {
    try {
      const expiredNotice = new Date();
      expiredNotice.setHours(expiredNotice.getHours() - 24);
      const foundFile = await db.Avisos.findOne({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  estado: "ok",
                },
                {
                  estado: null,
                },
              ],
            },
            {
              [Op.or]: [
                {
                  ultimoAviso: {
                    [Op.lt]: expiredNotice,
                  },
                },
                {
                  ultimoAviso: null,
                },
              ],
            },
          ],
        },
      });

      if (foundFile) {
        const currentDate = new Date()
        let notice = new Date(foundFile.proximoAviso);
        if (notice < currentDate) {
          notice = currentDate;
        }
        
       
        notice.setMinutes(notice.getMinutes() + 5);
        const formattedNoticeDate = notice.toLocaleString(undefined, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        
        const formattedNoticeTime = notice.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
        const file = {
          id: foundFile.id,
          notice:notice.toString(),
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
      
      const permiso =await db.Avisos.findByPk(req.params.permiso)
      if(!permiso) res.status(404).json({ success: false, message: "No se encontró el permiso con el ID proporcionado" });
      permiso.estado =req.body.estado
      if(req.body.estado==="ok"){
        permiso.ultimoAviso= new Date()
        const nextDate = new Date(req.body.notice);
        nextDate.setDate(nextDate.getDate() + 1);
        permiso.proximoAviso = new Date(nextDate)
      }
     
        await permiso.save()
        
        res.status(200).json({ success: true, message: "Permiso actualizado con éxito" });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
  }
}