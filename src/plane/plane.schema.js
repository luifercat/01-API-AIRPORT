//SE HACE TODA LA CONFIG DE LA LIBRESIA ZOD  para validaciones
import z from "zod"; //importamos la libreria

//desestructuramos
import { extractValidationData } from "../common/utils/extractErrorData.js";

// z.object porque validaresmo el objeto de datos que entra (esquema que hace la validacion)
export const planeSchema = z.object({
  planeNumber: z.number({
    invalid_type_error: "Plane number must be a numbers only!",
    required_error: "Plane number is required",
  }),
  model: z.string().min(5).max(20),
  maxCapacity: z.number(),
  arline: z.enum([
    "AeroGlobe",
    "AeroTronix",
    "VelocityAir",
    "AirQuest",
    "StartLink",
  ]),
});

//funcion que se va a encargaR DE   VALIDAR
export function validatePlane(data) {
  const result = planeSchema.safeParse(data); //safeParse es un metodo que hace la validacion

  const {
    hasError,
    errorMessages,
    data: planeData, //aqui se renombra la const data por passengerData
  } = extractValidationData(result); //lo que hace la funcion extractValidationData es sacar todos los resultados, errores, data y retorna todo

  return {
    hasError,
    errorMessages,
    planeData,
  };
}

//valida el update  -   partial porque valida parcialmente
export function validatePartialPlane(data) {
  const result = planeSchema.partial().safeParse(data);

  const {
    hasError, //para indicar si la data tiene algun error o no
    errorMessages,
    data: planeData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    planeData,
  };
}
