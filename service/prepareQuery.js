module.exports = {
    prepareQuery(params) {        
        const query = `SELECT * FROM crimes`

        if (params.sortBy) {
            query += ` ORDER BY ${params.sortBy}`;
        }
        if (params.sortByOrder) {
            query += `ORDER BY ${params.sortByOrder}`;
        }
        if (params.offset) {
            query += `ORDER BY ${params.offset}`;
        }
        if (params.limit) {
            query += `ORDER BY ${params.limit}`;
        }
        if (params.searchByName.name) {
            query += `WHERE name = ? LIMIT 1 `;
        }
        if (params.allCrimesByPoliceStationId.policeStationId) {
            query += `WHERE policestationid = ?`;
        }
        if (params.allCrimesByUserId.userId) {
            query += `WHERE userid = ?`;
        }

        return query;
    },
}