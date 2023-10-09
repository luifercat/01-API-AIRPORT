import { Router } from "express";
import { router as passengerRouter } from "../passengers/passengers.route.js";
import { router as cityRouter } from "../city/city.route.js";
import { router as flightRouter } from "../flight/flight.route.js";
import { router as planeRouter } from "../plane/plane.route.js";
//import { router as authRouter } from "../auth/auth.route.js";

export const router = Router();
// lo que coloque aca se va a concatenar con /api/v1 del app.js
router.use("/passengers", passengerRouter);
router.use("/city", cityRouter);
router.use("/flight", flightRouter);
router.use("/plane", planeRouter);

//router.use("/users", authRouter);
