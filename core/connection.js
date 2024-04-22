const config = require('../config.json');
const {updateTitleQuery} = require("../endpoints/utils");
const {logger} = require("../endpoints/logs");
const e = require("express");
const { Pool } = require('pg');

const pool = new Pool({
    user: config.postgres.db_user,
    password: config.postgres.db_password,
    host: config.postgres.db_host,
    port: config.postgres.db_port,
    database: config.postgres.db_name
});


module.exports = {
    pool,
}

