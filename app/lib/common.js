var path = require('path');
var dirname = path.dirname(process.execPath);
var qr = require('qr-image');
var fs = require('fs');
var http = require('http');
var url = require('url');
var qs = require('querystring');

function Get(url, parameter, fnSuccess, fnError, dataType) {
	dataType = dataType ? dataType : "json";
	$.ajax({
		url: url,
		type: "get",
		data: parameter,
		dataType: dataType,
		timeout: 3000,
		async: true,
		error: fnError,
		success: fnSuccess
	});
}

function Post(url, parameter, fnSuccess, fnError, dataType) {
	dataType = dataType ? dataType : "json";
	$.ajax({
		url: url,
		type: "post",
		data: parameter,
		dataType: dataType,
		timeout: 3000,
		async: true,
		error: fnError,
		success: fnSuccess
	});
}

function write(filename, msg) {
	filename = path.join(dirname, filename);
	fs.writeFile(filename, msg, function(err) {});
}

function read(filename) {
	filename = path.join(dirname, filename);
	return fs.readFileSync(filename);
}

window.WebRequest = {
	_options: function(requrl, params) {
		var parsedUrl = url.parse(requrl, true);
		var options = {
			host: null,
			port: -1,
			path: null
		};
		options.host = parsedUrl.hostname;
		options.port = parsedUrl.port;
		options.path = parsedUrl.pathname;

		if (params) {
			options.method = 'post';
			options.headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': params.length
			}
		} else {
			options.method = 'get';
		}
		if (parsedUrl.search) options.path += "?" + parsedUrl.search;

		return options;
	},
	Post: function(requrl, data) {
		var promise = new Promise(function(resolve, reject) {
			if (data) {
				if (data.constructor.name == "String") {
					data = JSON.parse(data);
				}
			} else data = {};
			var params = qs.stringify(data);

			var options = WebRequest._options(requrl, params);

			var req = http.request(options, function(res) {
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					resolve(chunk);
				});
				res.on('error', function(err) {
					reject(err);
				});
			});

			if (params) {
				req.write(params);
			}

			req.on('error', function(err) {
				reject(err);
			});
			req.end();
		});

		return promise;
	},
	Get: function(requrl) {
		var promise = new Promise(function(resolve, reject) {
			var options = WebRequest._options(requrl);

			var req = http.request(options, function(res) {
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					resolve(chunk);
				});
				res.on('error', function(err) {
					reject(err);
				});
			});

			req.on('error', function(err) {
				reject(err);
			});
			req.end();
		})
		return promise;
	},
	Download: function(requrl, saveurl) {
		var promise = new Promise(function(resolve, reject) {
			var options = WebRequest._options(requrl);
			var req = http.request(options, function(res) {
				var writer = fs.createWriteStream(saveurl)
				res.pipe(writer)
				res.on('error', function() {
					resolve(false);
				})
				res.on('end', function() {
					resolve(true);
				});
			});
			req.on('error', function(err) {
				resolve(false);
			});
			req.end();
		});
		return promise;
	}
}

function qr_image(source, callback, size, margin) {
	var target = path.join(dirname, 'qrimage.png');
	var reader = qr.image(source, {
		type: "png",
		ec_level: 'M', //L,M,Q,H
		size: size || 5,
		margin: margin || 4
	});
	var writer = fs.createWriteStream(target);
	reader.pipe(writer);
	reader.on('end', function() {
		callback(target);
	});
}

