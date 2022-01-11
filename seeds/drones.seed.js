// Iteration #1
const mongoose = require("mongoose");

// Connects to the Drone Schema
const Drone = require("./../models/Drone.model");
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

const fillDB = () => {
  const droneArray = [
    { name: "Mercury", proppellers: 4, maxSpeed: 20 },
    { name: "Venus", proppellers: 6, maxSpeed: 25 },
    { name: "Mars", proppellers: 8, maxSpeed: 30 },
  ];

  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
      return Drone.create(droneArray);
    })
    .then((createdDrones) => console.log(createdDrones))
    .catch((err) => {
      console.error("Error connecting to mongo: ", err);
    });

  mongoose.disconnect();
};

fillDB();
