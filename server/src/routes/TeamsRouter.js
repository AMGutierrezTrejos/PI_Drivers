const {Router} = require('express');

const getAllTeams = require('../controllers/getAllTeams');

const TeamsRouter = Router();

// Rutas para la base de datos de teams
TeamsRouter.get("/", getAllTeams);


module.exports = TeamsRouter;