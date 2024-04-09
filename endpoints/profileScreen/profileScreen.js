const { request, response, json } = require("express");
const { logger } = require("../logs");
const pool = require("../../core/connection").pool;

const { getProfileQuery, removeFriendQuery } = require('./utils');

const getProfile = async (request, response) => {
    const { id } = request.body;
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(getProfileQuery, [id], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
        return response.status(200).json(result);
    } catch (error) {
        await logger(request, response, "Warning", "Error while logging user: " + error.message);
        return response.status(500).json({ error: error.message });
    }
}

const removeFriend = async (request, response) => {
    const { id, friendId } = request.body;
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(removeFriendQuery, [id, friendId], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
        return response.status(200).json(result);
    } catch (error) {
        await logger(request, response, "Warning", "Error while removing friends: " + error.message);
        return response.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProfile,
    removeFriend
}