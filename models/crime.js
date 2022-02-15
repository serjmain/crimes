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

    /* sortByRateDesc() {
        const query = `SELECT * FROM crimes ORDER by rate DESC `;
        return queryHelper.execute(query, {});
    } */

    /* sortByRateAsc() {
        const query = `SELECT * FROM crimes ORDER by rate ASC `;
        return queryHelper.execute(query, {});
    } */

    /* sortByIdDesc() {
        const query = `SELECT * FROM crimes ORDER by id DESC `;
        return queryHelper.execute(query, {});
    } */

    /* sortByIdAsc() {
        const query = `SELECT * FROM crimes ORDER by id ASC `;
        return queryHelper.execute(query, {});
    } */

    /* getAllByUserId(userid) {
        const params = [userid];
        const query = `SELECT * FROM crimes WHERE userid = ?`;

        return queryHelper.execute(query, params);

    } */

    /* getAllByPoliceStationId(policestationid) {
        const params = [policestationid];
        const query = `SELECT * FROM crimes WHERE policestationid = ?`;

        return queryHelper.execute(query, params);
    } */

    /* findCrimeByName(name) {
        const params = [name];
        const query = `SELECT * FROM crimes WHERE name = ? LIMIT 1`;

        return queryHelper.execute(query, params);
    } */


}
