//Router es una funcionalidad que viene de express
import { Router } from "express";

import {
  findAllFlights,
  createFlight,
  findOneFlight,
  updateFlight,
  deleteFlight,
} from "./flight.controller.js"; //siempre se debe colocar la extension del archivo

export const router = Router();

//refactorizamos el cod comentariado abajo: solo queda "/" puesto que loque va ante del / que es
// ya lo concatenamos en routes.js
router.route("/").get(findAllFlights).post(createFlight);

router
  .route("/:id")
  .get(findOneFlight)
  .patch(updateFlight)
  .delete(deleteFlight);

/*

//init features
//Rutas: donde se van a crear todos los endpoints GET(obtener) PUT POST(crear)
//endpoint 1: obtener todos los pasajeros
router.get("/passengers", findAllPassengers); //recibe un string (ruta) y un callback que recibe request y response

//endpoint 2: crear un pasajero
router.post("/passengers", createPassenger);

//edpoint 3: obtener un pasajero dado su id, cuando se coloca :id quiere decir que ese id es una variable
router.get("/passengers/:id", findOnePassenger);

//endpoint 4: actualizar la información de un pasajero
router.patch("/passengers/:id", updatePassenger);

//edpoint 5: eliminar la información de un pasajero
router.delete("/passengers/:id", deletePassenger);
//end features
*/
