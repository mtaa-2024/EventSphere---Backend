const { logger } = require("./logs");
const pool = require("../core/connection").pool;
const bcrypt = require("bcrypt");
const { editFirstnameQuery, editLastnameQuery, checkOldEmailQuery, editEmailQuery, checkOldPasswordQuery, editNewPasswordQuery, editProfileImageQuery, insertImageQuery } = require('./utils');

// TODO
// Tato cast sa este bude prisposobovat

const   editUserProfile = async (request, response) => {
    const { id, firstname, lastname, oldEmail, newEmail, oldPassword, newPassword, profileImage } = request.body;

    if (id == null) {
        await logger("Error", "Error user ID not provided");
        return response.status(404).json({"error": "Missing User ID"})
    }
    if (firstname != null)
        await editFirstname(id, firstname)
    if (lastname != null)
        await editLastname(id, lastname)
    if (oldEmail != null && newEmail != null)
        if (await checkEmail(id, oldEmail))
            await editEmail(request, response, id, newEmail)
    if (oldPassword != null && newPassword != null)
        if (await checkOldPassword(id, oldPassword))
            await editPassword(id, newPassword)
    if (profileImage != null)
        await editProfileImage(id, profileImage)

    await logger("Info", "Updated userProfile with id: " + id);
    return response.status(200).json({ "result": true, "text": "Updated user profile" });
}

const editFirstname = async (id, firstname) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(editFirstnameQuery, [id, firstname], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
    } catch (error) {
        await logger("Warning", "Error editing UserProfile for user (" + id + "): " + error.message);
    }
}

const editLastname = async (id, lastname) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(editLastnameQuery, [id, lastname], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
    } catch (error) {
        await logger("Warning", "Error editing UserProfile for user (" + id + "): " + error.message);
    }
}

const checkEmail = async (id, oldEmail) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(checkOldEmailQuery, [id, oldEmail], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        return result.length > 0;
    } catch (error) {
        await logger("Warning", "Error checking UserOldEmail for user (" + id + "): " + error.message);
    }
}

const editEmail = async (id, newEmail) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(editEmailQuery, [id, newEmail], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
    } catch (error) {
        await logger("Warning", "Error editing UserNewEmail for user (" + id + "): " + error.message);
    }
}

const checkOldPassword = async (id, oldPassword) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(checkOldPasswordQuery, [id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        const hashedPassword = result[0].password
        return await bcrypt.compare(oldPassword, hashedPassword);
    } catch (error) {
        await logger("Warning", "Error checking UserOldPassword for user (" + id + "): " + error.message);
    }
}

const editPassword = async (id, newPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await new Promise((resolve, reject) => {
            pool.query(editNewPasswordQuery, [id, hashedPassword], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
    } catch (error) {
        await logger("Warning", "Error editing UserNewPassword for user (" + id + "): " + error.message);
    }
}

const editProfileImage = async (id, profileImage) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(editProfileImageQuery, [id, profileImage], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
    } catch (error) {
        await logger("Warning", "Error editing profileImage for user (" + id + "): " + error.message);
    }
}

const insertProfileImage = async (request, response) => {
    const { id, image } = request.query;
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(insertImageQuery, [id, image], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        await logger("Info", "Updated profile img for user with id: " + id);
        return response.status(200).json({"result": true });
    } catch (error) {
        await logger("Warning", "Error while inserting profile img for user with id (" + id + "): " + error.message);
        return response.status(500).json({"result": false, "error": "Error while inserting profile img for user with id (" + id + "): " + error.message});
    }

}

module.exports = {
    editUserProfile,
    insertProfileImage
}