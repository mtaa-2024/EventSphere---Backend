const { getUsers } = require('./template/template')
const { getEvent, getUpdatedComments } = require('./eventScreen/eventScreen')
const { createEvent } = require('./createEventScreen/createEventScreen')
const { updateEvent, updateEventPerformers } = require('./eventEditSreen/editEventScreen')
const { getUpcoming, getAttending, filterByCategory, searchEvent } = require('./homeScreen/homeScreen')

module.exports = {
    getUsers,
    getEvent,
    getUpdatedComments,
    createEvent,
    updateEvent,
    getUpcoming,
    getAttending,
    filterByCategory,
    searchEvent,
    updateEventPerformers
}