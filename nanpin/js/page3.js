var ang = new angular();
var info = {};
var newsType = 0;
var pageIndex = 1;
var pageTotal = 0;
var maxIndex = 0;

var search = WebStorage.Session.Get('search');
var json = JSON.parse(search);

function BindEvent() {
	if (info.total == 0) {
		$('.list').html('<p class="nodata">没有数据！</p>')
	} else {
		pageTotal = info.total;
		maxIndex = ~~(pageTotal / 20);
		if (pageTotal % 20 != 0) {
			maxIndex += 1;
		}
	}
	swipt('list',
		function() {
			NewsList(true)
		},
		function() {
			NewsList(false)
		})
	$('.list li').each(function(index) {
		$(this).click(function() {
			var id = $(this).attr('id');
			Ajax(server + 'api/news/detail', {
				id: id
			}, 'get', 'json', function(r) {
				var img = server + 'api/news/image/' + r.image;
				$('.logo').attr('src', img);
				$('.title span').html(r.title);
				$('.title small').html(r.updatetime);
				$('.content').html(r.content + '<p class="footer">' + r.footer + '</p>');
				$('.model').show();
			})
		})
	})
	$('.delete').click(function() {
		$('.model').hide();
	})
}

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
			size: 20
		}, 'get', 'json', function(r) {
			info.rows = r.rows;
			info.total = r.total;
			ang.set('info', info, BindEvent)
		})
	}
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
	NewsList(true);
})