getProfileQuery =
    'SELECT\n' +
    'users.firstname\n,' +
    'users.lastname\n,' +
    'users.profile_image\n,' +
    'friends.friend_id\n' +
    'FROM users\n' +
    'JOIN friends ON users.id = friends.user_id\n' +
    'WHERE users.id = $1'

removeFriendQuery =
    'DELETE\n'+
    'FROM friends\n'+
    'WHERE (user_id = $1 AND friend_id = $2)'

module.exports = {
    getProfileQuery,
    removeFriendQuery
}