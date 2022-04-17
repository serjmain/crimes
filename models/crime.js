const queryHelper = require('../service/dbservice');
const queryGenerator = require('../service/prepareQuery');

module.exports = {

    init() {
        const query = ` 
            CREATE TABLE IF NOT EXISTS crimes (
                id timeuuid, 
                userId timeuuid,
                policeStationId timeuuid,
                name text,
                date text,
                rate double,
                key text, 
            PRIMARY KEY ((key), rate))
            WITH CLUSTERING ORDER BY (rate ASC)`;

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

    async update(id, crime) {
        const getRate = await this.getById(id)        
        const { rate } = getRate.rows[0]; 
        const params = [crime.name, crime.date, id];
        const query = `UPDATE crimes SET name = ?, date = ? WHERE key = 'key' AND rate = ${rate} IF id = ?`
        
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
