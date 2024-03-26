getEventQuery =
    'SELECT \n' +
    '    events.title, \n' +
    '    events.description, \n' +
    '    events.location, \n' +
    '    events.closing_at, \n' +
    '    user_details.firstname, \n' +
    '    user_details.lastname, \n' +
    '    user_details.profile_image \n' +
    'FROM events \n' +
    'INNER JOIN users ON events.owner_id = users.id \n' +
    'INNER JOIN user_details ON users.id = user_details.user_id \n' +
    'WHERE events.id = $1'

getEventCommentsQuery =
    'SELECT \n' +
    '    user_details.firstname, \n' +
    '    user_details.lastname, \n' +
    '    user_details.profile_image, \n' +
    '    event_comments.body \n' +
    'FROM events \n' +
    'INNER JOIN event_comments ON events.id = event_comments.event_id \n' +
    'INNER JOIN users ON event_comments.user_id = users.id \n' +
    'INNER JOIN user_details ON users.id = user_details.user_id \n' +
    'WHERE events.id = $1'

getEventPerformersQuery =
    'SELECT\n' +
    '    CASE WHEN(event_performers.performer_id) IS NULL THEN NULL ELSE event_performers.performer_id END as id,\n' +
    '    CASE WHEN(event_performers.firstname IS NULL) THEN user_details.firstname ELSE event_performers.firstname END as firstname,\n' +
    '    CASE WHEN(event_performers.lastname) IS NULL THEN user_details.lastname ELSE event_performers.lastname END as lastname,\n' +
    '    CASE WHEN(user_details.profile_image) IS NULL THEN NULL ELSE user_details.profile_image END as profile_image\n' +
    'FROM event_performers\n' +
    'INNER JOIN events ON event_performers.event_id = events.id\n' +
    'LEFT JOIN user_details ON event_performers.performer_id = user_details.user_id\n' +
    'WHERE events.id = $1'


module.exports = {
    getEventQuery,
    getEventCommentsQuery,
    getEventPerformersQuery
}
