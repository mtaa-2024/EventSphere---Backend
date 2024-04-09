const { request, response, json } = require("express");
const { logger } = require("../logs");
const bcrypt = require('bcrypt')
const pool = require("../../core/connection").pool;

const { createNewUserQuery, checkUsernameQuery, checkEmailQuery } = require('./utils');

//Salt 10

const createNewUser = async (request, response) => {
    const { username, email, password, secondPassword } = request.body;

    if (username != null)
        await checkUsername(request, response, username)
        if(checkUsername) {
            return response.status(500).json({"result": false});
        }
    /*if (email != null)
        await checkEmail(request, response, email)
*/
}

const checkUsername = async (request, response) => {
    const {username} = request.body;
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(checkUsernameQuery, [username], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
        if(result.length > 0) {
            return true
        }
        return false
    }
    catch (error) {
        await logger(request, response, "Error", "Error creating event: " + error.message);
        return response.status(500).json({ error: error.message });
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