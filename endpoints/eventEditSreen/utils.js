updateEventQuery =
    'UPDATE \n' +
    '    events \n' +
    'SET \n' +
    '    title = $1, \n' +
    '    description = $2, \n' +
    '    location = $3, \n' +
    '    closing_at = $4 \n' +
    'WHERE events.id = $5'

updatePerformersQuery =
    'DELETE FROM ' +
    'event_performers ' +
    'WHERE event_id = $1'

module.exports = {
    updateEventQuery,
    updatePerformersQuery
}