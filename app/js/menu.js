var gui = require('nw.gui');
var win = gui.Window.get();
var path = require('path');
var base = process.cwd();


//创建window menu
var menu = new gui.Menu({
	type: 'menubar'
});

var system = new gui.Menu();
system.append(new gui.MenuItem({
	label: '发送请求',
	click: function() {
		window.location.href = path.join(base, 'page', 'system', 'sendrequest.html');
	}
}));
system.append(new gui.MenuItem({
	label: '生成二维码',
	click: function() {
		window.location.href = path.join(base, 'page', 'system', 'qrimage.html');
	}
}));
system.append(new gui.MenuItem({
	label: '时间戳转换',
	click: function() {
		window.location.href = path.join(base, 'page', 'system', 'timespan.html');
	}
}));

var weixin = new gui.Menu();
weixin.append(new gui.MenuItem({
	label: '修改客服头像',
	click: function() {
		window.location.href = path.join(base, 'page', 'weixin', 'set_customer_logo.html');
	}
}));
weixin.append(new gui.MenuItem({
	label: '设置微信菜单',
	click: function() {
		window.location.href = path.join(base, 'page', 'weixin', 'set_weixin_menu.html');
	}
}));

var encoding = new gui.Menu();
encoding.append(new gui.MenuItem({
	label: 'URL',
	click: function() {
		window.location.href = path.join(base, 'page', 'encoding', 'url.html');
	}
}));
encoding.append(new gui.MenuItem({
	label: 'UTF8',
	click: function() {
		window.location.href = path.join(base, 'page', 'encoding', 'utf8.html');
	}
}));
encoding.append(new gui.MenuItem({
	label: 'HTML',
	click: function() {
		window.location.href = path.join(base, 'page', 'encoding', 'html-encode.html');
	}
}));
encoding.append(new gui.MenuItem({
	label: 'Base64',
	click: function() {
		window.location.href = path.join(base, 'page', 'encoding', 'base64.html');
	}
}));

var secret = new gui.Menu();
secret.append(new gui.MenuItem({
	label: 'ASE',
	click: function() {
		window.location.href = path.join(base, 'page', 'secret', 'ase.html');
	}
}));
secret.append(new gui.MenuItem({
	label: 'MD5 | SHA1',
	click: function() {
		window.location.href = path.join(base, 'page', 'secret', 'secret.html');
	}
}));
secret.append(new gui.MenuItem({
	label: '盐值',
	click: function() {
		window.location.href = path.join(base, 'page', 'secret', 'salt.html');
	}
}));

menu.append(new gui.MenuItem({
	label: '首页',
	click: function() {
		window.location.href = path.join(base, 'index.html');
	}
}));
menu.append(new gui.MenuItem({
	label: '工具',
	submenu: system
}));
menu.append(new gui.MenuItem({
	label: '微信',
	submenu: weixin
}));
menu.append(new gui.MenuItem({
	label: '编码',
	submenu: encoding
}));
menu.append(new gui.MenuItem({
	label: '加密',
	submenu: secret
}));

win.menu = menu;

