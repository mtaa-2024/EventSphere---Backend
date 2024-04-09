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
            const passwordMatch = await bcrypt.compare(hashedPassword, password)
            if(!passwordMatch) {
                await logger(request, response, "Info", "Wrong password for user with id: " + check.id);
                return response.status(400).json({"result": false});
            }

            await logger(request, response, "Info", "Sucessfully logged user with id: " + check.id);
            return response.status(200).json({"result": true});
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