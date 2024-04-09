const { request, response, json } = require("express");
const { logger } = require("../logs");
const pool = require("../../core/connection").pool;

const { editUserProfileQuery, editFirstnameQuery, editLastnameQuery, checkOldEmailQuery, editEmailQuery} = require('./utils');

const editUserProfile = async (request, response) => {
    const { id, firstname, lastname, oldEmail, newEmail, profileImg } = request.body;

    if (id == null) {
        await logger(request, response, "Error", "Error user: ID not provided");
        response.status(404).json({"error": "Missing User ID"})
    }
    if (firstname != null)
        await editFirstname(request, response, id, firstname)
    if (lastname != null)
        await editLastname(request, response, id, lastname)
    if (oldEmail != null && newEmail != null)
        if (await checkEmail(request, response, oldEmail)) {
            return response.status(400).json({"result": false, "text": "Wrong Email"});
        } else {
            await editEmail(request, response, id, newEmail)
        }

    await logger(request, response, "Info", "Updated userProfile with id: " + id);
    return response.status(200).json({ "updated_status": true });
}

const editFirstname = async (request, response, id, firstname) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(editFirstnameQuery, [id, firstname], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
    } catch (error) {
        await logger(request, response, "Error", "Error editing UserProfile for user (" + id + "): " + error.message);
    }
}

const editLastname = async (request, response, id, lastname) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(editLastnameQuery, [id, lastname], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
    } catch (error) {
        await logger(request, response, "Error", "Error editing UserProfile for user (" + id + "): " + error.message);
    }
}

const checkEmail = async (request, response, id, oldEmail) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(checkOldEmailQuery, [id, oldEmail], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
        console.log(result)
        return !(result.length > 0);
    } catch (error) {
        await logger(request, response, "Error", "Error checking UserOldEmail for user (" + id + "): " + error.message);
    }
}

const editEmail = async (request, response, id, newEmail) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(editEmailQuery, [id, newEmail], (error, results) => {
                if (error) reject(error); else resolve(results.rows);
            });
        });
        return result.length > 0;
    } catch (error) {
        await logger(request, response, "Error", "Error editing UserNewEmail for user (" + id + "): " + error.message);
    }
}

module.exports = {
    editUserProfile,
    editFirstname,
    editLastname,
    checkEmail,
    editEmail
}