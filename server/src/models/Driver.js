const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      //autoIncrement: true, aqui no se usa este porque el UUID 
      // genera un codigo unico por cada registro.
      defaultValue: DataTypes.UUIDV4
    },
    forename: { //nombre tal como aparece en la api
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: { // apellido tal como aparece en la api
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { //descripcion del piloto
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: { // url de la imagen
      type: DataTypes.STRING,
      allowNull: false,
    },
    nacionality: { // nacionalidad 
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: { // fecha de nacimiento
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {timestamps: false, // se usa para que no se creen las columnas created_at y updated_at
     freezeTableName: true} // para no cambiar el nombre de la tabla en la base de datos
  );
};

