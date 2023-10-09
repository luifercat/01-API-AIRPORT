//del servicio pasa al model
import Plane from "./plane.model.js";

// creamos clase PlaneService
export class PlaneService {
  async findOnePlane(id) {
    return await Plane.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  //Plane es el modelo de flight.model.js
  //condiciones se hacen con la clausula where
  async findAllPlanes() {
    return await Plane.findAll({
      where: {
        status: true,
      },
    });
  }

  async createPlane(data) {
    return await Plane.create(data);
  }

  async updatePlane(plane, data) {
    return await plane.update(data);
  }

  //en le delete se le cambia el status a false
  async deletePlane(plane) {
    return await plane.update({ status: false });
  }
}
