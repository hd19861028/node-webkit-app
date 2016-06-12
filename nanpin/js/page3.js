var ang = new angular();
var info = {};
var newsType = 0;
var pageIndex = 1;
var ids = [];
var total = 0;
var current = 0;
var maxIndex = 0;
var timer = null;
var loopIndex = 0;
var loopTotal = 1;

var search = WebStorage.Session.Get('search');
var json = JSON.parse(search);

function NewsList(isnext) {
	var isload = false;
	if (isnext) {
		if (pageIndex < maxIndex) {
			pageIndex += 1;
			isload = true;
		}
	} else {
		if (pageIndex > 1) {
			pageIndex -= 1;
			isload = true;
		}
	}
	if (isload || maxIndex == 0) {
		Ajax(server + 'api/news', {
			id: newsType,
			index: maxIndex == 0 ? 1 : pageIndex,
			size: 2000
		}, 'get', 'json', function(r) {
			info.rows = r.rows;
			info.total = r.total;
			for (var i = 0; i < info.rows.length; i++) {
				ids.push(info.rows[i].id);
			}
			total = r.total;
			ShowItem(current)
			swipt('list',
				function() {
					if (current < total) {
						current += 1;
						ShowItem(current)
					}
				},
				function() {
					if (current > 0) {
						current -= 1;
						ShowItem(current)
					}
				})
		})
	}
}

function ShowItem(index) {
	var id = ids[index];
	Ajax(server + 'api/news/detail', {
		id: id
	}, 'get', 'json', function(r) {
		var isNeedLoop = false;
		var img = server + 'api/news/image/' + r.image;
		var i1 = $('.logo').get(0);
		$(i1).attr('src', img);
		if (r.image1) {
			var img1 = server + 'api/news/image/' + r.image1;
			var i2 = $('.logo').get(1);
			$(i2).attr('src', img1);
			isNeedLoop = true;
			loopTotal += 1;
		}
		if (r.image2) {
			var img2 = server + 'api/news/image/' + r.image2;
			var i3 = $('.logo').get(2);
			$(i3).attr('src', img2);
			isNeedLoop = true;
			loopTotal += 1;
		}
		$('.title span').html(r.title);
		$('.title small').html(r.updatetime);
		$('.content').html(r.content + '<p class="footer">' + r.footer + '</p>');
		if (isNeedLoop) {
			timer = setInterval(function() {
				if (loopIndex < loopTotal - 1) {
					loopIndex += 1;
				} else {
					loopIndex = 0;
				}
				$('.logo').hide();
				var showLog = $('.logo').get(loopIndex);
				$(showLog).show()
			}, 5000)
		}
		$('.model').show();
	})
	current = index;
}

Ajax(server + 'api/menu', {
	m: json.m,
	c: json.c
}, 'get', 'json', function(data) {
	$('header').html(data[0].name)
	newsType = data[0].id;
	NewsList(true);
})

$('.home').click(function() {
	window.location.href = "index.html"
})

$('.last').click(function() {
	window.location.href = "page2.html"
})

$('body').click(function() {
	if (current < total - 1) {
		current += 1;
		ShowItem(current)
	}
})