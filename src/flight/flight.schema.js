//SE HACE TODA LA CONFIG DE LA LIBRESIA ZOD  para validaciones
import z from "zod"; //importamos la libreria

//desestructuramos
import { extractValidationData } from "../common/utils/extractErrorData.js";

// z.object porque validaresmo el objeto de datos que entra (esquema que hace la validacion)
export const flightSchema = z.object({
  departureTime: z.string({
    invalid_type_error: "departure Time must be a correct format!",
    required_error: "Departure Time is required",
  }),
  checkIn: z.string({
    invalid_type_error: "Check in must be a correct format!",
    required_error: "Check inDeparture Time is required",
  }),
});

//funcion que se va a encargaR DE   VALIDAR
export function validateFlight(data) {
  const result = flightSchema.safeParse(data); //safeParse es un metodo que hace la validacion

  const {
    hasError,
    errorMessages,
    data: flightData, //aqui se renombra la const data por passengerData
  } = extractValidationData(result); //lo que hace la funcion extractValidationData es sacar todos los resultados, errores, data y retorna todo

  return {
    hasError,
    errorMessages,
    flightData,
  };
}

//valida el update  -   partial porque valida parcialmente
export function validatePartialFlight(data) {
  const result = flightSchema.partial().safeParse(data);

  const {
    hasError, //para indicar si la data tiene algun error o no
    errorMessages,
    data: flightData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    flightData,
  };
}
