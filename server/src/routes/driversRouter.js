const { Router } = require("express");

const { createDriver, deleteDriver, getAllDrivers, getDriverById, updateDriver } = require("../controllers");



const DriverRouter = Router();
//! Rutas para la base de datos de conductores

DriverRouter.get("/", getAllDrivers);
DriverRouter.get("/name", getDriverById);
DriverRouter.post("/", createDriver);
DriverRouter.delete("/:id", deleteDriver);
DriverRouter.put("/:id", updateDriver);

module.exports = DriverRouter;