function Encrypt_ASE(data, key) {
	var cipher = require('crypto').createCipher('aes-128-ecb', key);
	return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

function Decrypt_ASE(data, key) {
	try {
		var cipher = require('crypto').createDecipher('aes-128-ecb', key);
		return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
	} catch (e) {}
}

Date.prototype.ToFormatString = function(format) {
	var formatstr = format;
	if (format != null && format != "") {
		if (formatstr.indexOf("yyyy") >= 0) {
			formatstr = formatstr.replace("yyyy", this.getFullYear());
		}
		if (formatstr.indexOf("MM") >= 0) {
			var month = this.getMonth() + 1;
			if (month < 10) {
				month = "0" + month;
			}
			formatstr = formatstr.replace("MM", month);
		}
		if (formatstr.indexOf("dd") >= 0) {
			var day = this.getDate();
			if (day < 10) {
				day = "0" + day;
			}
			formatstr = formatstr.replace("dd", day);
		}
		var hours = this.getHours();
		if (formatstr.indexOf("HH") >= 0) {
			if (month < 10) {
				month = "0" + month;
			}
			formatstr = formatstr.replace("HH", hours);
		}
		if (formatstr.indexOf("hh") >= 0) {
			if (hours > 12) {
				hours = hours - 12;
			}
			if (hours < 10) {
				hours = "0" + hours;
			}
			formatstr = formatstr.replace("hh", hours);
		}
		if (formatstr.indexOf("mm") >= 0) {
			var minute = this.getMinutes();
			if (minute < 10) {
				minute = "0" + minute;
			}
			formatstr = formatstr.replace("mm", minute);
		}
		if (formatstr.indexOf("ss") >= 0) {
			var second = this.getSeconds();
			if (second < 10) {
				second = "0" + second;
			}
			formatstr = formatstr.replace("ss", second);
		}
	}
	return formatstr;
}

Number.prototype.Format = function(format) {
	var current = 0;
	if (this.toString().length <= 10) current = this * 1000;
	else current = this;
	var date = new Date(current);
	var formatstr = format;
	if (format != null && format != "") {
		if (formatstr.indexOf("yyyy") >= 0) {
			formatstr = formatstr.replace("yyyy", date.getFullYear());
		}
		if (formatstr.indexOf("MM") >= 0) {
			var month = date.getMonth() + 1;
			if (month < 10) {
				month = "0" + month;
			}
			formatstr = formatstr.replace("MM", month);
		}
		if (formatstr.indexOf("dd") >= 0) {
			var day = date.getDate();
			if (day < 10) {
				day = "0" + day;
			}
			formatstr = formatstr.replace("dd", day);
		}
		var hours = date.getHours();
		if (formatstr.indexOf("HH") >= 0) {
			if (month < 10) {
				month = "0" + month;
			}
			formatstr = formatstr.replace("HH", hours);
		}
		if (formatstr.indexOf("hh") >= 0) {
			if (hours > 12) {
				hours = hours - 12;
			}
			if (hours < 10) {
				hours = "0" + hours;
			}
			formatstr = formatstr.replace("hh", hours);
		}
		if (formatstr.indexOf("mm") >= 0) {
			var minute = date.getMinutes();
			if (minute < 10) {
				minute = "0" + minute;
			}
			formatstr = formatstr.replace("mm", minute);
		}
		if (formatstr.indexOf("ss") >= 0) {
			var second = date.getSeconds();
			if (second < 10) {
				second = "0" + second;
			}
			formatstr = formatstr.replace("ss", second);
		}
		if (formatstr.indexOf("fff") >= 0) {
			var microsecond = date.getMilliseconds();
			formatstr = formatstr.replace("fff", microsecond);
		}
	}
	return formatstr;
}

/** 
 * 扩展方法：Html  编码
 * */
String.prototype.HtmlEncode = function() {
		var s = this.valueOf();
		if (s == null || s.length == 0) return "";
		s = s.replace(/&/g, "&amp;");
		s = s.replace(/</g, "&lt;");
		s = s.replace(/>/g, "&gt;");
		s = s.replace(/ /g, "&nbsp;");
		s = s.replace(/\'/g, "&#39;");
		s = s.replace(/\"/g, "&quot;");
		return s;
	}
	/** 
	 * 扩展方法：Html 解码
	 * */
String.prototype.HtmlDecode = function() {
	var s = this.valueOf();
	if (s == null || s.length == 0) return "";
	s = s.replace(/&amp;/g, "&");
	s = s.replace(/&lt;/g, "<");
	s = s.replace(/&gt;/g, ">");
	s = s.replace(/&nbsp;/g, " ");
	s = s.replace(/&#39;/g, "\'");
	s = s.replace(/&quot;/g, "\"");
	s = s.replace(/<br>/g, "\n");
	return s;
}

/** 
 * 扩展方法：Base64 加密
 * */
String.prototype.Base64Encode = function() {
		if (!this) return "";
		var str = this;
		var out, i, len, c;
		out = "";
		len = str.length;
		for (i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if ((c >= 0x0001) && (c <= 0x007F)) {
				out += str.charAt(i);
			} else if (c > 0x07FF) {
				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
				out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			} else {
				out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			}
		}
		var result;
		var c1, c2, c3;
		len = out.length;
		i = 0;
		result = "";
		while (i < len) {
			c1 = out.charCodeAt(i++) & 0xff;
			if (i == len) {
				result += base64EncodeChars.charAt(c1 >> 2);
				result += base64EncodeChars.charAt((c1 & 0x3) << 4);
				result += "==";
				break;
			}
			c2 = out.charCodeAt(i++);
			if (i == len) {
				result += base64EncodeChars.charAt(c1 >> 2);
				result += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
				result += base64EncodeChars.charAt((c2 & 0xF) << 2);
				result += "=";
				break;
			}
			c3 = out.charCodeAt(i++);
			result += base64EncodeChars.charAt(c1 >> 2);
			result += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			result += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
			result += base64EncodeChars.charAt(c3 & 0x3F);
		}
		return result;
	}
	/** 
	 * 扩展方法：Base64 解密
	 * */
String.prototype.Base64Decode = function() {
	if (!this) return "";
	var str = this;
	var out, i, len, c;
	var char2, char3;
	out = "";
	len = str.length;
	i = 0;
	while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				out += str.charAt(i - 1);
				break;
			case 12:
			case 13:
				char2 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
				break;
			case 14:
				char2 = str.charCodeAt(i++);
				char3 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x0F) << 12) |
					((char2 & 0x3F) << 6) |
					((char3 & 0x3F) << 0));
				break;
		}
	}
	var result = "";
	var c1, c2, c3, c4;
	len = out.length;
	i = 0;
	while (i < len) {
		do {
			c1 = base64DecodeChars[out.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);
		if (c1 == -1)
			break;
		do {
			c2 = base64DecodeChars[out.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);
		if (c2 == -1)
			break;
		result += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
		do {
			c3 = out.charCodeAt(i++) & 0xff;
			if (c3 == 61)
				return result;
			c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1)
			break;
		result += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
		do {
			c4 = out.charCodeAt(i++) & 0xff;
			if (c4 == 61)
				return result;
			c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1)
			break;
		result += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return result;
}
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);