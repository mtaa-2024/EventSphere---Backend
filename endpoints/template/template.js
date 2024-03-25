const {request, response} = require("express");
const pool = require("../../core/connection").pool
const getUsers = async (request, response) => {
    pool.query('SELECT * FROM users', null, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {
    getUsers
}