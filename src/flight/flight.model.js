//modelo  --->  donde creamos la tabla de la db

import { DataTypes } from "sequelize";

import sequelize from "../config/database/database.js";

//colocar los modelos con mayusculas por ej... Passengers

const Flight = sequelize.define("flight", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    field: "flight_Id",
  },
  originId: {
    type: DataTypes.INTEGER,
    //allowNull: false,
    field: "origin_id",
  },
  detinationId: {
    type: DataTypes.INTEGER,
    //allowNull: false,
    field: "detination_id",
  },
  plaintId: {
    type: DataTypes.INTEGER,
    //allowNull: false,
    field: "plaint_id",
  },
  departureTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: "departure_time",
  },
  checkIn: {
    type: DataTypes.TIME,
    allowNull: false,
    field: "check_in",
  },
  status: {
    type: DataTypes.ENUM(
      "pending",
      "in Progress",
      "done",
      "cancelled",
      "delayed"
    ),
    allowNull: false,
    defaultValue: "pending",
  },
});

export default Flight;
