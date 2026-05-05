const express = require("express");
const router = express.Router();

const catwayController = require("../controllers/catwayController");
const reservationController = require("../controllers/reservationController");

const private = require("../middlewares/private");

/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways
 */

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations liées aux catways
 */

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupère la liste des catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways récupérée avec succès
 */
router.get("/", catwayController.getAllCatways);

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupère un catway par son numéro
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Catway récupéré avec succès
 *       404:
 *         description: Catway introuvable
 */
router.get("/:id", catwayController.getCatwayById);

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Crée un nouveau catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayNumber
 *               - type
 *               - catwayState
 *             properties:
 *               catwayNumber:
 *                 type: number
 *                 example: 101
 *               type:
 *                 type: string
 *                 example: long
 *               catwayState:
 *                 type: string
 *                 example: bon état
 *     responses:
 *       201:
 *         description: Catway créé avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Token manquant ou invalide
 */
router.post("/", private, catwayController.createCatway);

/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Modifie entièrement un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: number
 *                 example: 101
 *               type:
 *                 type: string
 *                 example: short
 *               catwayState:
 *                 type: string
 *                 example: en maintenance
 *     responses:
 *       200:
 *         description: Catway modifié avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Catway introuvable
 */
router.put("/:id", catwayController.updateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   patch:
 *     summary: Modifie l'état d'un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayState
 *             properties:
 *               catwayState:
 *                 type: string
 *                 example: en maintenance
 *     responses:
 *       200:
 *         description: État du catway modifié avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Catway introuvable
 */
router.patch("/:id", catwayController.patchCatwayState);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Catway supprimé avec succès
 *       401:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Catway introuvable
 */
router.delete("/:id", private, catwayController.deleteCatway);

/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Récupère toutes les réservations d'un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Liste des réservations récupérée
 *       404:
 *         description: Catway introuvable
 */
router.get("/:id/reservations", reservationController.getReservationsByCatway);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Récupère une réservation précise d'un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la réservation
 *     responses:
 *       200:
 *         description: Réservation récupérée avec succès
 *       404:
 *         description: Réservation introuvable
 */
router.get("/:id/reservations/:idReservation", reservationController.getReservationById);

/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     summary: Crée une réservation pour un catway
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - boatName
 *               - checkIn
 *               - checkOut
 *             properties:
 *               clientName:
 *                 type: string
 *                 example: Jean Dupont
 *               boatName:
 *                 type: string
 *                 example: Le Grand Bleu
 *               checkIn:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-01
 *               checkOut:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-10
 *     responses:
 *       201:
 *         description: Réservation créée
 *       400:
 *         description: Données invalides ou conflit de dates
 *       401:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Catway introuvable
 */
router.post("/:id/reservations", private, reservationController.createReservation);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprime une réservation précise d'un catway
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la réservation
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *       401:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Réservation introuvable
 */
router.delete("/:id/reservations/:idReservation", private, reservationController.deleteReservation);

module.exports = router;