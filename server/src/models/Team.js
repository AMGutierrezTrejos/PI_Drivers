const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Team', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        //autoIncrement: true, aqui no se usa este porque el UUID 
        // genera un codigo unico por cada registro.
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {timestamps: false, // se usa para que no se creen las columnas created_at y updated_at
    freezeTableName: true} // para no cambiar el nombre de la tabla en la base de datos
 );
};