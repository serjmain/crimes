const queryHelper = require('../service/dbservice');
const queryGenerator = require('../service/prepareQuery');

module.exports = {

    init() {
        const query = ` 
            CREATE TABLE IF NOT EXISTS crimes (
                id timeuuid, 
                userId uuid,
                policeStationId uuid,
                name text,
                date text,
                rate text,
                key text, 
            PRIMARY KEY ((key), name))
            WITH CLUSTERING ORDER BY (name ASC)`;

        return queryHelper.execute(query, {});
    },

    getById(id) {
        const params = [id];
        const query = `
            SELECT 
                id,
                date,
                name,
                policestationid,
                rate,
                userid
            FROM   
                my_guard.crimes 
            WHERE id = ?
            LIMIT 1
            ALLOW FILTERING
        `;

        return queryHelper.execute(query, params);
    },

    getAll(params) {
        const query = queryGenerator.prepareQuery(params);

        return queryHelper.execute(query, {});
    },

    create(crime) {
        const query = `
            INSERT INTO crimes (id, userId, policeStationId, name, date, rate, key)
            VALUES(now(),?,?,?,?,?,'key')
            IF NOT EXISTS
        `;

        return queryHelper.execute(query, crime);
    },

    update(id, crime) {
        const params = [crime.name, crime.date, crime.rate, id];
        const query = `
            UPDATE crimes
            SET name = ?, date = ?, rate = ?
            WHERE id = ? 
        `
        return queryHelper.execute(query, params);
    },

    toItem(crime) {        
        return {
            id: crime.id,
            userid: crime.userid,
            policestationid: crime.policestationid,
            name: crime.name,
            date: crime.date,
            rate: crime.rate
        }
    }
}
