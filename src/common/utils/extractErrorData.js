// funciones o codigo util y comun en el proyecto

export const extractValidationData = (resultValidation) => {
  //funcion que usaremos para validar datos de toda clase
  let errorMessages;
  let data;
  const hasError = !resultValidation.success;

  if (hasError) errorMessages = JSON.parse(resultValidation.error.message);
  if (!hasError) data = resultValidation.data;

  return {
    hasError,
    errorMessages,
    data,
  };
};
