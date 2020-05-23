var mysql = require("mysql");
var util = require('util');
var Respones = require("../apps/Respones.js");

function mysql_exec(sql, callback){
	conn_pool.getConnection(function(err, conn){
		if(err){
			if(callback){
				callback(err, null, null);
			}
			return;
		}

		conn.query(sql, function(sql_err, sql_result, fields_desic){
			conn.release();		

			if(sql_err){
				if(callback){
					callback(sql_err, null, null);
				}
				return;
			}

			if(callback){
				callback(null, sql_result, fields_desic);
			}
		});
	});
}

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

function get_guest_uinfo_by_ukey(guest_key, callback){
	var sql = "select uid, unick, usex, uface, uvip, status from uinfo where guest_key = \"%s\" and status = 0";
	var sql_cmd = util.format(sql, guest_key);

	mysql_exec(sql_cmd, function(err, sql_ret, fields_desic){
		if(err){
			callback(Respones.SYSTEM_ERR, null);
			return;
		}
		callback(Respones.OK, sql_ret);
	});
}

function insert_guest_user(unick, uface, usex, ukey, callback){
	var sql = "insert into uinfo('guest_key', 'unick', 'uface', 'usex')values(\"%s\", \"%s\", %d, %d)";
	var sql_cmd = util.format(sql, ukey, unick, uface, usex);

	mysql_exec(sql_cmd, function(err, sql_ret, fields_desic){
		if(err){
			callback(Respones.SYSTEM_ERR);
			return;
		}
		callback(Respones.OK);
	});
}

module.exports = {
	connect: connect_to_center,
	get_guest_uinfo_by_ukey: get_guest_uinfo_by_ukey,
	insert_guest_user: insert_guest_user,
};