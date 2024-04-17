const { logger } = require("./logs");
const pool = require("../core/connection").pool
const { getEventQuery, getEventCommentsQuery, getEventPerformersQuery, insertCommentQuery } = require('./utils')

const getEvent = async (request, response) => {
    const id = request.query.id;
    try {
        const event = await new Promise((resolve, reject) => {
            pool.query(getEventQuery, [id], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        if (event.length > 0) {
            const comments = await getEventComments(id);
            const performers = await getEventPerformers(id)
            await logger("Info", "Received information for event with id: " + id);
            return response.status(200).json({'event': event, 'performers': performers, 'comments': comments});
        }
    } catch (error) {
        await logger("Warning", "Error receiving event (" + id + ") information: " + error.message);
        return response.status(500).json({ error: error.message });
    }
}

const getUpdatedComments = async(request, response) => {
    const id = request.query.id
    try {
        const comments = await getEventComments(id)
        if (comments != null) {
            await logger("Info", "Received updated comments for event with id: " + id);
            return response.status(200).json({"result": true, "comments": comments});
        }
        await logger("Error", "No updated comments for event with id: " + id);
        return response.status(404).json({"result": false, "error": "No updated comments for event with id: " + id});
    } catch (error) {
        await logger("Warning", "Error receiving updated comments for event with id: (" + id + "): " + error.message);
        return response.status(500).json({"result": false, "error": "Error receiving updated comments for event with id: (" + id + "): " + error.message });
    }

}

const getEventComments = async (id) => {
    const comments = await new Promise((resolve, reject) => {
        pool.query(getEventCommentsQuery, [id], (error, results) => {
            error ? reject(error) : resolve(results.rows);
        });
    });
    return comments.length > 0 ? comments : null;
}

const getEventPerformers = async (id) => {
    const performers = await new Promise((resolve, reject) => {
        pool.query(getEventPerformersQuery, [id], (error, results) => {
            error ? reject(error) : resolve(results.rows);
        });
    });
    return performers.length > 0 ? performers : null;
}

const insertComment = async(request, response) => {
    const {id, event_id, commentValue} = request.body;
    try {
        const comment = await new Promise((resolve, reject) => {
            pool.query(insertCommentQuery, [id, event_id, commentValue], (error, results) => {
                error ? reject(error) : resolve(results.rows);
            });
        });
        return response.status(200).json({'result': true, 'comment': comment});
    } catch (error) {
        await logger("Warning", "Error inserting comment for event (" + id + ") information: " + error.message);
        return response.status(500).json({"result":false, "error": error.message });
    }
}

module.exports = {
    getEvent,
    getUpdatedComments,
    insertComment
}