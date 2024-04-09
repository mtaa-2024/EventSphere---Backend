const { request, response, json } = require("express");
const { logger, Level} = require("../logs");
const bcrypt = require('bcrypt')
const pool = require("../../core/connection").pool;

const { createNewUserQuery, checkUsernameQuery, checkEmailQuery } = require('./utils');

const createNewUser = async (request, response) => {
    const { username, email, password, secondPassword } = request.body;
    if (password !== secondPassword) {
        return response.status(400).json({"result": false, "text": "Passwords don't match"});
    }

    if (password !== secondPassword){
        return response.status(400).json({"result": false, "text": "Passwords don't match"});
    }

    if (username != null)
        if (await checkUsername(request, response, username)) {
            return response.status(400).json({"result": false, "text": "Username is already in use"});
        }

    if (email != null)
        if (await checkEmail(request, response, email)) {
            return response.status(400).json({"result": false, "text": "Email is already in use"});
        }

    await importUserToDatabase(request, response, username, email, password)
    return response.status(200).json({ "result": true });
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

const checkEmail = async (request, response, email) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(checkEmailQuery, [email], (error, results) => {
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

const importUserToDatabase = async (request, response, username, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await new Promise((resolve, reject) => {
            pool.query(createNewUserQuery, [username, email, hashedPassword], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
        const user_id = result[0].id;
        if(user_id !== null){
            return response.status(200).json({"result": true, "user_id": result[0].id});
        }
    }
    catch (error) {
        response.status(500).json({ error: error.message });
        return false
    }
}


module.exports = {
    importUserToDatabase,
    checkUsername,
    checkEmail,
    createNewUser
}