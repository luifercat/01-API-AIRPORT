//Router es una funcionalidad que viene de express
import { Router } from "express";
import {
  findAllCities,
  createCity,
  findOneCity,
  updateCity,
  deleteCity,
} from "./city.controller.js";

import { validateExistCity } from "./city.middleware.js";

export const router = Router();

router.route("/").get(findAllCities).post(createCity);

// por el middleware usamos el validateExistCity
//podemos usar el use pero es mejor colocarlo en cada una de las rutas que se use
router
  .route("/:id")
  .get(validateExistCity, findOneCity)
  .patch(validateExistCity, updateCity)
  .delete(validateExistCity, deleteCity);
