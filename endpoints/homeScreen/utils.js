getUpcomingQuery =
    'SELECT\n' +
    '    events.id,\n' +
    '    events.title,\n' +
    '    events.location,\n' +
    '    events.closing_at\n' +
    'FROM events\n' +
    'WHERE events.closing_at > NOW()\n' +
    'ORDER BY events.closing_at'

getAttendingQuery =
    'SELECT\n' +
    '    events.id,\n' +
    '    events.title,\n' +
    '    events.location,\n' +
    '    events.closing_at\n' +
    'FROM events\n' +
    'INNER JOIN event_attenders ON events.id = event_attenders.event_id\n' +
    'INNER JOIN users ON event_attenders.user_id = users.id\n' +
    'WHERE events.closing_at > NOW() AND users.id = $1\n' +
    'ORDER BY events.closing_at'

filterByCategoryQuery =
    'SELECT\n' +
    '    events.id,\n' +
    '    events.title,\n' +
    '    events.location,\n' +
    '    events.closing_at\n' +
    'FROM events\n' +
    'INNER JOIN categories ON categories.event_id = events.id\n' +
    'WHERE categories.category_id = $1'

searchEventQuery = 
    'SELECT\n' +
    '    events.id,\n' +
    '    events.title,\n' +
    '    events.location,\n' +
    '    events.closing_at\n' +
    'FROM events\n' +
    'WHERE LOWER(events.title) LIKE LOWER(CONCAT(\'%\', $1::text, \'%\'))'

module.exports = {
    getUpcomingQuery,
    getAttendingQuery,
    filterByCategoryQuery,
    searchEventQuery
}