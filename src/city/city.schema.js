import z from "zod";
import { extractValidationData } from "../common/utils/extractErrorData.js";

const citySchema = z.object({
  name: z.string().min(3).max(60),
  country: z.string().min(3).max(60),
  lat: z.number(),
  long: z.number(),
});

export function validateCity(data) {
  const result = citySchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: cityData, //renombramos la cosns data
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    cityData,
  };
}

export function validatePartialCity(data) {
  const result = citySchema.partial().safeParse(data);

  //desestructuramos
  const {
    hasError, //para indicar si la data tiene algun error o no
    errorMessages,
    data: dataCity,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    dataCity,
  };
}
