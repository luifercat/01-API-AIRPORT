//del servicio pasa al model
import Flight from "./flight.model.js";

// creamos calse FlightService
export class FlightService {
  async findOneFlight(id) {
    return await Flight.findOne({
      where: {
        id,
        status: "pending",
      },
    });
  }

  //Flight es el modelo de flight.model.js
  //condiciones se hacen con la clausula where
  async findAllFlights() {
    return await Flight.findAll({
      where: {
        status: "pending",
      },
    });
  }

  async createFlight(data) {
    return await Flight.create(data);
  }

  async updateFlight(flight, data) {
    return await flight.update(data);
  }

  //en le delete se le cambia el status a false
  async deleteFlight(flight) {
    return await flight.update({ status: "cancelled" });
  }
}
