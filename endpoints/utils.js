checkIfUserExistsQuery =
    'SELECT \n' +
    '   users.id \n,' +
    '   users.password \n'+
    'FROM users \n' +
    'WHERE users.username = $1 OR users.email = $1;'

getUserQuery =
    'SELECT \n' +
    '* \n' +
    'FROM users \n' +
    'WHERE users.id = $1;'

getEventQuery =
    'SELECT \n' +
    '    events.title, \n' +
    '    events.description, \n' +
    '    events.location, \n' +
    '    CONCAT(EXTRACT(DAY FROM events.estimated_end), \'.\', EXTRACT(MONTH FROM events.estimated_end), \'.\', EXTRACT(YEAR FROM estimated_end)) as estimated_end, \n' +
    '    users.firstname, \n' +
    '    users.lastname, \n' +
    '    users.profile_image \n' +
    'FROM events \n' +
    'INNER JOIN users ON events.owner_id = users.id \n' +
    'WHERE events.id = $1;'

getEventCommentsQuery =
    'SELECT \n' +
    '    users.firstname, \n' +
    '    users.lastname, \n' +
    '    users.profile_image, \n' +
    '    event_comments.text \n' +
    'FROM events \n' +
    'INNER JOIN event_comments ON events.id = event_comments.event_id \n' +
    'INNER JOIN users ON event_comments.user_id = users.id \n' +
    'WHERE events.id = $1;'

getEventPerformersQuery =
    'SELECT\n' +
    '    CASE WHEN(event_performers.user_id) IS NULL THEN NULL ELSE event_performers.user_id END as id,\n' +
    '    CASE WHEN(event_performers.firstname IS NULL) THEN users.firstname ELSE event_performers.firstname END as firstname,\n' +
    '    CASE WHEN(event_performers.lastname) IS NULL THEN users.lastname ELSE event_performers.lastname END as lastname,\n' +
    '    CASE WHEN(users.profile_image) IS NULL THEN NULL ELSE users.profile_image END as profile_image\n' +
    'FROM event_performers\n' +
    'INNER JOIN events ON event_performers.event_id = events.id\n' +
    'LEFT JOIN users ON event_performers.user_id = users.id\n' +
    'WHERE events.id = $1;'

getUpcomingQuery =
    'SELECT\n' +
    '    events.id,\n' +
    '    events.title,\n' +
    '    events.location,\n' +
    '    CONCAT(EXTRACT(DAY FROM events.estimated_end), \'.\', EXTRACT(MONTH FROM events.estimated_end), \'.\', EXTRACT(YEAR FROM estimated_end)) as estimated_end\n' +
    'FROM events\n' +
    'WHERE events.estimated_end > NOW()\n' +
    'ORDER BY events.estimated_end'

getAttendingQuery =
    'SELECT\n' +
    '    events.id,\n' +
    '    events.title,\n' +
    '    events.location,\n' +
    '    CONCAT(EXTRACT(DAY FROM events.estimated_end), \'.\', EXTRACT(MONTH FROM events.estimated_end), \'.\', EXTRACT(YEAR FROM estimated_end)) as estimated_end\n' +
    'FROM events\n' +
    'INNER JOIN event_attenders ON events.id = event_attenders.event_id\n' +
    'INNER JOIN users ON event_attenders.attender_id = users.id\n' +
    'WHERE events.estimated_end > NOW() AND users.id = $1\n' +
    'ORDER BY events.estimated_end;'

filterByCategoryQuery =
    'SELECT\n' +
    '    events.id,\n' +
    '    events.title,\n' +
    '    events.location,\n' +
    '    CONCAT(EXTRACT(DAY FROM events.estimated_end), \'.\', EXTRACT(MONTH FROM events.estimated_end), \'.\', EXTRACT(YEAR FROM estimated_end)) as estimated_end\n' +
    'FROM events\n' +
    'INNER JOIN categories ON categories.event_id = events.id\n' +
    'WHERE categories.category_id = $1;'

searchEventQuery =
    'SELECT\n' +
    '    events.id,\n' +
    '    events.title,\n' +
    '    events.location,\n' +
    '    CONCAT(EXTRACT(DAY FROM events.estimated_end), \'.\', EXTRACT(MONTH FROM events.estimated_end), \'.\', EXTRACT(YEAR FROM estimated_end)) as estimated_end\n' +
    'FROM events\n' +
    'WHERE LOWER(events.title) LIKE LOWER(CONCAT(\'%\', $1::text, \'%\'));'

getFriendsQuery =
    'SELECT\n' +
    'users.id, \n' +
    'users.firstname,\n' +
    'users.lastname,\n' +
    'users.profile_image\n' +
    'FROM users\n' +
    'INNER JOIN friends ON users.id = friends.friend_id\n' +
    'WHERE friends.user_id = $1;'

removeFriendQuery =
    'DELETE\n'+
    'FROM friends\n'+
    'WHERE (user_id = $1 AND friend_id = $2);'

