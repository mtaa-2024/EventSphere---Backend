const { logger } = require("./logs");
const bcrypt = require('bcrypt')
const pool = require("../core/connection").pool;
const { getUser } = require("./loginScreen");
const { createNewUserQuery, checkUsernameQuery, checkEmailQuery } = require('./utils');

const createNewUser = async (request, response) => {
    console.log(request.body);
    const { username, email, password } = request.body;
    if (await checkUsername(username))
        return response.status(200).json({"result": false, "text": "Username is already in use"});
    if (await checkEmail(email))
        return response.status(200).json({"result": false, "text": "Email is already in use"});
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
            const user = await getUser(user_id)
            await logger("Info", "Created new user with id: " + user_id);
            return response.status(200).json({"result": true, "user": user});
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