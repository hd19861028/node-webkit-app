var ang = new angular();
var info = {};

function scale(isleft) {
	$('#nav ul li').each(function(index) {
		var cls = isleft ? 'left' : 'right';
		cls = cls + (index + 1);
		$(this).addClass(cls);
		var self = this;
		var handler = function() {
			$(this).removeClass(cls)
			var img = $(this).find("img");
			var i = $(img).attr('index');
			i = +i;
			if (isleft) {
				i += 1;
				if (i > 6) i -= 6;
			} else {
				i -= 1;
				if (i < 1) i += 6;
			}

			$(img).attr('index', i);
			$(img).attr('src', 'img/1-' + i + '.png');
			self.removeEventListener("webkitAnimationEnd", handler, false);
		}
		self.addEventListener("webkitAnimationEnd", handler, false);
	})
}

Ajax(server + 'api/menu', null, 'get', 'json', function(data) {
	info.menus = data;
	for (var i = 0; i < info.menus.length; i++) {
		var index = 0;
		switch (i) {
			case 0:
				index = 3;
				break;
			case 1:
				index = 2;
				break;
			case 2:
				index = 1;
				break;
			case 3:
				index = 2;
				break;
			case 4:
				index = 3;
				break;
			case 5:
				index = 4;
				break;
		}
		info.menus[i].classname = "level" + index;
	}
	ang.set('info', info, function() {
		swipt('nav',
			function() {
				scale(true)
			},
			function() {
				scale(false)
			})
		$('.close').on('click', function(e) {
			e.stopPropagation()
			$('.frame').hide();
		});
		$('.level1').click(function(e) {
			e.stopPropagation()
			var img = $(this).find("img");
			var i = $(img).attr('index');
			WebStorage.Session.Set('item', i);
			if (i < 6)
				window.location.href = 'page2.html';
			else {
				$('.frame').show();
			}
		})
	})
}, function() {
	setTimeout(function() {
		window.location.reload();
	}, 10000);
})

$('body').click(function() {
	scale(false);
})