//importamos el modelo de City
import City from "./city.model.js";

//clase
export class CityService {
  async findAllCities() {
    return await City.findAll({ where: { status: true } });
  }

  async findOneCity(id) {
    return await City.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  //metodo que crea la cu¿iudad
  async createCity(data) {
    //metodo que crea la cu¿iudad
    return await City.create(data); //enviamos la data por City.create para crear la ciudad
  }

  async updateCity(city, data) {
    return await city.update(data);
  }

  async deleteCity(city) {
    return await city.update({ status: false });
  }
}
