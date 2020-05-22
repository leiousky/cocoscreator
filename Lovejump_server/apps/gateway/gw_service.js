var netbus = require("../../netbus/netbus.js");
var proto_tools = require("../../netbus/proto_tools.js");
var proto_man = require("../../netbus/proto_man.js");
var log = require("../../utils/log.js");
var Cmd = require("../Cmd.js");

var service = {
	name: "gw_service", // 服务名称
	is_transfer: true,		//是否为转发模块

	// 收到连接的客户端发给我们的数据
	on_recv_player_cmd: function(session, stype, ctype, body, utag, proto_type, raw_cmd) {
		log.info("raw_cmd: ", raw_cmd);
		var server_session = netbus.get_server_session(stype);
		if(!server_session){
			return;
		}

		//把入能够标识client的utag, udi, session.session_key
		utag = session.session_key;
		proto_tools.write_utag_inbuf(raw_cmd, utag);

		server_session.send_encoded_cmd(raw_cmd);
	},

	// 收到连接的服务器发给我们的数据
	on_recv_server_return: function(session, stype, ctype, body, utag, proto_type, raw_cmd) {
		log.info("raw_cmd: ", raw_cmd);
		var client_session = netbus.get_client_session(utag);
		if(!client_session){
			return;
		}
		proto_tools.clear_utag_inbuf(raw_cmd);

		client_session.send_encoded_cmd(raw_cmd);
	},

	// 收到客户端断开连接
	on_player_disconnect: function(stype, session) {
		var server_session = netbus.get_server_session(stype);
		if(!server_session){
			return;
		}

		var utag = session.session_key;
		server_session.send_cmd(stype, Cmd.USER_Disconnect, null, utag, proto_man.PROTO_JSON);
	},
};

module.exports = service;