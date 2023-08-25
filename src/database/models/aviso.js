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
        aduana: {
            type: dataTypes.TINYINT
        },
        localidad: {
            type: dataTypes.STRING
        },
        direccion: {
            type: dataTypes.STRING
        },
        proximoAviso: {
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

    

    return Aviso;
}