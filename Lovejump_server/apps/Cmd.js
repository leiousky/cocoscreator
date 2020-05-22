var Cmd = {
	//全局命令号，当用户丢失链接时，所有的服务都会收到网关转发过来的这个事件
	USER_Disconnect: 10000,	
	
	Auth: {
		GUEST_LOGIN: 1,		//游客登陆
	},
};

module.exports = Cmd;