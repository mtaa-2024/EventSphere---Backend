const { logger } = require("./logs");
const bcrypt = require('bcrypt')
const pool = require("../core/connection").pool;
const { getUser } = require("./init");
const { createNewUserQuery, checkUsernameQuery, checkEmailQuery } = require('./utils');

const createNewUser = async (request, response) => {
    const { username, email, password } = request.body;
    if (username != null && await checkUsername(password))
        return response.status(400).json({"result": false, "text": "Username is already in use"});
    if (email != null && await checkEmail(email))
        return response.status(400).json({"result": false, "text": "Email is already in use"});
    return await importUserToDatabase(request, response, username, email, password)
}

const checkUsername = async (username) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(checkUsernameQuery, [username], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        return result.length > 0;
    }
    catch (error) {
        return false
    }
}

const checkEmail = async (email) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(checkEmailQuery, [email], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        return result.length > 0;
    }
    catch (error) {
        return false
    }
}

const importUserToDatabase = async (request, response, username, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await new Promise((resolve, reject) => {
            pool.query(createNewUserQuery, [username, email, hashedPassword], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        const user_id = result[0].id;
        if(user_id !== null) {
            await logger("Info", "Created new user with id: " + user_id);
            return response.status(200).json({"result": true, "user": getUser(user_id)});
        }
    }
    catch (error) {
        await logger("Warning", "Error creating new user");
        response.status(500).json({"result": false, "error": "Error creating new user: " + error.message});
    }
}


module.exports = {
    createNewUser
}