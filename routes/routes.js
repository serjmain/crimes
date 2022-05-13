const crimesController = require("../controllers/crimesController");
const express = require('express');
const router = express.Router();
const validator = require('../service/validator');

/**
 * @swagger
 *   definitions:
 *      Crimes:
 *        type: object
 *        required:
 *            - id
 *            - userId
 *            - policeStationId
 *            - name
 *            - date
 *            - rate
 *        properties:
 *            id:
 *              type: string
 *              description: Crime ID
 *            userId:
 *              type: string
 *              description: The user ID who added the crime
 *            policeStationId:
 *              type: string
 *              description: Police station ID
 *            name:
 *              type: string
 *              description: name of the crime
 *            date:
 *              type: string
 *              description: date of the crime
 *            rate:
 *              type: number
 *              description: rate of the crime
 *        example:
 *            userId: 854aa5d0-bbfb-11ec-8115-63fb9536bdba
 *            policeStationId: 623a2970-b7e7-11ec-be73-b58754443b73
 *            name: robbery
 *            date: 12.02.2022
 *            rate: 5
 *      ChangeCrime:
 *        type: object
 *        required:
 *            - name
 *            - date
 *        properties:
 *            name:
 *              type: text
 *              description: name of the crime
 *            date:
 *              type: text
 *              description: date of the crime
 *        example:
 *            date: 12.02.2022
 *            name: "theft"
 */

/**
 * @swagger
 * tags:
 *   name: Crimes
 *   description: Crimes API
 */

router.get('/', (req, res) => {
    res.send("main page");
})

/**
 * @swagger
 * /crimes:
 *   get:
 *     tags:
 *     - Crimes
 *     summary: get full criminal situation info
 *     description: Get full criminal situation info
 *     parameters:
 *     - in: query
 *       description: Get all crimes by user ID
 *       name: userId
 *       type: string
 *     - in: query
 *       description: Get all crimes by station ID
 *       name: policeStationId
 *       type: string
 *     - in: query
 *       description: Find by name
 *       name: searchByName
 *       type: string
 *     - in: query
 *       description: Find by rate
 *       name: searchByRate
 *       type: number
 *     - in: query
 *       description: Find by date
 *       name: searchByDate
 *       type: string
 *     - in: query
 *       description: Sort all crimes by rate DESC
 *       name: sortByRate
 *       type: string
 *     - in: query
 *       description: Limit amount of items in result 
 *       name: limit
 *       type: string
 *     responses:
 *       200:
 *         description: search results matching criteria
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Crimes'
 *       400:
 *         description: bad input parameter
 */

router.get('/crimes', async (req, res) => {
    crimesController.getCrimes(req, res);
});

/**
 * @swagger
 * /crimes/{id}:
 *   get:
 *     summary: Get crime by id
 *     tags: [Crimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: crime id
 *     responses:
 *       200:
 *         description: crime by id
 *         schema:
 *           $ref: '#/definitions/Crimes'
 *       400:
 *         description: bad request
 *       404:
 *         description: not found
 */

router.get('/crimes/:id', validator.validateGetCrimeById, async (req, res) => {
    crimesController.getCrimeById(req, res);
});

/**
 * @swagger
 * /crimes:
 *   post:
 *     tags: 
 *     - Crimes
 *     summary: Adds crime
 *     description: Adds crime
 *     consumes: 
 *     - application/json
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: body
 *       name: Crime
 *       description: Crime to add
 *       required: false
 *       schema:
 *         $ref: '#/definitions/Crimes'
 *     responses:
 *       201:
 *         description: Crime created
 *         schema:
 *           $ref: '#/definitions/Crimes'
 *       400:
 *         description: Bad request
 */

router.post('/crimes', validator.validatePostCrime, async (req, res) => {
    crimesController.postCrime(req, res);
});

/**
 * @swagger
 * /crimes/{id}:
 *  patch:
 *    summary: Change crime by id
 *    tags: [Crimes]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: Crime id
 *      - in: body
 *        name: Crime
 *        description: Crime update
 *        schema:
 *          $ref: '#/definitions/ChangeCrime'
 *    responses:
 *      200:
 *        description: Crime was updated
 *        schema:
 *          $ref: '#/definitions/Crimes'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 */

router.patch('/crimes/:id', validator.validatePatchCrimeById, async (req, res) => {
    crimesController.patchCrimeById(req, res);
});

router.use(function (req, res, next) {
    console.log("req", req)
    next();
})

router.use(function (err, req, res, next) {
    res.status(500).send("error");
})

router.use('*', function (req, res, next) {
    res.status(404).send('not found');
})

module.exports = router;
