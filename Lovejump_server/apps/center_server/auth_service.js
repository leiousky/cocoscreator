var log = require("../../utils/log.js");

var service = {
	name: "auth_service", // 服务名称
	is_transfer: false,		//是否为转发模块

	// 收到连接的客户端发给我们的数据
	on_recv_player_cmd: function(session, stype, ctype, body, utag, proto_type, raw_cmd) {
		log.info("on_recv_player_cmd: ", stype, ctype, body);
	},

	// 收到连接的服务器发给我们的数据
	on_recv_server_return: function(session, stype, ctype, body, utag, proto_type, raw_cmd) {
	},

	// 每个服务连接丢失后调用,被动丢失连接
	on_player_disconnect: function(stype, session) {
	},
};

module.exports = service;