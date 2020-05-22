var mysql = require("mysql");

var conn_pool = null;
function connect_to_center(host, port, db_name, uname, upwd){
	var conn_pool = mysql.createPool({
		host: host,
		port: port,
		database: db_name,
		user: uname,
		password: upwd,
	});
}

module.exports = {
	connect: connect_to_center,
};