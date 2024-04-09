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

module.exports = {
    deletePerformersQuery,
    updateTitleQuery,
    updateDescriptionQuery,
    updateLocationQuery,
    updateDateQuery
}