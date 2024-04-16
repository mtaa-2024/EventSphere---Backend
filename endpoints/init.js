const { getEvent, getUpdatedComments } = require('./eventScreen')
const { createEvent } = require('./createEventScreen')
const { updateEvent } = require('./editEventScreen')
const { getUpcoming, getAttending, filterByCategory, searchEvent } = require('./homeScreen')
const { getLoginData, getUser} = require('./loginScreen')
const { createNewUser } = require('./registerScreen')
const { editUserProfile, insertProfileImage, getUpdatedUser} = require('./editProfileScreen')
const { getFriends, removeFriend } = require('./profileScreen')
const { getFriendSearch } = require('./searchFriendScreen')
const { getUpcomingOwner, getExpiredOwner } = require('./eventCenterScreen')

module.exports = {
    getUser,
    getEvent,
    getUpdatedComments,
    createEvent,
    updateEvent,
    getUpcoming,
    getAttending,
    filterByCategory,
    searchEvent,
    getLoginData,
    createNewUser,
    editUserProfile,
    getFriends,
    removeFriend,
    getFriendSearch,
    insertProfileImage,
    getUpcomingOwner,
    getExpiredOwner,
    getUpdatedUser
}