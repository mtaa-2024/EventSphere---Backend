const pool = require("../core/connection").pool

const logger = async (level, message) => {
    try {
        await new Promise((resolve, reject) => {
            pool.query('INSERT INTO logs (level, text, creation_date) VALUES ($1, $2, NOW())', [level, message], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
    } catch ( error ) {
        console.log( error )
    }
}

module.exports = {
    logger
}