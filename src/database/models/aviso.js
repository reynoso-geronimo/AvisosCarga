module.exports = (sequelize, dataTypes) => {
    let alias = "Avisos";
    let cols = {
        id: {
            type: dataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        permiso: {
            type: dataTypes.STRING
        },
        direccion: {
            type: dataTypes.STRING
        },
       
        localidad: {
            type: dataTypes.STRING
        },
       
        proximoAviso: {
            type: dataTypes.DATE
        
        },
        ultimoAviso: {
            type: dataTypes.DATE
        
        },
        estado: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: "Avisos",
        timestamps: true,
        paranoid:true
    }

    const Aviso = sequelize.define(alias, cols, config);
  

     // Aquí agrega la lógica para enviar eventos SSE
     const changeListeners = [];
    
     Aviso.addChangeListener = (listener) => {
         changeListeners.push(listener);
     }
 
     Aviso.emitChange = (change) => {
         changeListeners.forEach((listener) => {
             listener(change);
         });
     }
 
     // Observa los cambios en la base de datos y emite eventos SSE
     Aviso.afterCreate((aviso, options) => {
        console.log("Creating record");
        Aviso.emitChange({ event: "create", aviso });
    });
    Aviso.afterBulkCreate((aviso, options) => {
        console.log("Creating record");
        Aviso.emitChange({ event: "create", aviso });
    });
    Aviso.afterBulkUpdate((aviso, options) => {
        console.log("Updating record");
        Aviso.emitChange({ event: "update", aviso });
    });
    Aviso.afterUpdate((aviso, options) => {
        console.log("Updating record");
        Aviso.emitChange({ event: "update", aviso });
    });
    
    Aviso.afterBulkDestroy((aviso, options) => {
        console.log("Deleting record");
        Aviso.emitChange({ event: "delete", aviso });
    });
    Aviso.afterBulkRestore((aviso, options) => {
        console.log("Restoring record");
        Aviso.emitChange({ event: "restore", aviso });
    }) 
    return Aviso;
}