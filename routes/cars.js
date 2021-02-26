const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const { carRentVal } = require("../validation");

//GETS BACK ALL THE CARS
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.json({ message: err });
  }
});

//GETS BACK A SPECIFIC CAR
router.get("/:carId", async (req, res) => {
  try {
    const cars = await Car.findById(req.params.carId);
    res.json(cars);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS A CAR
router.post("/", async (req, res) => {
  //VALIDATES DATA
  const { error } = carRentVal(req.body);
  if (error) return res.status(400).send("Car Data error.");

  //CHECK FOR DUPLICATES
  const plateExist = await Car.findOne({ plate: req.body.plate });
  if (plateExist) return res.status(400).send("Car already rented.");

  console.log(req.body);
  const car = new Car({
    brand: req.body.brand,
    plate: req.body.plate,
    model: req.body.model,
    pickupLocation: req.body.pickupLocation,
    pickupDate: req.body.pickupDate,
    dropLocation: req.body.dropLocation,
    dropDate: req.body.dropDate,
  });

  try {
    const savedPost = await car.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE A CAR

router.delete("/:carId", async (req, res) => {
  try {
    const removedCar = await Car.remove({ _id: req.params.carId });
    res.json(removedCar);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE A CAR
router.patch("/:carId", async (req, res) => {
  try {
    const updatedCar = await Car.updateOne(
      { _id: req.params.carId },
      { $set: { model: req.body.model, plate: req.body.plate } },
    );
    res.json(updatedCar);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
