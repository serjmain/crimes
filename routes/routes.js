const crimesController = require("../controllers/crimesController");
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
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
 *              type: timeuuid
 *              description: Crime ID 
 *            userId:
 *              type: timeuuid
 *              description: The user ID who added the crime
 *            policeStationId:
 *              type: timeuuid
 *              description: Police station ID
 *            name:
 *              type: text
 *              description: name of the crime
 *            date:
 *              type: text
 *              description: date of the crime
 *            rate:
 *              type: text
 *              description: rate of the crime                          
 *        example:            
 *            userId: 47745749-d385-4545-903a-d4ec73d70f98
 *            policeStationId: 151a87da-48ef-4827-9d21-26aa96ea1176
 *            name: robbery
 *            date: 12.02.2022  
 *            rate: 5                  
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
 *       type: integer
 *     - in: query
 *       description: Get all crimes by station ID
 *       name: policeStationId
 *       type: integer
 *     - in: query
 *       description: Find by name
 *       name: searchByName
 *       type: string
 *     - in: query
 *       description: Find by rate
 *       name: searchByRate
 *       type: string
 *     - in: query
 *       description: Find by date
 *       name: searchByDate
 *       type: string
 *     - in: query
 *       description: Sort all crimes by 
 *       name: sortBy
 *       type: string
 *       enum: ["rate"]       
 *     - in: query
 *       description: Limit amount of items in result 
 *       name: limit
 *       type: string  
 *    
 *     responses:
 *       200:
 *         description: search results matching criteria
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Crimes'
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
 *         schema:
 *           type: timeuuid         
 *         description: crime id
 *     responses:
 *       200:
 *         description: crime by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crimes'      
 */

router.get('/crimes/:id', async (req, res) => {
    crimesController.getCrimeById(req, res);
});

/**
 * @swagger
 * /crimes:
 *   post:
 *     summary: Adds crime
 *     tags: [Crimes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Crimes'
 *     responses:
 *       201:
 *         description: Crime created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crimes'       
 */

router.post('/crimes', async (req, res) => {
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
 *        schema:
 *          type: timeuuid         
 *        description: Crime id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Crimes'
 *    responses:
 *      200:
 *        description: Crime was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Crimes'     
 */

router.patch('/crimes/:id', async (req, res) => {
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
