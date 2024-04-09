const { request, response, json } = require("express");
const { logger } = require("../logs");
const pool = require("../../core/connection").pool;

const { getFriendSearchQuery } = require('./utils');

const getFriendSearch = async (request, response) => {
    const { filter } = request.body;
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(getFriendSearchQuery, [filter], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
        return response.status(200).json({ "friends": result });
        }
        catch (error) {
        await logger(request, response, "Warning", "Error while logging user: " + error.message);
        return response.status(500).json({ error: error.message });
    }
}

module.exports = {
    getFriendSearch
}