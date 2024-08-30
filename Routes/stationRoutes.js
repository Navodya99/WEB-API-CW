const express = require("express");
const router = express.Router();
const stationController = require("../Controllers/stationController");

/**
 * @swagger
 * tags:
 *   name: Stations
 *   description: The stations managing API
 */

/**
 * @swagger
 * /api/stations:
 *   get:
 *     summary: Returns the list of all stations
 *     tags: [Stations]
 *     responses:
 *       200:
 *         description: The list of the stations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Station'
 */
router.get("/", stationController.getAllStations);

/**
 * @swagger
 * /api/stations/{id}:
 *   get:
 *     summary: Get a station by ID
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The station ID
 *     responses:
 *       200:
 *         description: The station description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       404:
 *         description: Station not found
 */
router.get("/:id", stationController.getStationById);

/**
 * @swagger
 * /api/stations:
 *   post:
 *     summary: Create a new station
 *     tags: [Stations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Station'
 *     responses:
 *       201:
 *         description: The station was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       400:
 *         description: Bad request
 */
router.post("/", stationController.createStation);

/**
 * @swagger
 * /api/stations/{id}:
 *   put:
 *     summary: Update a station by ID
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The station ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Station'
 *     responses:
 *       200:
 *         description: The station was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       404:
 *         description: Station not found
 *       400:
 *         description: Bad request
 */
router.put("/:id", stationController.updateStation);

/**
 * @swagger
 * /api/stations/{id}:
 *   delete:
 *     summary: Remove a station by ID
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The station ID
 *     responses:
 *       200:
 *         description: The station was deleted
 *       404:
 *         description: Station not found
 */
router.delete("/:id", stationController.deleteStation);

module.exports = router;
