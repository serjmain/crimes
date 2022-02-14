const client = require('./dbservice');

module.exports = {
    async execute(query, params) {
        return new Promise(function (resolve, reject) {
            client.execute(query, params, { prepare: true }, function (error, result) {
                if (error != undefined) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },
};
