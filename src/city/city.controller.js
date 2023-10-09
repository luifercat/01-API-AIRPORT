import { validatePartialCity, validateCity } from "./city.schema.js";
import { CityService } from "./city.service.js";

const cityService = new CityService(); //instanciamos el servicio

export const findAllCities = async (req, res) => {
  try {
    const cities = await cityService.findAllCities();

    return res.status(200).json(cities);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneCity = async (req, res) => {
  try {
    //por el middleware obtiens la ciudad de la request
    const { city } = req;

    // el siguiente codigo se puso en un middleware  city.middleware.js
    //const { id } = req.params;
    //const city = await cityService.findOneCity(id);
    //  if (!city) {
    //    return res
    //      .status(400)
    //      .json({ status: "error", message: `City not found with id: ${id}` });
    //  }

    return res.status(200).json(city);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createCity = async (req, res) => {
  try {
    const { hasError, errorMessages, cityData } = validateCity(req.body);

    if (hasError) {
      return res.status(422).json({
        status: "error",
        messages: errorMessages,
      });
    }

    const city = await cityService.createCity(cityData);

    return res.status(201).json(city); //status 201 que es creado y se envia la ciudad (city)
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteCity = async (req, res) => {
  try {
    //por el middleware obtiens la ciudad de la request
    const { city } = req;

    // el siguiente codigo se puso en un middleware  city.middleware.js
    //const { id } = req.params;

    //const city = await cityService.findOneCity(id);

    //if (!city) {
    //  return res.status(404).json({
    //    status: "error",
    //    message: `City with id ${id} not found`,
    //  });
    //}
    //
    await cityService.deleteCity(city);

    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateCity = async (req, res) => {
  try {
    //por el middleware obtiens la ciudad de la request
    const { city } = req;

    //valida parcialmente los datos que se actualizaran (en passenger.schema.js)

    // const { id } = req.params;

    const { hasError, errorMessages, dataCity } = validatePartialCity(req.body);
    if (hasError) {
      return res.status(422).json({
        status: "error",
        message: errorMessages,
      });
    }

    //1. obtener el id de la ciudad a actualizar, id se trae de la ruta con req.params
    //const { id } = req.params;
    //2. buscar el pasajero que vamos a actualizar
    //const city = await cityService.findOneCity(id);
    //3. validar si el pasajero existe
    /*
    if (!city) {
      return res.status(404).json({
        status: "error",
        message: `city with id ${id} not found`,
      });
    }
    */
    //4. en caso de que exista, se procede a actualizar el pasajero
    const cityUpdated = await cityService.updateCity(city, dataCity);
    //5. retornamos el pasajero actualizado.
    return res.json(cityUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};
