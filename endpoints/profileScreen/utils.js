getProfileQuery =
    'SELECT\n' +
    'users.firstname\n,' +
    'users.lastname\n,' +
    'users.profile_image\n' +
    'FROM users\n' +
    'WHERE users.id = $1'

getFriendsQuery =
    'SELECT\n' +
    'users.firstname,\n' +
    'users.lastname,\n' +
    'users.username,\n' +
    'users.profile_image\n' +
    'FROM users\n' +
    'INNER JOIN friends ON users.id = friends.friend_id\n' +
    'WHERE friends.user_id = $1'

removeFriendQuery =
    'DELETE\n'+
    'FROM friends\n'+
    'WHERE (user_id = $1 AND friend_id = $2)'

module.exports = {
    getProfileQuery,
    removeFriendQuery,
    getFriendsQuery
}