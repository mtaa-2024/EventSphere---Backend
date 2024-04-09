const { getUsers } = require('./template/template')
const { getEvent, getUpdatedComments } = require('./eventScreen/eventScreen')
const { createEvent } = require('./createEventScreen/createEventScreen')
const { updateEvent } = require('./editEventScreen/editEventScreen')
const { getUpcoming, getAttending, filterByCategory, searchEvent } = require('./homeScreen/homeScreen')
const { checkLogin } = require('./loginScreen/loginScreen')
const { createNewUser } = require('./registerScreen/registerScreen')
const { editUserProfile } = require('./editProfileScreen/editProfileScreen')
const { getProfile, removeFriend } = require('./profileScreen/profileScreen')
const { getFriendSearch } = require('./searchFriendScreen/searchFriendScreen')

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
    checkLogin,
    createNewUser,
    editUserProfile,
    getProfile,
    removeFriend,
    getFriendSearch
}