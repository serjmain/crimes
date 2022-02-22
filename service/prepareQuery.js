module.exports = {
    prepareQuery(params) {

        let query = `SELECT * FROM crimes `;

        if (params.policeStationId || params.userId || params.searchBy) {
            query += this.prepareWhereQuery(params);
        }
        if (params.sortBy) {
            query += this.prepareSortQuery(params);
        }
        if (params.offset) {
            query += this.prepareOffsetQuery(params);
        }
        if (params.limit) {
            query += this.prepareLimitQuery(params);
        }       

        return query;
    },

    prepareWhereQuery(params) {
        let query = ` WHERE `;
        let cond = [];

        if (params.policeStationId) {
            cond.push(`policestationid = ${params.policeStationId} `);
        }

        if (params.userId) {
            cond.push(`userid = ${params.userId} `);
        }

        if (params.searchBy) {
            cond.push(`name = '${params.searchBy}' `);
        }
        
        return query + cond.join(" AND ") + ` ALLOW FILTERING`;
    },

    prepareLimitQuery(params) {
        return ` LIMIT ${params.limit} `;
    },

    prepareSortQuery(params) {
        return ` WHERE key = 'key' ORDER BY ${params.sortBy} ${params.sortByOrder || "DESC"}`;
    },    
}