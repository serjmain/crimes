const crimeRepository = require("../models/crime");
const { validationResult } = require("express-validator");
const v = require("../service/validator")

module.exports = {

    getCrimes(req, res) {  
              
        crimeRepository
            .getAll(req.query)
            .then((result) => {
                res.status(200).json(result.rows.map(row => crimeRepository.toItem(row)));
            })
            .catch((err) => res.status(404).send(err));
    },

    getCrimeById(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "get crime by id error", errors });
        }        
        if (!v.validateUUID(req.params.id) || !req.params.id){
            return res.status(404).json({ message: "Crime with this id not found"});
        }
        
        crimeRepository
            .getById(req.params.id)
            .then((result) => {
                if (result.rows.length < 1) {
                    return res.status(404).json({ message: "Crime with this id not found" });
                }
                res.status(200).json(result.rows[0]);
            })
            .catch((err) => res.status(404).send(err));
    },

    postCrime(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "post crime error", errors });
        }

        crimeRepository
            .create(req.body)
            .then((result) => {                
                return res.status(201).json({ message: "The crime has been successfully registered in the database", id: result.rows[0].id })
            })
            .catch((err) => res.status(404).send(err));
    },

    patchCrimeById(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "post crime error", errors })
        }        
        if (!req.params.id || req.params.id == '{id}') {
            res.status(400).json({ message: "id field is empty" });
        }
        crimeRepository.update(req.params.id, req.body);
        crimeRepository
            .getById(req.params.id)
            .then((result) => res.status(200).json(result.rows[0]))
            .catch((err) => res.status(404).send(err));
    }
};