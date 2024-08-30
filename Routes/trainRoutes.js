const express = require("express");
const router = express.Router();
const Train = require("../Models/Train");
const { startTrain } = require("../Service/trainService");

/**
 * @swagger
 * tags:
 *   name: Trains
 *   description: API for managing trains
 */

/**
 * @swagger
 * /api/trains:
 *   get:
 *     summary: Get all trains
 *     description: Retrieve a list of all trains.
 *     tags: [Trains]
 *     responses:
 *       200:
 *         description: A list of trains.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Train'
 */
router.get("/", async (req, res) => {
  try {
    const trains = await Train.find().populate(
      "currentStation passedStations.station"
    );
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/trains/{trainName}:
 *   get:
 *     summary: Get a train by ID
 *     description: Retrieve a specific train by trainName.
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: trainName
 *         required: true
 *         description: The ID of the train to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single train.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       404:
 *         description: Train not found.
 */
router.get("/:trainName", async (req, res) => {
  try {
    const train = await Train.findOne({ trainName: req.params.trainName });
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.json(train);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/trains/{trainName}:
 *   put:
 *     summary: Update a train's location
 *     description: Update the location of a specific train.
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: trainName
 *         required: true
 *         description: The ID of the train to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Train object with updated location details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Train'
 *     responses:
 *       200:
 *         description: Train updated successfully.
 *       404:
 *         description: Train not found.
 */
router.put("/:trainName", async (req, res) => {
  try {
    const { lastPassedStation, lastPassedTime, passedStations } = req.body;
    const train = await Train.findOneAndUpdate(
      { trainName: req.params.trainName },
      {
        lastPassedStation,
        lastPassedTime,
        $push: { passedStations: { $each: passedStations } },
      },
      { new: true }
    );
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.json(train);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/trains/start:
 *   post:
 *     summary: Start a new train
 *     description: Start a new train on a specified line.
 *     tags: [Trains]
 *     requestBody:
 *       description: Train details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainName:
 *                 type: string
 *               lineName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Train starting process initiated.
 *       400:
 *         description: Bad request, missing parameters.
 */
router.post("/start", async (req, res) => {
  const { trainName, lineName } = req.body;

  // Validate input
  if (!trainName || !lineName) {
    return res.status(400).json({ msg: "Train ID and Line Name are required" });
  }

  try {
    // Start the train on the specified line
    await startTrain(trainName, lineName);
    res.status(200).json({ msg: "Train starting process initiated" });
  } catch (error) {
    res.status(500).json({ msg: "Error starting train", error: error.message });
  }
});

/**
 * @swagger
 * /api/trains/{trainName}:
 *   delete:
 *     summary: Delete a train by ID
 *     description: Delete a train by its ID.
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: trainName
 *         required: true
 *         description: The ID of the train to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Train deleted successfully.
 *       404:
 *         description: Train not found.
 */
router.delete("/:trainName", async (req, res) => {
  try {
    const train = await Train.findOneAndDelete({
      trainName: req.params.trainName,
    });
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.json({ message: "Train deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
