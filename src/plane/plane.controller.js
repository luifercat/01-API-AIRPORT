import { catchAsync } from "../errors/index.js";
import { validatePartialPlane, validatePlane } from "./plane.schema.js";
import { PlaneService } from "./plane.service.js";

const planeService = new PlaneService();

//callback segundo parametro de la ruta (en plane.route.js)
//el objeto json lo uasmos para recibir inf del cliente
//todo lo que requiere el cliente va por el req (require)
export const findAllPlanes = catchAsync(async (req, res, next) => {
  const planes = await planeService.findAllPlanes();
  return res.json(planes);
});

//endpoint: crea avion
//la constante plane guarda el avios que se va a crear
// en planeService es donde se crea el avion
// con res. damos la respuesta del error
export const createPlane = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, planeData } = validatePlane(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const plane = await planeService.createPlane(planeData);
  return res.status(201).json(plane);
});

//endpoint: busca un avios
//por req.params se reciben las variables que vienen por la ruta
export const findOnePlane = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const plane = await planeService.findOnePlane(id);

  if (!plane) {
    return next(new AppError(`Plane with id: ${id} not found`, 404));
  }

  return res.json(plane);
});

//endpoint: actualizar un avios
export const updatePlane = catchAsync(async (req, res) => {
  //valida parcialmente los datos que se actualizaran (en plane.schema.js)
  const { hasError, errorMessages, planeData } = validatePartialPlane(req.body);
  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  //1. obtener el id del avios a actualizar, id se trae de la ruta con req.params
  const { id } = req.params;
  //2. buscar el pasajero que vamos a actualizar
  const plane = await planeService.findOnePlane(id);
  //3. validar si el avion existe
  if (!plane) {
    return res.status(404).json({
      status: "error",
      message: `plane with id ${id} not found`,
    });
  }
  //4. en caso de que exista, se procede a actualizar el avios
  const updatedPlane = await planeService.updatePlane(plane, planeData);
  //5. retornamos el avios actualizado.
  return res.json(updatedPlane);
});

//endpoint: borra un pasajero
export const deletePlane = catchAsync(async (req, res) => {
  const { id } = req.params;

  const plane = await planeService.findOnePlane(id);

  if (!plane) {
    return res.status(404).json({
      status: "error",
      message: `Plane with id ${id} not found`,
    });
  }
  await planeService.deletePlane(plane);

  return res.status(204).json(null);
});
