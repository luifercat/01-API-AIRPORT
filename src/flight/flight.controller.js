import { catchAsync } from "../errors/index.js";
import { validatePartialFlight, validateFlight } from "./flight.schema.js";
import { FlightService } from "./flight.service.js";

const flightService = new FlightService();

//callback segundo parametro de la ruta (en passengers.route.js)
//el objeto json lo uasmos para recibir inf del cliente
//todo lo que requiere el cliente va por el req (require)
export const findAllFlights = catchAsync(async (req, res, next) => {
  const flights = await flightService.findAllFlights();
  return res.json(flights);
});

//endpoint: crea vuelo
//la constante passenger guarda el pasagero que se va a crear
// en passengerService es donde se crea el pasajero
// con res. damos la respuesta del error
export const createFlight = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, flightData } = validateFlight(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const flight = await flightService.createFlight(flightData);
  return res.status(201).json(flight);
});

//endpoint: busca un pasajero
//por req.params se reciben las variables que vienen por la ruta
export const findOneFlight = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const flight = await flightService.findOneFlight(id);

  if (!flight) {
    return next(new AppError(`Flight with id: ${id} not found`, 404));
  }

  return res.json(flight);
});

//endpoint: actualizar un pasajero
export const updateFlight = catchAsync(async (req, res) => {
  //valida parcialmente los datos que se actualizaran (en passenger.schema.js)
  const { hasError, errorMessages, flightData } = validatePartialFlight(
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
  const flight = await flightService.findOneFlight(id);
  //3. validar si el pasajero existe
  if (!flight) {
    return res.status(404).json({
      status: "error",
      message: `flight with id ${id} not found`,
    });
  }
  //4. en caso de que exista, se procede a actualizar el pasajero
  const updatedFlight = await flightService.updateFlight(flight, flightData);
  //5. retornamos el pasajero actualizado.
  return res.json(updatedFlight);
});

//endpoint: borra un pasajero
export const deleteFlight = catchAsync(async (req, res) => {
  const { id } = req.params;

  const flight = await flightService.findOneFlight(id);

  if (!flight) {
    return res.status(404).json({
      status: "error",
      message: `Flight with id ${id} not found`,
    });
  }
  await flightService.deleteFlight(flight);

  return res.status(204).json(null);
});
