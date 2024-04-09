createNewUserQuery = //insert
    'INSERT INTO\n' +
    '    users\n' +
    '    (username, email, password, last_login)\n' +
    '    VALUES ($1, $2, $3, NOW())\n' +
    '    returning users.id'

checkUsernameQuery =
    'SELECT\n' +
    'users.username\n' +
    'FROM users\n' +
    'WHERE users.username = $1'

checkEmailQuery =
    'SELECT\n' +
    'users.email\n' +
    'FROM users\n' +
    'WHERE users.email = $1'


module.exports = {
    createNewUserQuery,
    checkUsernameQuery,
    checkEmailQuery
}