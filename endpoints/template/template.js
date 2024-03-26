const {request, response} = require("express");
const {Level, logger} = require("../logs");
const pool = require("../../core/connection").pool
const getUsers = async (request, response) => {
    const { id, username } = request.body;
    console.log(id + " " + username)
    pool.query('SELECT * FROM users', null, (error, results) => {
        if (error) {
            throw error
        }

        logger(request, response, Level.INFO, "Som cigan")
        response.status(200).json({"id": id, "username": username})
    })
}

module.exports = {
    getUsers,
}