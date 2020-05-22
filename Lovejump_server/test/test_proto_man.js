var log = require("../utils/log.js");
var netbus = require("../netbus/netbus.js");
var proto_man = require("../netbus/proto_man.js");

var data = {
	uname: "leiou",
	upwd: "123456",
};

//json编码和解码
var buf = proto_man.encode_cmd(proto_man.PROTO_JSON, 1, 1, data);
log.info(buf);	//编码好的
log.error("json length: ", buf.length);
var cmd = proto_man.decode_cmd(proto_man.PROTO_JSON, 1, 1, buf);
log.info(cmd);		//{0:1, 1:1, 2:data}
//end

//二进制
function encode_cmd_1_1(body){
	var stype = 1;
	var ctype = 1;

	//------------stype--ctype--uname.length--uname--upwd.length--upwd---
	var total_len = 2 + 2 + 2 + body.uname.length + 2 + body.upwd.length;
	var buf = Buffer.allocUnsafe(total_len);
	buf.writeUInt16LE(stype, 0);
	buf.writeUInt16LE(ctype, 2);

	buf.writeUInt16LE(body.uname.length, 4);
	buf.write(body.uname, 6);

	var offset = 6 + body.uname.length;
	buf.writeUInt16LE(body.upwd.length, offset);
	buf.write(body.upwd, offset + 2);

	return buf;
}

function decode_cmd_1_1(cmd_buf){
	var stype = 1;
	var ctype = 1;

	var uname_len = cmd_buf.readUInt16LE(4);
	if((2 + 2 + 2 +uname_len) > cmd_buf.length){
		return null;
	}

	var uname = cmd_buf.toString("utf8", 6, 6 + uname_len);
	if(!uname){
		return null;
	}

	var offset = 6 + uname_len;
	var upwd_len = cmd_buf.readUInt16LE(offset);
	if((offset + 2 + upwd_len) > cmd_buf.length){
		return null;
	}

	var upwd = cmd_buf.toString("utf8", offset + 2, offset + 2 + upwd_len);

	var cmd = {
		0: 1,
		1: 1,
		2: {
			"uname": uname,
			"upwd": upwd,
		}
	};
	return cmd;
}

proto_man.reg_encoder(1, 1, encode_cmd_1_1);
proto_man.reg_decoder(1, 1, decode_cmd_1_1);

var proto_cmd_buf = proto_man.encode_cmd(proto_man.PROTO_BUF, 1, 1, data);
log.info(proto_cmd_buf);
log.error(proto_cmd_buf.length);

cmd = proto_man.decode_cmd(proto_man.PROTO_BUF, 1, 1, proto_cmd_buf);
log.info(cmd);