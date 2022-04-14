const crimeRepository = require("../models/crime");

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
        if (!req.params.id) {
            res.send(404);
        }
        crimeRepository
            .getById(req.params.id)
            .then((result) => {
                res.status(200).json(result.rows[0]);
            })
            .catch((err) => res.status(404).send(err));
    },

    postCrime(req, res) {                      
        crimeRepository
            .create(req.body)
            .then((result) => {                                              
               return res.status(201).json({ message: 'The crime has been successfully registered in the database', id: result.rows[0].id })
            })
            .catch((err) => res.status(404).send(err));
    },

    patchCrimeById(req, res) {
        if (!req.params.id) {
            res.send(404);
        }
        crimeRepository.update(req.params.id, req.query);
        crimeRepository
            .getById(req.params.id)
            .then((result) => res.status(200).json(result.rows[0]))
            .catch((err) => res.status(404).send(err));
    }
};