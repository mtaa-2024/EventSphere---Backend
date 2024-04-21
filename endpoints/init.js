const { getEvent, getUpdatedComments, insertComment } = require('./eventScreen')
const { createEvent } = require('./createEventScreen')
const { updateEvent } = require('./editEventScreen')
const { getUpcoming, getAttending, searchEvent } = require('./homeScreen')
const { getLoginData, getUser} = require('./loginScreen')
const { createNewUser, checkUsernameExists, checkEmailExists} = require('./registerScreen')
const { editUserProfile, insertProfileImage, getUpdatedUser} = require('./editProfileScreen')
const { getFriends, removeFriend, addFriend, isFriend} = require('./profileScreen')
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
    getUpdatedUser,
    insertComment,
    addFriend,
    checkUsernameExists,
    checkEmailExists,
    isFriend
}