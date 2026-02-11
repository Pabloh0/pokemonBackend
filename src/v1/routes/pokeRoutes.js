const express = require("express");
const router = express.Router();
const pokeController = require("../../controllers/pokeController");
const apicache = require("apicache");

const cache = apicache.middleware;

/**
 * @swagger
 * components:
 *   schemas:
 *     Pokemon:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Pikachu
 *         type:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Electric"]
 *
 *     Move:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Thunderbolt
 *         power:
 *           type: integer
 *           example: 90
 */

// --- RUTAS DE POKEMONS ---

/**
 * @swagger
 * /pokedex/pokemons:
 *   get:
 *     summary: Obtiene todos los pokemons
 *     tags: [Pokemons]
 *     responses:
 *       200:
 *         description: Lista de pokemons
 *
 *   post:
 *     summary: Crea un nuevo pokemon
 *     tags: [Pokemons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pokemon'
 *     responses:
 *       201:
 *         description: Creado
 */
router.get("/pokemons", cache("1 minutes"), pokeController.getAllPokes);
router.post("/pokemons", pokeController.createPoke);

/**
 * @swagger
 * /pokedex/pokemons/{pokeId}:
 *   get:
 *     summary: Obtiene un pokemon por ID
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: pokeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del pokemon
 *       404:
 *         description: Pokemon no encontrado
 *
 *   patch:
 *     summary: Actualiza un pokemon
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: pokeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Actualizado con éxito
 *
 *   delete:
 *     summary: Elimina un pokemon
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: pokeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Eliminado con éxito
 */
router.get("/pokemons/:pokeId", cache("1 minutes"), pokeController.getOnePoke);
router.patch("/pokemons/:pokeId", pokeController.updatePoke);
router.delete("/pokemons/:pokeId", pokeController.deletePoke);

/**
 * @swagger
 * /pokedex/pokemons/gen/{numGen}:
 *   get:
 *     summary: Obtiene pokemons por generación
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: numGen
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de pokemons de la generación especificada
 */
router.get("/pokemons/gen/:numGen", cache("1 minutes"), pokeController.getOneGen);

// --- RUTAS DE MOVES ---

/**
 * @swagger
 * /pokedex/moves:
 *   get:
 *     summary: Lista todos los movimientos
 *     tags: [Moves]
 *     responses:
 *       200:
 *         description: OK
 *
 *   post:
 *     summary: Registra un nuevo movimiento
 *     tags: [Moves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Move'
 *     responses:
 *       201:
 *         description: Movimiento creado
 */
router.get("/moves", cache("1 minutes"), pokeController.getAllMoves);
router.post("/moves", pokeController.createMove);

/**
 * @swagger
 * /pokedex/moves/{moveId}:
 *   get:
 *     summary: Obtiene un movimiento por ID
 *     tags: [Moves]
 *     parameters:
 *       - in: path
 *         name: moveId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/moves/:moveId", cache("1 minutes"), pokeController.getOneMove);

router.patch("/moves/:moveId", pokeController.updateMove);
router.delete("/moves/:moveId", pokeController.deleteMove);

/**
 * @swagger
 * /pokedex/admins:
 *   get:
 *     summary: Lista de administradores
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/admins", pokeController.getAllAdmins);

module.exports = router;
