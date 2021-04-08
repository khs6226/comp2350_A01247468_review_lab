const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
	host: "us-cdbr-east-03.cleardb.com",
	user: "bad5cf78b26163",
	password: "361d72ee",
	database: "heroku_b0b033c41088a0b",
	multipleStatements: false,
  namedPlaceholders: true
};

const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "7116226",
	database: "lab_example",
	multipleStatements: false,
  namedPlaceholders: true
};

if (is_heroku) {
	var database = mysql.createPool(dbConfigHeroku);
}
else {
	var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
		