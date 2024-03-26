const { getUsers } = require('./template/template')
const { getEvent, getUpdatedComments } = require('./eventScreen/eventScreen')
const { createEvent } = require('./createEventScreen/createEventScreen')
const { updateEvent } = require('./eventEditSreen/editEventScreen')

module.exports = {
    getUsers,
    getEvent,
    getUpdatedComments,
    createEvent,
    updateEvent
}