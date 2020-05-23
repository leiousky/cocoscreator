var log = require("../../utils/log.js");
var Cmd = require("../Cmd.js");
var auth_model = require("./auth_model.js");
var Stype = require("../Stype.js");
var Cmd = require("../Cmd.js");
var utils = require("../../utils/utils.js");

function guest_login(session, utag, proto_type, body){
	//验证数据合法性
	if(!body){
		session.send_cmd(Stype.Auth, Cmd.Auth.GUEST_LOGIN, Respones.INVALID_PARAMS, utag, proto_type);
		return;
	}

	var ukey = body;
	auth_model.guest_login(ukey, function(ret){
		session.send_cmd(Stype.Auth, Cmd.Auth.GUEST_LOGIN, ret, utag, proto_type);
	});
}

var service = {
	name: "auth_service", // 服务名称
	is_transfer: false,		//是否为转发模块

	// 收到连接的客户端发给我们的数据
	on_recv_player_cmd: function(session, stype, ctype, body, utag, proto_type, raw_cmd) {
		log.info("on_recv_player_cmd: ", stype, ctype, body);
		switch(ctype){
			case Cmd.Auth.GUEST_LOGIN:
				guest_login(session, utag, proto_type, body);
			break;
		}
	},

	// 收到连接的服务器发给我们的数据
	on_recv_server_return: function(session, stype, ctype, body, utag, proto_type, raw_cmd) {
	},

	// 每个服务连接丢失后调用,被动丢失连接
	on_player_disconnect: function(stype, session) {
	},
};

module.exports = service;