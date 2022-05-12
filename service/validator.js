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
    ],

    validateUUID(uuid) {
        return /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(uuid)
    }

}
