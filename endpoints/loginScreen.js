const { logger } = require("./logs");
const bcrypt = require('bcrypt')
const pool = require("../core/connection").pool;
const { checkIfUserExistsQuery , getUserQuery} = require('./utils');


const getLoginData = async(request, response) => {
    const { username, password } = request.query;
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(checkIfUserExistsQuery, [username], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        if (result.length > 0) {
            const hashedPassword = result[0].password;
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            if(!passwordMatch) {
                await logger("Error", "Wrong password for user with id: " + result[0].id);
                return response.status(200).json({"result": false, "text": "Wrong password"});
            }
            const user = await getUser(result[0].id);
            if (user != null) {
                await logger("Info", "Successfully logged user with id: " + result[0].id);
                return response.status(200).json({"result": true, "text": "ok", "user": user});
            }
        }
        await logger("Error", "User " + username + " not found");
        return response.status(200).json({"result": false, "error": "User " + username + " not found"});
    } catch ( error ) {
        await logger("Warning", "Error while getting login data. " + error.message);
        return response.status(500).json({"result": false, "error": "Error while getting login data. " + error.message});
    }
}

const getUser = async (id) => {
    try {
        return await new Promise((resolve, reject) => {
            pool.query(getUserQuery, [id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        })
    } catch (error) {
        await logger("Error", "Error receiving user (" + id + ") information: " + error.message);
        return null
    }
}

module.exports = {
    getLoginData,
    getUser
}