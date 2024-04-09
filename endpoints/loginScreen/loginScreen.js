const { request, response, json } = require("express");
const { logger } = require("../logs");
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
        if (check.length > 0) {
            const hashedPassword = check[0].password
            const passwordMatch = await bcrypt.compare(password, hashedPassword)
            if(!passwordMatch) {
                await logger(request, response, "Info", "Wrong password for user with id: " + check[0].id);
                return response.status(400).json({"result": false});
            }

            await logger(request, response, "Info", "Successfully logged user with id: " + check[0].id);
            return response.status(200).json({"result": true, "user_id": check[0].id});
        }
        await logger(request, response, "Error", "User not found");
        return response.status(200).json({"result": false});
    } catch (error) {
        await logger(request, response, "Warning", "Error while logging user: " + error.message);
        return response.status(500).json({ error: error.message });
    }
}

module.exports = {
    checkLogin
}