getFriendSearchQuery =
    'SELECT\n' +
    '    users.id, \n' +
    '    users.firstname,\n' +
    '    users.lastname,\n' +
    '    users.username,\n' +
    '    users.profile_image\n' +
    'FROM users\n' +
    'WHERE LOWER(users.firstname) LIKE LOWER(CONCAT(\'%\', $1::text, \'%\')) OR LOWER(users.lastname) LIKE LOWER(CONCAT(\'%\', $1::text, \'%\')) OR LOWER(users.username) LIKE LOWER(CONCAT(\'%\', $1::text, \'%\'));'

createNewUserQuery =
    'INSERT INTO \n' +
    'users\n' +
    '(username, email, password, last_login)\n' +
    'VALUES ($1, $2, $3, NOW())\n' +
    'returning users.id;'

checkUsernameQuery =
    'SELECT\n' +
    '   users.username\n' +
    'FROM users\n' +
    'WHERE users.username = $1;'

checkEmailQuery =
    'SELECT\n' +
    '   users.email\n' +
    'FROM users\n' +
    'WHERE users.email = $1;'

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
    '   users.email\n' +
    'FROM users\n' +
    'WHERE users.id = $1 AND users.email = $2'

checkOldPasswordQuery =
    'SELECT\n' +
    '   users.password\n' +
    'FROM users\n' +
    'WHERE users.id = $1'

editNewPasswordQuery =
    'UPDATE \n' +
    '   users \n' +
    'SET \n' +
    '   password = $2 \n' +
    'WHERE id = $1;'

editProfileImageQuery =
    'UPDATE \n' +
    '   users \n' +
    'SET \n' +
    '   profile_image = $2 \n' +
    'WHERE id = $1;'

deletePerformersQuery =
    'DELETE FROM ' +
    'event_performers ' +
    'WHERE event_id = $1;'

updateTitleQuery =
    'UPDATE \n' +
    '   events \n' +
    'SET \n' +
    ' title = $2 \n' +
    'WHERE events.id = $1;'

updateDescriptionQuery =
    'UPDATE \n' +
    '   events \n' +
    'SET \n' +
    ' description = $2 \n' +
    'WHERE events.id = $1;'

updateLocationQuery =
    'UPDATE \n' +
    '   events \n' +
    'SET \n' +
    ' location = $2 \n' +
    'WHERE events.id = $1;'

updateDateQuery =
    'UPDATE \n' +
    '   events \n' +
    'SET \n' +
    ' date = $2 \n' +
    'WHERE events.id = $1;'

createEventQuery =
    'INSERT INTO \n' +
    '    events \n' +
    '    (title, description, owner_id, location, created_at, estimated_end) \n' +
    'VALUES ($1, $2, $3, $4, NOW(), $5) \n' +
    'RETURNING events.id;'

addPerformerIdQuery =
    'INSERT INTO\n' +
    '    event_performers\n' +
    '    (event_id, performer_id)\n' +
    'VALUES ($1, $2);'

addPerformerNameQuery =
    'INSERT INTO\n' +
    '    event_performers\n' +
    '    (event_id, firstname, lastname)\n' +
    'VALUES ($1, $2, $3);'

insertImageQuery =
    'UPDATE users\n' +
    'SET profile_image = $2 \n' +
    'WHERE users.id = $1;'

getUpcomingEventsQuery =
    'SELECT \n' +
    '   events.id, \n' +
    '   events.title, \n' +
    '   events.location, \n' +
    '   events.estimated_end \n' +
    'FROM events \n' +
    'WHERE events.owner_id = $1 AND events.estimated_end > NOW()\n' +
    'ORDER BY events.estimated_end;'

getExpiredEventsQuery =
    'SELECT \n' +
    '   events.id, \n' +
    '   events.title, \n' +
    '   events.location, \n' +
    '   events.estimated_end \n' +
    'FROM events \n' +
    'WHERE events.owner_id = $1 AND events.estimated_end < NOW()\n' +
    'ORDER BY events.estimated_end;'

getUpdatedUserQuery =
    'SELECT \n' +
    '* \n' +
    'FROM users \n' +
    'WHERE users.id = $1;'

module.exports = {
    checkIfUserExistsQuery,
    getUserQuery,
    getEventQuery,
    getEventCommentsQuery,
    getEventPerformersQuery,
    getUpcomingQuery,
    getAttendingQuery,
    filterByCategoryQuery,
    searchEventQuery,
    getFriendSearchQuery,
    removeFriendQuery,
    getFriendsQuery,
    createNewUserQuery,
    checkUsernameQuery,
    checkEmailQuery,
    editFirstnameQuery,
    editLastnameQuery,
    checkOldEmailQuery,
    editEmailQuery,
    checkOldPasswordQuery,
    editNewPasswordQuery,
    editProfileImageQuery,
    deletePerformersQuery,
    updateTitleQuery,
    updateDescriptionQuery,
    updateLocationQuery,
    updateDateQuery,
    createEventQuery,
    addPerformerIdQuery,
    addPerformerNameQuery,
    insertImageQuery,
    getUpcomingEventsQuery,
    getExpiredEventsQuery,
    getUpdatedUserQuery
}