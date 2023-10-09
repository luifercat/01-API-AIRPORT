import express from "express"; // importa libreria express
//desestructuramos:
import { router as passengerRouter } from "./passengers/passengers.route.js";

import { router } from "./routes/routes.js";

const app = express();

//esto me permite recibir informacion en formato json
app.use(express.json());

//  /api/v1    se va  a concatenar con lo que venga en   router
app.use("/api/v1", router);

export default app;

/*
const express = require("express");

const app = express();

app.use(express.json());


//Rutas  --->  donde se definen todos los endpoint, req request son requerimientos de frontend (react, vue, etc)
//res es responde es lo que responde el backend y tiene un metodo .send que seirve para enviar
//res.jason  -->
//ENDPOINT 1: OBTENER TODOS LOS PASAJEROS
app.get("/passengers", (req, res) => {
  res.send("este endpoint devolvera todos los pasajeros");
});

//ENDPOINT 2: CREARUN PASAJERO
app.post("/passengers", (req, res) => {
  console.log(req.body);
  res.send("este es un endpoint que creara un pasajero");
});

//ENDPOINT 3: OBTENER UN PASAJERO DADO SU ID
// los : indican que es una variable
//http://localhost:3000/passengers/1
//pp.get("/passenger/:var1",   ---> el 1 del renglon anteriro es una variable que se almacena en var1
//
app.get("/passengers/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: "este endpoint obtendra un passagero dado su id",
    id: id,
  });
});

//ENDPOINT 4: ACTUALIZAR LA INFORMACION DE UN PASAJERO
app.patch("/passengers/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: "este endpoitn actualizara el estado del pasajero",
    id,
  });
});

//ENDPOINT 5: ELIMINAR LA INFORMACION DE UN PASAJERO
app.delete("/passengers/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: "este endpoint eliminara una informacion",
    id,
  });
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000 :-)...`);
}); //escuchar, recibe 2 propiedades, el puerto (3000) y una funcion flecha

*/
