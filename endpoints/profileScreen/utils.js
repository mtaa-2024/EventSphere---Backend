getProfileQuery =
    'SELECT\n' +
    'users.firstname\n,' +
    'users.lastname\n,' +
    'users.profile_image\n,' +
    'friends.friend_id\n' +
    'FROM users\n' +
    'JOIN friends ON users.id = friends.user_id\n' +
    'WHERE users.id = $1'

module.exports = {
    getProfileQuery
}