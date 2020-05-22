// 字符串 你好, 长度是2，不代表字节数,buf协议，写入我们的字符串的字节数，String扩充一个接口 
String.prototype.utf8_byte_len = function() {
    var totalLength = 0;
	var i;
	var charCode;
	for (i = 0; i < this.length; i++) {
		charCode = this.charCodeAt(i);	//charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。
		if (charCode < 0x007f) {		//0x0000 - 0x007F  1个字节
			totalLength = totalLength + 1;
		} 
		else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {	// 0x0080 - 0x07FF  2个字节
			totalLength += 2;
		} 
		else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {	// 0x0800 - 0xFFFF  3个字节
			totalLength += 3;
		}
	}
	return totalLength; 
}

