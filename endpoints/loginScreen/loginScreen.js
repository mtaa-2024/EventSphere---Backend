const { request, response, json } = require("express");
const { Level, logger } = require("../logs");
const bcrypt = require('bcrypt')
const pool = require("../../core/connection").pool;

const { checkLoginQuery } = require('./utils');

const checkLogin = async (request, response) => {
    const { username, email, password } = request.body;
    try {
        const check = await new Promise((resolve, reject) => {
            pool.query(checkLoginQuery, [username == null? email: username], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
        if (check.rows != null && check.rows.length > 0){
            const passwordMatch = await bcrypt.compare(check.rows[0].password, password)
            if(!passwordMatch) {
                return response.status(400).json({"error": "Wrong password"});
            }
        }
        return response.status(200).json(check.rows);
    }
    catch (error) {
    await logger(request, response, Level.ERROR, "Error creating event: " + error.message);
    return response.status(500).json({ error: error.message });
}
}

module.exports = {
    checkLogin
}