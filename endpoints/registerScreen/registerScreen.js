const { request, response, json } = require("express");
const { logger } = require("../logs");
const bcrypt = require('bcrypt')
const pool = require("../../core/connection").pool;

const { createNewUserQuery, checkUsernameQuery, checkEmailQuery } = require('./utils');

const createNewUser = async (request, response) => {
    const { username, email, password, secondPassword } = request.body;
    if (password !== secondPassword) {
        return response.status(400).json({"result": false, "text": "Passwords don't match"});
    }

    if (username != null)
        if (await checkUsername(request, response, username)) {
            return response.status(400).json({"result": false, "text": "Username is already in use"});
        }
    /*if (email != null)
        await checkEmail(request, response, email)
    */
}

const checkUsername = async (request, response, username) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(checkUsernameQuery, [username], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
        return result.length > 0;
    }
    catch (error) {
        response.status(500).json({ error: error.message });
        return false
    }
}

const checkEmail = async (request, response) => {
    const {email} = request.body;
    try {
        const check = await new Promise((resolve, reject) => {
            pool.query(createNewUserQuery, [email,], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
    }
    catch (error) {
        await logger(request, response, "Error", "Error creating event: " + error.message);
        return response.status(500).json({ error: error.message });
    }
}


module.exports = {
    createNewUser,
    checkUsername,
    checkEmail
}