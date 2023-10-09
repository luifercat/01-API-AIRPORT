//SE HACE TODA LA CONFIG DE LA LIBRESIA ZOD  para validaciones
import z from "zod"; //importamos la libreria

//desestructuramos
import { extractValidationData } from "../common/utils/extractErrorData.js";

// z.object porque validaresmo el objeto de datos que entra (esquema que hace la validacion)
export const passengerSchema = z.object({
  nroPassport: z.string().min(8).max(10),
  name: z.string().min(2).max(99),
  surname: z.string().min(2).max(100),
  birthdate: z.string({
    invalid_type_error: "Birthdate must be a correct format!",
    required_error: "Birthdate is required",
  }),
  gender: z.enum(["male", "female", "prefer not to say"]),
  email: z.string().email(),
  celphone: z.string().min(5).max(25),
  createdBy: z.number(),
});

//funcion que se va a encargaR DE   VALIDAR
export function validatePassenger(data) {
  const result = passengerSchema.safeParse(data); //safeParse es un metodo que hace la validacion

  const {
    hasError,
    errorMessages,
    data: passengerData, //aqui se renombra la const data por passengerData
  } = extractValidationData(result); //lo que hace la funcion extractValidationData es sacar todos los resultados, errores, data y retorna todo

  return {
    hasError,
    errorMessages,
    passengerData,
  };
}

//valida el update  -   partial porque valida parcialmente
export function validatePartialPassenger(data) {
  const result = passengerSchema.partial().safeParse(data);

  const {
    hasError, //para indicar si la data tiene algun error o no
    errorMessages,
    data: passengerData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    passengerData,
  };
}
