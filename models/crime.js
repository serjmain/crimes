const queryHelper = require('../service/dbservice');

module.exports = {

    init() {
        const query = ` 
            CREATE TABLE IF NOT EXISTS crimes (
                id timeuuid, 
                userId timeuuid,
                policeStationId timeuuid,
                name text,
                date text,
                rate int, 
            PRIMARY KEY (id))`;

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
        `;

        return queryHelper.execute(query, params);
    },

    getAll() {
        const query = `SELECT * FROM crimes`;        

        return queryHelper.execute(query, {});
    },

    create(crime) {
        const query = `
            INSERT INTO crimes (id, userId, policeStationId, name, date, rate)
            VALUES(now(),?,?,?,?,?)
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

    /* sortByDescRate() {
        const query = `SELECT * FROM crimes WHERE rate = ? ORDER by  `;

    } */
    
}
