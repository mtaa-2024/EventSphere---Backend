const {request, response} = require("express");
const pool = require("../core/connection").pool

const logger = async (request, response, level, message) => {
    pool.query('INSERT INTO logs (level, text, creation_date) VALUES ($1, $2, NOW())', [level, message], (error, results) => {
        if (error) {
            throw error
        }
    })
}

module.exports = {
    logger
}