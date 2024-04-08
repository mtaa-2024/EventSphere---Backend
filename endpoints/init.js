const { getUsers } = require('./template/template')
const { getEvent, getUpdatedComments } = require('./eventScreen/eventScreen')
const { createEvent } = require('./createEventScreen/createEventScreen')
const { updateEvent } = require('./editEventScreen/editEventScreen')
const { getUpcoming, getAttending, filterByCategory, searchEvent } = require('./homeScreen/homeScreen')
const { checkLogin } = require('./loginScreen/loginScreen')

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
    checkLogin
}