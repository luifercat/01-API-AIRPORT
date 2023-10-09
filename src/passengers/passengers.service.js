//del servicio pasa al model
import Passenger from "./passengers.model.js";

// creamos calse PassengerService
export class PassengerService {
  async findOnePassenger(id) {
    return await Passenger.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  //Passenger es el modelo de passenger.model.js
  //condiciones se hacen con la clausula where
  async findAllPassengers() {
    return await Passenger.findAll({
      where: {
        status: true,
      },
    });
  }

  async createPassenger(data) {
    return await Passenger.create(data);
  }

  async updatePassenger(passenger, data) {
    return await passenger.update(data);
  }

  //en le delete se le cambia el status a false
  async deletePassenger(passenger) {
    return await passenger.update({ status: false });
  }
}
