const axios = requiere ('axios');
const { Driver, Team } = require('../db');

const getDriverById = async (id) => {
    try {
        // Verifica si el ID no es un número o es una cadena vacía
        if (isNaN(id) || id === '') {
            // Si no es un número o es una cadena vacía, busca el conductor en la base de datos
            const driver = await Driver.findByPk(id, { include: Team });
            
            // Si no se encuentra el conductor en la base de datos, lanza un error
            if (!driver) {
                throw new Error(`Driver with ID ${id} not found in the database`);
            }
            
            // Devuelve el conductor encontrado en la base de datos
            return driver;
        } else {
            // Si el ID es un número, realiza una solicitud a la API externa para obtener el conductor
            const response = await axios.get(`http://localhost:5000/drivers/${id}`); // aqui la url de la API externa.
            
            // Devuelve los datos del conductor obtenidos de la API externa
            return response.data;
        }
    } catch (error) {
        // Captura cualquier error que pueda ocurrir en el bloque try y lanza un nuevo error
        throw new Error(`Driver with ID ${id} not found`);
    }
};

module.exports = getDriverById;