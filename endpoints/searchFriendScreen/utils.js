getFriendSearchQuery =
    '    SELECT\n' +
    '    users.id, \n' +
    '    users.firstname,\n' +
    '    users.lastname,\n' +
    '    users.username,\n' +
    '    users.profile_image\n' +
    '    FROM users\n' +
    '    WHERE LOWER(users.firstname) LIKE LOWER(CONCAT(\'%\', $1::text, \'%\')) OR LOWER(users.lastname) LIKE LOWER(CONCAT(\'%\', $1::text, \'%\')) OR LOWER(users.username) LIKE LOWER(CONCAT(\'%\', $1::text, \'%\'))'

module.exports = {
    getFriendSearchQuery
}