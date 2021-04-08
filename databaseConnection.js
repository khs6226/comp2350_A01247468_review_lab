const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
	host: "us-cdbr-east-03.cleardb.com",
	user: "b9de27540d7da6",
	password: "16403fef",
	database: "heroku_8da364bc4e311c8",
	multipleStatements: false,
  namedPlaceholders: true
};

const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "7116226",
	database: "restaurant_review",
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
		