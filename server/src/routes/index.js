const { Router } = require("express");

const driversRouter = require("./driversRouter");
const teamsRouter = require("./TeamsRouter");

// Rutas para la base de datos de drivers y teams
const router = Router();
router.use("/drivers", driversRouter);
router.use("/teams", teamsRouter);



module.exports = router;
