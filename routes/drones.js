const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("./../models/Drone.model");

router.get("/drones", async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const droneList = await Drone.find();
    res.render("drones/list", { drones: droneList });
  } catch (err) {
    console.log(err);
  }
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const { name, proppellers, maxSpeed } = req.body;
    const newDrone = await Drone.create({ name, proppellers, maxSpeed });
    console.log("new Drone", newDrone);
    res.redirect("/drones");
  } catch (err) {
    console.log(err);
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const { id } = req.params;
    const foundDrone = await Drone.findById(id);
    console.log("found Drone", froundDrone);
    res.render("drones/update-form.hbs", foundDrone);
  } catch (err) {
    console.log(err);
  }
});

router.post("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const { id } = req.params;
    const { name, proppellers, maxSpeed } = req.body;
    const updateDrone = await Drone.findByIdAndUpdate(
      id,
      { name, proppellers, maxSpeed },
      { new: true }
    );
    console.log("updated Drone", updateDrone);
    res.redirect("/drones");
  } catch (err) {
    console.log(err);
  }
});

router.post("/drones/:id/delete", async (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    const { id } = req.params;
    const deletedDrone = await Drone.findByIdAndRemove(id);
    console.log("deleted Drone", deletedDrone);
    res.redirect("/drones");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;