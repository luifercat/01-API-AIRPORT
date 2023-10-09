import { envs } from "./config/enviroments/enviroments.js";
import app from "./app.js";
import { authenticate, syncUp } from "./config/database/database.js";

//funcion donde se ejecuta las funciones de autenticacion de conexion y sincronizacion de BD
async function main() {
  try {
    await authenticate();
    await syncUp();
  } catch (error) {
    console.error(error);
  }
}
//ejecutamos la funcion
main();

//listen para que el servidor este pendiente de lo sucede,
//recibe 2 parametros el puerto y una funcio callback
//tener en cuenta que la aplicacion ahora no correo por el App.js, ahora es por el server.js que es donde
//tenemos el listen

app.listen(envs.PORT, () => {
  console.log(`Server running on port ${envs.PORT}`);
});
