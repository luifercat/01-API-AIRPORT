import {
  validatePartialPassenger,
  validatePassenger,
} from "./passengers.schema.js";
import { PassengerService } from "./passengers.service.js";

const passengerService = new PassengerService();

//callback segundo parametro de la ruta (en passengers.route.js)
//el objeto json lo uasmos para recibir inf del cliente
//todo lo que requiere el cliente va por el req (require)
export const findAllPassengers = async (req, res) => {
  try {
    const passengers = await passengerService.findAllPassengers();
    return res.json(passengers);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//endpoint: crea pasajero
//la constante passenger guarda el pasagero que se va a crear
// en passengerService es donde se crea el pasajero
// con res. damos la respuesta del error
export const createPassenger = async (req, res) => {
  try {
    const { hasError, errorMessages, passengerData } = validatePassenger(
      req.body
    );

    if (hasError) {
      return res.status(422).json({
        status: "error",
        message: errorMessages,
      });
    }

    const passenger = await passengerService.createPassenger(passengerData);
    return res.status(201).json(passenger);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//endpoint: busca un pasajero
//por req.params se reciben las variables que vienen por la ruta
export const findOnePassenger = async (req, res) => {
  try {
    const { id } = req.params;

    const passenger = await passengerService.findOnePassenger(id);

    if (!passenger) {
      return res.status(404).json({
        status: "error",
        message: `Passenger with id: ${id} not found`,
      });
    }
    return res.json(passenger);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//endpoint: actualizar un pasajero
export const updatePassenger = async (req, res) => {
  try {
    //valida parcialmente los datos que se actualizaran (en passenger.schema.js)
    const { hasError, errorMessages, passengerData } = validatePartialPassenger(
      req.body
    );
    if (hasError) {
      return res.status(422).json({
        status: "error",
        message: errorMessages,
      });
    }

    //1. obtener el id del pasajero a actualizar, id se trae de la ruta con req.params
    const { id } = req.params;
    //2. buscar el pasajero que vamos a actualizar
    const passenger = await passengerService.findOnePassenger(id);
    //3. validar si el pasajero existe
    if (!passenger) {
      return res.status(404).json({
        status: "error",
        message: `passenger with id ${id} not found`,
      });
    }
    //4. en caso de que exista, se procede a actualizar el pasajero
    const updatedPassenger = await passengerService.updatePassenger(
      passenger,
      passengerData
    );
    //5. retornamos el pasajero actualizado.
    return res.json(updatedPassenger);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//endpoint: borra un pasajero
export const deletePassenger = async (req, res) => {
  try {
    const { id } = req.params;

    const passenger = await passengerService.findOnePassenger(id);

    if (!passenger) {
      return res.status(404).json({
        status: "error",
        message: `Passenger with id ${id} not found`,
      });
    }
    await passengerService.deletePassenger(passenger);

    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};
