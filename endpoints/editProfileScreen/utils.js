editFirstnameQuery =
    'UPDATE \n' +
    '   users \n' +
    'SET \n' +
    ' firstname = $2 \n' +
    'WHERE id = $1;'

editLastnameQuery =
    'UPDATE \n' +
    '   users \n' +
    'SET \n' +
    ' lastname = $2 \n' +
    'WHERE id = $1;'

editEmailQuery =
    'UPDATE \n' +
    '   users \n' +
    'SET \n' +
    ' email = $2 \n' +
    'WHERE id = $1;'

checkOldEmailQuery =
    'SELECT\n' +
    'users.email\n' +
    'FROM users\n' +
    'WHERE users.id = $1 AND users.email = $2'

module.exports ={
    editFirstnameQuery,
    editLastnameQuery,
    checkOldEmailQuery,
    editEmailQuery
}