const { check } = require('express-validator')

module.exports = {    
    validatePostCrime: [
        check('date', 'date field can\'t be empty').notEmpty(),
        check('name', 'name field can\'t be empty').notEmpty(),
        check('policeStationId', 'policestationId field can\'t be empty').notEmpty(),
        check('rate', 'rate field can\'t be empty').notEmpty(),
        check('userId', 'userId field can\'t be empty').notEmpty()
    ],
    validateGetCrimeById: [
        check('id', 'date field can\'t be empty').notEmpty(),
        check('id', 'that format crime ID is incorrect').isLength({ min: 35, max: 36 })
    ],
    validatePatchCrimeById: [
        check('date', 'date field can\'t be empty').notEmpty(),
        check('name', 'name field can\'t be empty').notEmpty()        
    ]
}
