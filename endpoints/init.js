const { getUsers } = require('./template/template')
const { getEvent, getUpdatedComments } = require('./eventScreen/eventScreen')
const { createEvent } = require('./createEventScreen/createEventScreen')


module.exports = {
    getUsers,
    getEvent,
    getUpdatedComments,
    createEvent
}