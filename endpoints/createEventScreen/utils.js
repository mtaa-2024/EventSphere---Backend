createEventQuery =
    'INSERT INTO \n' +
    '    events \n' +
    '    (title, description, owner_id, location, created_at, closing_at) \n' +
    'VALUES ($1, $2, $3, $4, NOW(), $5) \n' +
    'RETURNING events.id'

addPerformerIdQuery =
    'INSERT INTO\n' +
    '    event_performers\n' +
    '    (event_id, performer_id)\n' +
    'VALUES ($1, $2)'

addPerformerNameQuery =
    'INSERT INTO\n' +
    '    event_performers\n' +
    '    (event_id, firstname, lastname)\n' +
    'VALUES ($1, $2, $3)'

module.exports = {
    createEventQuery,
    addPerformerIdQuery,
    addPerformerNameQuery
}