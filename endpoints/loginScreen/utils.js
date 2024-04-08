checkLoginQuery =
    'SELECT\n' +
    'users.id\n,' +
    'users.password\n'+
    'FROM users\n' +
    'WHERE users.username = $1 OR users.email = $1'

module.exports = {
    checkLoginQuery
}